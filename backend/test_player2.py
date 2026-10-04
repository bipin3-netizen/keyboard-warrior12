
import asyncio
import json
import websockets


ROOM_CODE = "BATTLE01"
PLAYER_ID = "player2"


async def player2():

    url = (
        f"ws://127.0.0.1:8000/"
        f"ws/{ROOM_CODE}/{PLAYER_ID}"
    )

    print("\n==============================")
    print("KEYBOARD WARRIOR - PLAYER 2")
    print("==============================")

    print("Connecting...")

    async with websockets.connect(url) as websocket:

        print("Player 2 connected!")
        print("Room:", ROOM_CODE)


        while True:

            message = await websocket.recv()

            data = json.loads(message)

            print("SERVER:", data)


            # =================================================
            # ROOM JOINED
            # =================================================

            if data.get("type") == "room_joined":

                print(
                    "Players in room:",
                    data.get("players")
                )


            # =================================================
            # WAITING
            # =================================================

            elif data.get("type") == "waiting":

                print(
                    "\nWaiting for Player 1..."
                )


            # =================================================
            # ROOM READY
            # =================================================

            elif data.get("type") == "room_ready":

                print("\n================================")
                print("BOTH PLAYERS ARE READY!")
                print("================================")

                print(
                    "Mode:",
                    data.get("mode")
                )

                print(
                    "Length:",
                    data.get("length")
                )

                print(
                    "\nSHARED TEXT:\n",
                    data.get("text")
                )


                # ------------------------------------------------
                # Send typing data
                # ------------------------------------------------

                await asyncio.sleep(2)


                typing_message = {

                    "type": "typing",

                    "text":
                    "warrior battle speed",

                    "wpm":
                    60,

                    "accuracy":
                    98,

                    "errors":
                    1

                }


                await websocket.send(
                    json.dumps(typing_message)
                )


                print(
                    "\nPLAYER 2 SENT TYPING DATA"
                )


                # ------------------------------------------------
                # Wait before finishing
                # ------------------------------------------------

                await asyncio.sleep(4)


                finish_message = {

                    "type": "finish",

                    "wpm":
                    60,

                    "accuracy":
                    98,

                    "errors":
                    1

                }


                await websocket.send(
                    json.dumps(finish_message)
                )


                print(
                    "PLAYER 2 SENT FINISH"
                )


            # =================================================
            # OPPONENT TYPING
            # =================================================

            elif data.get("type") == "opponent_typing":

                print(
                    "\nOPPONENT TYPING:"
                )

                print(
                    "Text:",
                    data.get("text")
                )

                print(
                    "WPM:",
                    data.get("wpm")
                )

                print(
                    "Accuracy:",
                    data.get("accuracy")
                )

                print(
                    "Errors:",
                    data.get("errors")
                )


            # =================================================
            # PLAYER 2 WINS
            # =================================================

            elif data.get("type") == "winner":

                print("\n🏆 PLAYER 2 WON!")

                print(
                    "WPM:",
                    data.get("wpm")
                )

                print(
                    "Accuracy:",
                    data.get("accuracy")
                )

                print(
                    "Errors:",
                    data.get("errors")
                )


                # ------------------------------------------------
                # Request rematch
                # ------------------------------------------------

                await asyncio.sleep(2)


                await websocket.send(
                    json.dumps({
                        "type": "rematch"
                    })
                )


                print(
                    "\nPLAYER 2 REQUESTED REMATCH"
                )


            # =================================================
            # PLAYER 2 LOSES
            # =================================================

            elif data.get("type") == "loser":

                print(
                    "\nPLAYER 2 LOST."
                )


                # ------------------------------------------------
                # Request rematch even after losing
                # ------------------------------------------------

                await asyncio.sleep(2)


                await websocket.send(
                    json.dumps({
                        "type": "rematch"
                    })
                )


                print(
                    "\nPLAYER 2 REQUESTED REMATCH"
                )


            # =================================================
            # REMATCH WAITING
            # =================================================

            elif data.get("type") == "rematch_waiting":

                print(
                    "\nWaiting for Player 1 "
                    "to accept rematch..."
                )


            # =================================================
            # NEW BATTLE
            # =================================================

            elif data.get("type") == "room_ready":

                print(
                    "\nNEW BATTLE STARTED!"
                )


            # =================================================
            # OPPONENT LEFT
            # =================================================

            elif data.get("type") == "opponent_left":

                print(
                    "\nOpponent left the room."
                )

                break


            # =================================================
            # ROOM FULL
            # =================================================

            elif data.get("type") == "room_full":

                print(
                    "\nROOM FULL:"
                )

                print(
                    data.get("message")
                )

                break


            # =================================================
            # MATCH FINISHED
            # =================================================

            elif data.get("type") == "match_finished":

                print(
                    "\nMATCH FINISHED:"
                )

                print(
                    data.get("message")
                )


            # =================================================
            # ERROR
            # =================================================

            elif data.get("type") == "error":

                print(
                    "\nSERVER ERROR:"
                )

                print(
                    data.get("message")
                )


asyncio.run(player2())

