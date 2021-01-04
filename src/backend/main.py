import pickle
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity
from model import recommend



app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class song_rec(BaseModel):
    song_id: int

#get song id for recommendation
@app.post("/song_rec/{song_id}")
async def song_recommend(song_id: int):
    
    #make recommendations
    #by default, no. of recs is 10 
    recs = recommend(item_id = song_id)
    return recs

