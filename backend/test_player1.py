
import asyncio
import json
import websockets


ROOM_CODE = "BATTLE01"
PLAYER_ID = "player1"


async def player1():

    url = (
        f"ws://127.0.0.1:8000/"
        f"ws/{ROOM_CODE}/{PLAYER_ID}"
    )

    print("\n==============================")
    print("KEYBOARD WARRIOR - PLAYER 1")
    print("==============================")

    print("Connecting...")

    async with websockets.connect(url) as websocket:

        print("Player 1 connected!")
        print("Room:", ROOM_CODE)

        # ----------------------------------------------------
        # Configure the room
        # ----------------------------------------------------

        await websocket.send(
            json.dumps({
                "type": "room_config",
                "mode": "words",
                "length": 25
            })
        )

        print("Room settings sent.")
        print("Mode: words")
        print("Length: 25")
        print("\nWaiting for Player 2...\n")


        while True:

            message = await websocket.recv()

            data = json.loads(message)

            print("SERVER:", data)


            # =================================================
            # ROOM READY
            # =================================================

            if data.get("type") == "room_ready":

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
                    "warrior battle speed accuracy",

                    "wpm":
                    55,

                    "accuracy":
                    96,

                    "errors":
                    2

                }


                await websocket.send(
                    json.dumps(typing_message)
                )


                print(
                    "\nPLAYER 1 SENT TYPING DATA"
                )


                # ------------------------------------------------
                # Finish match
                # ------------------------------------------------

                await asyncio.sleep(2)


                finish_message = {

                    "type": "finish",

                    "wpm":
                    55,

                    "accuracy":
                    96,

                    "errors":
                    2

                }


                await websocket.send(
                    json.dumps(finish_message)
                )


                print(
                    "PLAYER 1 SENT FINISH"
                )


            # =================================================
            # REMATCH WAITING
            # =================================================

            elif data.get(
                "type"
            ) == "rematch_waiting":

                print(
                    "\nWaiting for Player 2 "
                    "to accept rematch..."
                )


            # =================================================
            # WINNER
            # =================================================

            elif data.get(
                "type"
            ) == "winner":

                print("\n🏆 PLAYER 1 WON!")

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
                    "\nPLAYER 1 REQUESTED REMATCH"
                )


            # =================================================
            # LOSER
            # =================================================

            elif data.get(
                "type"
            ) == "loser":

                print("\nPLAYER 1 LOST.")


            # =================================================
            # NEW BATTLE
            # =================================================

            elif data.get(
                "type"
            ) == "room_joined":

                print(
                    "Players in room:",
                    data.get("players")
                )


            # =================================================
            # OPPONENT TYPING
            # =================================================

            elif data.get(
                "type"
            ) == "opponent_typing":

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
            # OPPONENT LEFT
            # =================================================

            elif data.get(
                "type"
            ) == "opponent_left":

                print(
                    "\nOpponent left the room."
                )

                break


            # =================================================
            # ERROR
            # =================================================

            elif data.get(
                "type"
            ) == "error":

                print(
                    "\nSERVER ERROR:",
                    data.get("message")
                )


asyncio.run(player1())

