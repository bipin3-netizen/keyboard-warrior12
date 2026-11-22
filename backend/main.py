from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import hashlib
import secrets
import hmac
from datetime import datetime, timezone

from database import users_collection, matches_collection


app = FastAPI()


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# SIGNUP DATA MODEL
# ============================================================

class SignupRequest(BaseModel):

    username: str
    email: str
    password: str


# ============================================================
# LOGIN DATA MODEL
# ============================================================

class LoginRequest(BaseModel):

    identity: str
    password: str

# ============================================================
# MATCH RESULT DATA MODEL
# ============================================================

class MatchResultRequest(BaseModel):

    username: str
    match_type: str
    result: str

    wpm: float = 0
    accuracy: float = 0
    errors: int = 0

    mode: str = "words"
    length: int = 25


# ============================================================
# PASSWORD HASHING
# ============================================================

def hash_password(password):

    salt = secrets.token_bytes(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        100000
    )

    return (
        salt.hex()
        + ":"
        + password_hash.hex()
    )


# ============================================================
# VERIFY PASSWORD
# ============================================================

def verify_password(password, stored_password):

    try:

        salt_hex, stored_hash_hex = (
            stored_password.split(":")
        )

        salt = bytes.fromhex(salt_hex)

        stored_hash = bytes.fromhex(
            stored_hash_hex
        )

        password_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt,
            100000
        )

        return hmac.compare_digest(
            password_hash,
            stored_hash
        )

    except Exception:

        return False


# ============================================================
# SIGNUP API
# ============================================================

@app.post("/signup")
async def signup(data: SignupRequest):

    username = data.username.strip()

    email = data.email.strip().lower()

    password = data.password


    if len(username) < 3:

        return {
            "success": False,
            "message":
            "Username must contain at least 3 characters."
        }


    if len(username) > 30:

        return {
            "success": False,
            "message":
            "Username must not exceed 30 characters."
        }


    if len(password) < 6:

        return {
            "success": False,
            "message":
            "Password must contain at least 6 characters."
        }


    if "@" not in email or "." not in email:

        return {
            "success": False,
            "message":
            "Please enter a valid email address."
        }


    existing_user = users_collection.find_one(
        {
            "$or": [
                {"username": username},
                {"email": email}
            ]
        }
    )


    if existing_user:

        if existing_user.get("username") == username:

            return {
                "success": False,
                "message":
                "Username already exists."
            }


        if existing_user.get("email") == email:

            return {
                "success": False,
                "message":
                "Email is already registered."
            }


    password_hash = hash_password(
        password
    )


    user = {

        "username": username,

        "email": email,

        "password": password_hash,

        "display_name": username,

        "profile_image": "",

        "created_at":
        datetime.now(
            timezone.utc
        ),

        "stats": {

            "matches": 0,

            "wins": 0,

            "losses": 0,

            "best_wpm": 0,

            "average_accuracy": 0

        }

    }


    users_collection.insert_one(
        user
    )


    return {

        "success": True,

        "message":
        "Account created successfully.",

        "username":
        username,

        "display_name":
        username

    }


# ============================================================
# LOGIN API
# ============================================================

@app.post("/login")
async def login(data: LoginRequest):

    identity = data.identity.strip()

    password = data.password


    if not identity:

        return {

            "success": False,

            "message":
            "Please enter your username or email."

        }


    if not password:

        return {

            "success": False,

            "message":
            "Please enter your password."

        }


    user = users_collection.find_one(

        {

            "$or": [

                {
                    "username":
                    identity
                },

                {
                    "email":
                    identity.lower()
                }

            ]

        }

    )


    if not user:

        return {

            "success": False,

            "message":
            "Invalid username/email or password."

        }


    stored_password = user.get(
        "password"
    )


    if not stored_password:

        return {

            "success": False,

            "message":
            "Invalid username/email or password."

        }


    password_correct = verify_password(

        password,

        stored_password

    )


    if not password_correct:

        return {

            "success": False,

            "message":
            "Invalid username/email or password."

        }


    username = user.get(
        "username",
        ""
    )

    display_name = user.get(
        "display_name",
        username
    )

    profile_image = user.get(
        "profile_image",
        ""
    )

    stats = user.get(

        "stats",

        {

            "matches": 0,

            "wins": 0,

            "losses": 0,

            "best_wpm": 0,

            "average_wpm": 0,

            "average_accuracy": 0

        }

    )


    # Make old database users compatible
    stats.setdefault(
        "matches",
        0
    )

    stats.setdefault(
        "wins",
        0
    )

    stats.setdefault(
        "losses",
        0
    )

    stats.setdefault(
        "best_wpm",
        0
    )

    stats.setdefault(
        "average_wpm",
        0
    )

    stats.setdefault(
        "average_accuracy",
        0
    )


    return {

        "success": True,

        "message":
        "Login successful.",

        "username":
        username,

        "display_name":
        display_name,

        "email":
        user.get(
            "email",
            ""
        ),

        "profile_image":
        profile_image,

        "stats":
        stats

    }

# ============================================================
# SAVE MATCH RESULT
# ============================================================

@app.post("/record-match")
async def record_match(data: MatchResultRequest):

    username = data.username.strip()

    if not username:
        return {
            "success": False,
            "message": "Username is required."
        }

    if data.match_type not in ["single", "multiplayer"]:
        return {
            "success": False,
            "message": "Invalid match type."
        }

    if data.match_type == "single":
        if data.result != "practice":
            return {
                "success": False,
                "message": "Invalid single-player result."
            }

    elif data.result not in ["win", "loss"]:
        return {
            "success": False,
            "message": "Invalid multiplayer result."
        }

    if data.wpm < 0 or data.wpm > 1000:
        return {
            "success": False,
            "message": "Invalid WPM value."
        }

    if data.accuracy < 0 or data.accuracy > 100:
        return {
            "success": False,
            "message": "Invalid accuracy value."
        }

    if data.errors < 0:
        return {
            "success": False,
            "message": "Invalid error count."
        }

    user = users_collection.find_one({
        "username": username
    })

    if not user:
        return {
            "success": False,
            "message": "Registered user not found."
        }

    stats = user.get("stats", {})

    old_matches = stats.get("matches", 0)
    old_wins = stats.get("wins", 0)
    old_losses = stats.get("losses", 0)

    old_best_wpm = stats.get("best_wpm", 0)

    old_average_wpm = stats.get("average_wpm", 0)
    old_average_accuracy = stats.get("average_accuracy", 0)

    new_matches = old_matches + 1

    new_average_wpm = (
        (old_average_wpm * old_matches + data.wpm)
        / new_matches
    )

    new_average_accuracy = (
        (old_average_accuracy * old_matches + data.accuracy)
        / new_matches
    )

    new_wins = old_wins
    new_losses = old_losses

    if data.match_type == "multiplayer":

        if data.result == "win":
            new_wins += 1

        elif data.result == "loss":
            new_losses += 1

    new_best_wpm = max(
        old_best_wpm,
        data.wpm
    )

    updated_stats = {

        "matches": new_matches,

        "wins": new_wins,

        "losses": new_losses,

        "best_wpm": new_best_wpm,

        "average_wpm": round(new_average_wpm, 2),

        "average_accuracy": round(
            new_average_accuracy,
            2
        )

    }

    # Save the match record
    match_record = {

        "username": username,

        "display_name": user.get(
            "display_name",
            username
        ),

        "match_type": data.match_type,

        "result": data.result,

        "wpm": data.wpm,

        "accuracy": data.accuracy,

        "errors": data.errors,

        "mode": data.mode,

        "length": data.length,

        "date": datetime.now(timezone.utc)

    }

    matches_collection.insert_one(match_record)

    # Update player statistics
    users_collection.update_one(

        {"username": username},

        {
            "$set": {
                "stats": updated_stats
            }
        }

    )

    return {

        "success": True,

        "message": "Match result saved successfully.",

        "stats": updated_stats

    }


# ============================================================
# GET PLAYER PROFILE STATISTICS
# ============================================================

@app.get("/profile/{username}")
async def get_profile(username: str):

    user = users_collection.find_one(
        {"username": username.strip()}
    )

    if not user:
        return {
            "success": False,
            "message": "Player not found."
        }

    stats = user.get("stats", {})

    return {

        "success": True,

        "username": user.get("username"),

        "display_name": user.get(
            "display_name",
            user.get("username")
        ),

        "stats": {

            "matches": stats.get("matches", 0),

            "wins": stats.get("wins", 0),

            "losses": stats.get("losses", 0),

            "best_wpm": stats.get("best_wpm", 0),

            "average_wpm": stats.get("average_wpm", 0),

            "average_accuracy": stats.get(
                "average_accuracy",
                0
            )

        }

    }


# ============================================================
# GLOBAL TOP 5 LEADERBOARD
# ============================================================

@app.get("/leaderboard")
async def get_leaderboard():

    players = users_collection.find(

        {
            "stats.best_wpm": {
                "$gt": 0
            }
        },

        {
            "_id": 0,

            "username": 1,

            "display_name": 1,

            "stats.best_wpm": 1

        }

    ).sort(

        [
            ("stats.best_wpm", -1),
            ("username", 1)
        ]

    ).limit(5)


    leaderboard = []

    for rank, player in enumerate(players, start=1):

        stats = player.get("stats", {})

        leaderboard.append({

            "rank": rank,

            "username": player.get("username"),

            "display_name": player.get(
                "display_name",
                player.get("username")
            ),

            "best_wpm": stats.get(
                "best_wpm",
                0
            )

        })


    return {

        "success": True,

        "leaderboard": leaderboard

    }

# ============================================================
# TEXT DATA
# ============================================================

SENTENCES = [

    "The warrior moves quickly across the battlefield.",

    "Speed and accuracy are the keys to victory.",

    "A true keyboard warrior stays calm under pressure.",

    "Every keystroke brings you closer to victory.",

    "Practice makes your fingers faster and more accurate.",

    "A focused mind can overcome every difficult challenge.",

    "The strongest warriors never stop improving themselves.",

    "Typing quickly is useful only when your accuracy remains high.",

    "A good player stays focused even when the battle becomes difficult.",

    "Every mistake is another opportunity to learn and improve."

]


QUOTES = [

    "Success is not final and failure is not fatal.",

    "The secret of getting ahead is getting started.",

    "Great things are done by a series of small things brought together.",

    "It always seems impossible until it is done.",

    "Do not watch the clock. Do what it does. Keep going.",

    "The future depends on what you do today.",

    "Believe you can and you are already halfway there.",

    "Success comes to those who work hard and never give up.",

    "A journey of a thousand miles begins with a single step.",

    "The harder you work the luckier you become."

]


PARAGRAPH_SOURCES = [

    """
    The quick brown fox jumps over the lazy dog while the warrior
    prepares for battle. Speed and accuracy are important skills for
    every typing warrior. A calm mind helps you remain focused when
    the pressure increases. Every keystroke brings you closer to
    victory, so keep your fingers moving and never stop improving.
    """,

    """
    A true keyboard warrior stays calm, focused, and precise under
    pressure. The fastest player is not always the strongest player.
    Accuracy, concentration, and practice are what create real skill.
    Every mistake teaches something new, and every practice session
    makes the next challenge easier. Keep learning and keep moving.
    """,

    """
    The strongest warriors are not always the fastest, but they never
    stop improving. A player who practices every day slowly becomes
    faster and more confident. During a typing battle, patience is
    just as important as speed. Stay focused on the text, correct
    your mistakes, and continue until the final character is typed.
    """,

    """
    Technology has changed the way people communicate, learn, and
    work. Good typing skills can save time and make everyday tasks
    easier. However, speed should never come at the cost of accuracy.
    A skilled typist understands the importance of rhythm, focus,
    patience, and consistent practice.
    """

]


# ============================================================
# ROOM MANAGER
# ============================================================

class RoomManager:

    def __init__(self):

        self.rooms = {}


    # ========================================================
    # CREATE / CONNECT PLAYER
    # ========================================================

    async def connect(
        self,
        room_code,
        websocket,
        player_id
    ):

        await websocket.accept()


        if room_code not in self.rooms:

            self.rooms[room_code] = {

                "players": {},

                "state": "waiting",

                "winner": None,

                "text": None,

                "mode": None,

                "length": None,

                # ==========================================
                # BACKSPACE SETTING
                # ==========================================
                #
                # True = Backspace enabled
                # False = Backspace disabled
                #
                # Default is ON.
                #
                "backspace": True,

                "creator": player_id,

                "rematch_votes": set()

            }


        room = self.rooms[room_code]


        # ----------------------------------------------------
        # ROOM FULL
        # ----------------------------------------------------

        if len(room["players"]) >= 2:

            await websocket.send_json({

                "type": "room_full",

                "message":
                "This room already has two players."

            })

            await websocket.close()

            return False


        # ----------------------------------------------------
        # PREVENT DUPLICATE PLAYER ID
        # ----------------------------------------------------

        if player_id in room["players"]:

            await websocket.send_json({

                "type": "error",

                "message":
                "This player is already connected."

            })

            await websocket.close()

            return False


        # ----------------------------------------------------
        # CONNECT PLAYER
        # ----------------------------------------------------

        room["players"][player_id] = websocket

        return True


    # ========================================================
    # DISCONNECT PLAYER
    # ========================================================

    def disconnect(
        self,
        room_code,
        player_id
    ):

        if room_code not in self.rooms:

            return


        room = self.rooms[room_code]


        if player_id in room["players"]:

            del room["players"][player_id]


        if len(room["players"]) == 0:

            del self.rooms[room_code]


    # ========================================================
    # BROADCAST
    # ========================================================

    async def broadcast(
        self,
        room_code,
        message
    ):

        if room_code not in self.rooms:

            return


        room = self.rooms[room_code]


        for websocket in list(
            room["players"].values()
        ):

            try:

                await websocket.send_json(
                    message
                )

            except Exception:

                pass


    # ========================================================
    # SEND TO OTHER PLAYER
    # ========================================================

    async def send_to_other_player(
        self,
        room_code,
        player_id,
        message
    ):

        if room_code not in self.rooms:

            return


        room = self.rooms[room_code]


        for other_id, websocket in list(
            room["players"].items()
        ):

            if other_id != player_id:

                try:

                    await websocket.send_json(
                        message
                    )

                except Exception:

                    pass


manager = RoomManager()


# ============================================================
# TEXT GENERATOR
# ============================================================

def generate_words(count):

    word_bank = [

        "warrior",
        "battle",
        "speed",
        "accuracy",
        "focus",
        "keyboard",
        "victory",
        "practice",
        "power",
        "skill",
        "challenge",
        "typing",
        "future",
        "strength",
        "control",
        "movement",
        "energy",
        "courage",
        "learning",
        "progress",
        "success",
        "master",
        "quick",
        "calm",
        "precise",
        "strong",
        "brave",
        "steady",
        "sharp",
        "creative"

    ]


    words = []


    for _ in range(count):

        words.append(
            random.choice(
                word_bank
            )
        )


    return " ".join(words)


# ============================================================
# PARAGRAPH GENERATOR
# ============================================================

def generate_paragraph(word_count):

    source = random.choice(
        PARAGRAPH_SOURCES
    )


    words = source.split()


    while len(words) < word_count:

        extra = random.choice(
            PARAGRAPH_SOURCES
        )

        words.extend(
            extra.split()
        )


    return " ".join(
        words[:word_count]
    )


# ============================================================
# CHALLENGE GENERATOR
# ============================================================

def generate_challenge(
    mode,
    length
):

    mode = str(mode).lower()


    # --------------------------------------------------------
    # WORDS
    # --------------------------------------------------------

    if mode == "words":

        try:

            count = int(length)

        except:

            count = 25


        allowed = [
            10,
            25,
            50,
            100
        ]


        if count not in allowed:

            count = 25


        return generate_words(
            count
        )


    # --------------------------------------------------------
    # SENTENCE
    # --------------------------------------------------------

    if mode == "sentence":

        return random.choice(
            SENTENCES
        )


    # --------------------------------------------------------
    # PARAGRAPH
    # --------------------------------------------------------

    if mode == "paragraph":

        try:

            count = int(length)

        except:

            count = 50


        allowed = [
            25,
            50,
            100,
            200
        ]


        if count not in allowed:

            count = 50


        return generate_paragraph(
            count
        )


    # --------------------------------------------------------
    # QUOTE
    # --------------------------------------------------------
    #
    # Accept BOTH:
    #
    # "quote"
    # "quotes"
    #
    # This keeps frontend/backend compatible.
    #

    if mode in [
        "quote",
        "quotes"
    ]:

        return random.choice(
            QUOTES
        )


    # --------------------------------------------------------
    # DEFAULT
    # --------------------------------------------------------

    return random.choice(
        SENTENCES
    )


# ============================================================
# START NEW BATTLE
# ============================================================

async def start_battle(
    room_code
):

    if room_code not in manager.rooms:

        return


    room = manager.rooms[
        room_code
    ]


    mode = room["mode"]

    length = room["length"]

    backspace = room.get(
        "backspace",
        True
    )


    # --------------------------------------------------------
    # DEFAULT SETTINGS
    # --------------------------------------------------------

    if mode is None:

        mode = "words"


    if length is None:

        length = 25


    room["mode"] = mode

    room["length"] = length

    room["backspace"] = bool(
        backspace
    )


    # --------------------------------------------------------
    # GENERATE SHARED CHALLENGE
    # --------------------------------------------------------

    room["text"] = generate_challenge(
        mode,
        length
    )


    room["state"] = "battle"

    room["winner"] = None

    room["rematch_votes"] = set()


    # --------------------------------------------------------
    # SEND SAME CHALLENGE TO BOTH PLAYERS
    # --------------------------------------------------------

    await manager.broadcast(

        room_code,

        {

            "type":
            "room_ready",

            "players":
            2,

            "paragraph":
            room["text"],

            "text":
            room["text"],

            "mode":
            room["mode"],

            "length":
            room["length"],

            # ==============================================
            # SAME BACKSPACE SETTING FOR BOTH PLAYERS
            # ==============================================

            "backspace":
            room["backspace"],

            "state":
            "battle"

        }

    )


# ============================================================
# HOME
# ============================================================

@app.get("/")
async def home():

    return {

        "game":
        "Keyboard Warrior",

        "server":
        "online",

        "websocket":
        "ready"

    }


# ============================================================
# WEBSOCKET
# ============================================================

@app.websocket(
    "/ws/{room_code}/{player_id}"
)
async def websocket_endpoint(
    websocket: WebSocket,
    room_code: str,
    player_id: str
):

    room_code = room_code.upper()


    # --------------------------------------------------------
    # CONNECT
    # --------------------------------------------------------

    connected = await manager.connect(

        room_code,

        websocket,

        player_id

    )


    if not connected:

        return


    try:

        room = manager.rooms[
            room_code
        ]


        players = len(
            room["players"]
        )


        # ====================================================
        # PLAYER JOINED
        # ====================================================

        await websocket.send_json({

            "type":
            "room_joined",

            "room":
            room_code,

            "room_code":
            room_code,

            "players":
            players,

            "player_id":
            player_id

        })


        # ====================================================
        # FIRST PLAYER
        # ====================================================

        if players == 1:

            await websocket.send_json({

                "type":
                "waiting",

                "message":
                "Waiting for opponent..."

            })


        # ====================================================
        # SECOND PLAYER
        # ====================================================
        #
        # IMPORTANT:
        #
        # We DO NOT immediately start the battle here.
        #
        # The creator's room_config message determines:
        #
        # mode
        # length
        # backspace
        #
        # Once the creator sends the configuration,
        # the battle starts.
        #
        # This prevents Player 2 from accidentally receiving
        # a battle before the creator's settings arrive.
        #

        elif players == 2:

            if room["mode"] is not None:

                await start_battle(
                    room_code
                )

            else:

                await manager.broadcast(

                    room_code,

                    {

                        "type":
                        "waiting",

                        "message":
                        "Opponent joined. Waiting for room settings..."

                    }

                )


        # ====================================================
        # MESSAGE LOOP
        # ====================================================

        while True:

            data = await websocket.receive_json()

            message_type = data.get(
                "type"
            )


            # =================================================
            # ROOM CONFIG
            # =================================================

            if message_type == "room_config":

                # ------------------------------------------------
                # ONLY CREATOR CAN CHOOSE SETTINGS
                # ------------------------------------------------

                if player_id != room["creator"]:

                    await websocket.send_json({

                        "type":
                        "error",

                        "message":
                        "Only the room creator can choose settings."

                    })

                    continue


                # ------------------------------------------------
                # SETTINGS CAN ONLY BE CHANGED IN WAITING STATE
                # ------------------------------------------------

                if room["state"] != "waiting":

                    await websocket.send_json({

                        "type":
                        "error",

                        "message":
                        "Room settings cannot be changed now."

                    })

                    continue


                # ------------------------------------------------
                # MODE
                # ------------------------------------------------

                mode = data.get(
                    "mode",
                    "words"
                )


                # ------------------------------------------------
                # LENGTH
                # ------------------------------------------------

                length = data.get(
                    "length",
                    25
                )


                # ------------------------------------------------
                # BACKSPACE
                # ------------------------------------------------
                #
                # Default = ON
                #
                # bool() converts the received value into a
                # safe True/False value.
                #

                backspace = data.get(
                    "backspace",
                    True
                )


                # ------------------------------------------------
                # VALID MODES
                # ------------------------------------------------

                valid_modes = [

                    "words",
                    "sentence",
                    "paragraph",
                    "quote",
                    "quotes"

                ]


                if mode not in valid_modes:

                    mode = "words"


                # ------------------------------------------------
                # NORMALIZE QUOTE MODE
                # ------------------------------------------------

                if mode == "quotes":

                    mode = "quote"


                # ------------------------------------------------
                # VALID LENGTH
                # ------------------------------------------------

                try:

                    length = int(length)

                except:

                    length = 25


                if mode == "words":

                    allowed_lengths = [
                        10,
                        25,
                        50,
                        100
                    ]

                    if length not in allowed_lengths:

                        length = 25


                elif mode == "paragraph":

                    allowed_lengths = [
                        25,
                        50,
                        100,
                        200
                    ]

                    if length not in allowed_lengths:

                        length = 50


                else:

                    length = 25


                # ------------------------------------------------
                # SAVE ROOM SETTINGS
                # ------------------------------------------------

                room["mode"] = mode

                room["length"] = length

                room["backspace"] = bool(
                    backspace
                )


                # ------------------------------------------------
                # CONFIRM TO CREATOR
                # ------------------------------------------------

                await websocket.send_json({

                    "type":
                    "room_configured",

                    "mode":
                    room["mode"],

                    "length":
                    room["length"],

                    "backspace":
                    room["backspace"]

                })


                # ------------------------------------------------
                # IF BOTH PLAYERS ARE CONNECTED,
                # START THE BATTLE.
                # ------------------------------------------------

                if len(
                    room["players"]
                ) == 2:

                    await start_battle(
                        room_code
                    )


            # =================================================
            # TYPING
            # =================================================

            elif message_type == "typing":

                if room["state"] != "battle":

                    continue


                typed_text = data.get(
                    "text",
                    ""
                )


                if room["text"] is not None:

                    if len(typed_text) > len(
                        room["text"]
                    ):

                        typed_text = typed_text[
                            :len(room["text"])
                        ]


                await manager.send_to_other_player(

                    room_code,

                    player_id,

                    {

                        "type":
                        "opponent_typing",

                        "player_id":
                        player_id,

                        "text":
                        typed_text,

                        "wpm":
                        data.get(
                            "wpm",
                            0
                        ),

                        "accuracy":
                        data.get(
                            "accuracy",
                            100
                        ),

                        "errors":
                        data.get(
                            "errors",
                            0
                        )

                    }

                )


            # =================================================
            # FINISH
            # =================================================

            elif message_type == "finish":

                if room["state"] == "finished":

                    await websocket.send_json({

                        "type":
                        "match_finished",

                        "message":
                        "The match has already finished."

                    })

                    continue


                if room["state"] != "battle":

                    continue


                room["state"] = "finished"

                room["winner"] = player_id


                winner_wpm = data.get(
                    "wpm",
                    0
                )


                winner_accuracy = data.get(
                    "accuracy",
                    100
                )


                winner_errors = data.get(
                    "errors",
                    0
                )


                # ---------------------------------------------
                # WINNER
                # ---------------------------------------------

                await websocket.send_json({

                    "type":
                    "winner",

                    "player_id":
                    player_id,

                    "wpm":
                    winner_wpm,

                    "accuracy":
                    winner_accuracy,

                    "errors":
                    winner_errors

                })


                # ---------------------------------------------
                # LOSER
                # ---------------------------------------------

                await manager.send_to_other_player(

                    room_code,

                    player_id,

                    {

                        "type":
                        "loser",

                        "player_id":
                        player_id,

                        "wpm":
                        winner_wpm,

                        "accuracy":
                        winner_accuracy,

                        "errors":
                        winner_errors

                    }

                )


            # =================================================
            # REMATCH
            # =================================================

            elif message_type == "rematch":

                if room["state"] != "finished":

                    await websocket.send_json({

                        "type":
                        "error",

                        "message":
                        "Rematch is not available yet."

                    })

                    continue


                room["rematch_votes"].add(
                    player_id
                )


                if len(
                    room["rematch_votes"]
                ) == 2:

                    # The same room settings are kept,
                    # including Backspace ON/OFF.
                    await start_battle(
                        room_code
                    )


                else:

                    await websocket.send_json({

                        "type":
                        "rematch_waiting",

                        "message":
                        "Waiting for your opponent to accept the rematch."

                    })


            # =================================================
            # UNKNOWN MESSAGE
            # =================================================

            else:

                await websocket.send_json({

                    "type":
                    "error",

                    "message":
                    "Unknown message type."

                })


    # ========================================================
    # PLAYER DISCONNECTED
    # ========================================================

    except WebSocketDisconnect:

        manager.disconnect(

            room_code,

            player_id

        )


        if room_code in manager.rooms:

            await manager.send_to_other_player(

                room_code,

                player_id,

                {

                    "type":
                    "opponent_left",

                    "message":
                    "Your opponent left the room."

                }

            )