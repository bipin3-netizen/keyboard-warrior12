
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import random


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


        # ----------------------------------------------------
        # CREATE ROOM
        # ----------------------------------------------------

        if room_code not in self.rooms:

            self.rooms[room_code] = {

                "players": {},

                "state": "waiting",

                "winner": None,

                "text": None,

                "mode": None,

                "length": None,

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


        # ----------------------------------------------------
        # DELETE EMPTY ROOM
        # ----------------------------------------------------

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

                await websocket.send_json(message)

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

                    await websocket.send_json(message)

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
            random.choice(word_bank)
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


    # --------------------------------------------------------
    # If source is shorter than requested,
    # keep adding random source paragraphs.
    # --------------------------------------------------------

    while len(words) < word_count:

        extra = random.choice(
            PARAGRAPH_SOURCES
        )

        words.extend(extra.split())


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


        allowed = [10, 25, 50, 100]


        if count not in allowed:

            count = 25


        return generate_words(count)


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


        allowed = [25, 50, 100, 200]


        if count not in allowed:

            count = 50


        return generate_paragraph(
            count
        )


    # --------------------------------------------------------
    # QUOTE
    # --------------------------------------------------------

    if mode == "quotes":

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


    room = manager.rooms[room_code]


    mode = room["mode"]

    length = room["length"]


    # --------------------------------------------------------
    # Default settings
    # --------------------------------------------------------

    if mode is None:

        mode = "words"


    if length is None:

        length = 25


    room["mode"] = mode

    room["length"] = length


    # --------------------------------------------------------
    # Generate shared challenge
    # --------------------------------------------------------

    room["text"] = generate_challenge(
        mode,
        length
    )


    room["state"] = "battle"

    room["winner"] = None

    room["rematch_votes"] = set()


    # --------------------------------------------------------
    # Send same challenge to both players
    # --------------------------------------------------------

    await manager.broadcast(

        room_code,

        {

            "type": "room_ready",

            "players": 2,

            "paragraph": room["text"],

            "text": room["text"],

            "mode": room["mode"],

            "length": room["length"],

            "state": "battle"

        }

    )


# ============================================================
# HOME
# ============================================================

@app.get("/")
async def home():

    return {

        "game": "Keyboard Warrior",

        "server": "online",

        "websocket": "ready"

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

        room = manager.rooms[room_code]

        players = len(
            room["players"]
        )


        # ====================================================
        # PLAYER JOINED
        # ====================================================

        await websocket.send_json({

            "type": "room_joined",

            "room": room_code,

            "players": players,

            "player_id": player_id

        })


        # ====================================================
        # FIRST PLAYER
        # ====================================================

        if players == 1:

            await websocket.send_json({

                "type": "waiting",

                "message":
                "Waiting for opponent..."

            })


        # ====================================================
        # SECOND PLAYER
        # ====================================================

        elif players == 2:

            # ------------------------------------------------
            # If creator did not send settings yet,
            # use default settings.
            # ------------------------------------------------

            if room["mode"] is None:

                room["mode"] = "words"


            if room["length"] is None:

                room["length"] = 25


            await start_battle(
                room_code
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

                # ---------------------------------------------
                # Only creator can choose settings
                # ---------------------------------------------

                if player_id != room["creator"]:

                    await websocket.send_json({

                        "type": "error",

                        "message":
                        "Only the room creator can choose settings."

                    })

                    continue


                # ---------------------------------------------
                # Do not change settings after battle starts
                # ---------------------------------------------

                if room["state"] != "waiting":

                    await websocket.send_json({

                        "type": "error",

                        "message":
                        "Room settings cannot be changed now."

                    })

                    continue


                mode = data.get(
                    "mode",
                    "words"
                )


                length = data.get(
                    "length",
                    25
                )


                valid_modes = [

                    "words",
                    "sentence",
                    "paragraph",
                    "quotes"

                ]


                if mode not in valid_modes:

                    mode = "words"


                room["mode"] = mode

                room["length"] = length


                await websocket.send_json({

                    "type": "room_configured",

                    "mode": room["mode"],

                    "length": room["length"]

                })


                # ---------------------------------------------
                # If opponent is already waiting,
                # start immediately.
                # ---------------------------------------------

                if len(room["players"]) == 2:

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


                # ---------------------------------------------
                # Prevent text from becoming longer than
                # the challenge.
                # ---------------------------------------------

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

                # ---------------------------------------------
                # Already finished
                # ---------------------------------------------

                if room["state"] == "finished":

                    await websocket.send_json({

                        "type":
                        "match_finished",

                        "message":
                        "The match has already finished."

                    })

                    continue


                # ---------------------------------------------
                # Must be in battle
                # ---------------------------------------------

                if room["state"] != "battle":

                    continue


                # ---------------------------------------------
                # Winner
                # ---------------------------------------------

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
                # Winner message
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
                # Loser message
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

                # ---------------------------------------------
                # Only finished matches can rematch
                # ---------------------------------------------

                if room["state"] != "finished":

                    await websocket.send_json({

                        "type":
                        "error",

                        "message":
                        "Rematch is not available yet."

                    })

                    continue


                # ---------------------------------------------
                # Add player vote
                # ---------------------------------------------

                room["rematch_votes"].add(
                    player_id
                )


                # ---------------------------------------------
                # Both players accepted
                # ---------------------------------------------

                if len(
                    room["rematch_votes"]
                ) == 2:

                    await start_battle(
                        room_code
                    )


                # ---------------------------------------------
                # Waiting for other player
                # ---------------------------------------------

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


        # ----------------------------------------------------
        # Notify remaining player
        # ----------------------------------------------------

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

