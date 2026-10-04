import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from pymongo import MongoClient


# Load .env file
load_dotenv()


MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017"
)


client = MongoClient(MONGO_URI)

db = client["keyboard_warrior"]

matches = db["matches"]


async def save_match(room_code, winner_id, winner_wpm):

    try:

        matches.insert_one({
            "room_code": room_code,
            "winner_id": winner_id,
            "winner_wpm": winner_wpm,
            "created_at": datetime.now(timezone.utc)
        })

        print("Match saved to database.")

    except Exception as error:

        print("Database error:", error)