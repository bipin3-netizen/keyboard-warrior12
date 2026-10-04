import asyncio
import websockets
import json


async def player1():

    room_code = "TEST01"
    player_id = "player1"

    url = f"ws://127.0.0.1:8000/ws/{room_code}/{player_id}"

    print("Connecting to server...")
    
    async with websockets.connect(url) as websocket:

        print("Player 1 connected!")
        print("Room code:", room_code)

        while True:

            message = await websocket.recv()

            data = json.loads(message)

            print("SERVER:", data)


asyncio.run(player1())