
import os 
from pymongo import MongoClient
from dotenv import load_dotenv


# Load variables from .env
load_dotenv()


# Get MongoDB connection URL
MONGODB_URL = os.getenv("MONGODB_URL")


if not MONGODB_URL:
    raise RuntimeError("MONGODB_URL is missing from .env")


# Connect to MongoDB
client = MongoClient(MONGODB_URL)


# Select our database
db = client["keyboard_warrior"]


# Collections we will use later
users_collection = db["users"]
matches_collection = db["matches"]


# Test MongoDB connection
def test_database():
    try:
        client.admin.command("ping")
        print("MongoDB connected successfully!")
        return True

    except Exception as e:
        print("MongoDB connection failed:", e)
        return False

