import numpy as np 
import pandas as pd
import _pickle as cPickle
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel



#the sample file contains only 10% of the english songs
#10% used as similarity matrix was running out of RAM
g = open('/Users/ayoadesunloye/projects/song-rec/src/backend/data/eng_songs_sample.pkl', 'rb') #change path with your own
eng_songs_sample=cPickle.load(g)

#creating TFIDF Vector on the lyrics
tfidf = TfidfVectorizer(stop_words='english' )
eng_songs_sample['lyrics'] = eng_songs_sample['lyrics'].fillna('')
lyrics_matrix = tfidf.fit_transform(eng_songs_sample['lyrics'])

#calculating cosine simlarity
similarity_matrix = linear_kernel(lyrics_matrix,lyrics_matrix)

#sorting through the results of the similarity matrix
results = {}
for idx, row in eng_songs_sample.iterrows():
    similar_indices = similarity_matrix[idx].argsort()[:-100:-1] 
    similar_items = [(similarity_matrix[idx][i], eng_songs_sample['index'][i]) for i in similar_indices] 
    results[row['index']] = similar_items[1:]

#making recommendations
def item(id):  
        song = eng_songs_sample.loc[eng_songs_sample['index'] == id]['song'].tolist()[0].split(' - ')[0]
        artist = eng_songs_sample.loc[eng_songs_sample['index'] == id]['artist'].tolist()[0].split(' - ')[0] 
        return song, artist

def recommend(item_id, num=10):
        song_to_rec = ( "Recommending " + str(num) + " songs similar to " + item(item_id)[0] + ' by '  + item(item_id)[1])
        recs = results[item_id][:num] 
        recs_result = []
        sname  = []
        aname = []
        score = []
        no = []
        song_id = []
        for x in range(len(recs)):
            no.append(x+1)
        for rec in recs: 
                
                sname.append(item(rec[1])[0])
                aname.append(item(rec[1])[1])
                score.append(str(rec[0]))
                song_id.append(str(rec[1]))
        res = [{'song':b,  'artist':c, 'score': d, 'id': e} for ( b, c, d, e) in zip( sname, aname, score, song_id)]  
        return (song_to_rec, res)
