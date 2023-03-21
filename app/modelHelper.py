import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from sklearn.neighbors import NearestNeighbors

df = pd.read_csv("app/static/data/aggregated_review_scores.csv")
    
bins = [0, 5.0, 7.9, df.abv.max()]
labels = ['Low ABV (0-5%)', 'Medium ABV (5-8%)', 'High ABV (8%+)']
df['abv_category'] = pd.cut(df.abv, bins=bins, labels=labels)

bins2 = [0, 20.0, 49.9, df.estimated_ibu.max()]
labels2 = ['Low Bitterness (0-20 IBU)', 'Medium Bitterness (20-50 IBU)', 'High Bitterness (50+ IBU)']
df['ibu_category'] = pd.cut(df.estimated_ibu, bins=bins2, labels=labels2)

df_scaled = df.copy()

df.look = df.look.round(2)
df.smell = df.smell.round(2)
df.taste = df.taste.round(2)
df.feel = df.feel.round(2)

# select features for the model
features = ['estimated_ibu', 'look', 'smell', 'taste', 'feel', 'abv']

# scale the features to a range between 0 and 1
scaler = MinMaxScaler()
df_scaled[features] = scaler.fit_transform(df_scaled[features])

# create a dataframe with only the relevant features
df_model = df_scaled[['beer_id', 'beer_name', 'beer_style', 'ibu_category'] + features + ['abv_category', 'brewery_name', 'city', 'state']]
df = df[['beer_name', 'beer_style', 'abv_category', 'ibu_category', 'availability', 'brewery_name', 'city', 'state', 'types']]

# define the number of nearest neighbors to consider
k = 10

# initialize the model with the number of neighbors
model = NearestNeighbors(n_neighbors=k)

# fit the model to the data
model.fit(df_model[features])

class ModelHelper():

    def __init__(self):
        pass

    # define a function to recommend beers based on a given beer name
    def recommend_beers_name(self, beer_name):
        # get the beer_id of the given beer name
        beer_id = df_model[df_model['beer_name'] == beer_name]['beer_id'].iloc[0]
        
        # get the index of the beer in the model dataframe
        idx = df_model[df_model['beer_id'] == beer_id].index[0]
        
        # get the features of the beer
        beer_features = df_model.loc[idx, features].values.reshape(1, -1)
        
        # find the k nearest neighbors
        distances, indices = model.kneighbors(beer_features)
        
        # get the beer names of the nearest neighbors
        beer_names = df.iloc[indices[0]]
        
        return beer_names.to_json(orient='records')
    
    # define a function to recommend beers based on a given beer style
    def recommend_beers_style(self, beer_style):
        # get the beer_ids of the given beer style
        beer_ids = df_model[df_model['beer_style'] == beer_style]['beer_id']
        
        # get the indices of the beers in the model dataframe
        indices = [df_model[df_model['beer_id'] == beer_id].index[0] for beer_id in beer_ids]
        
        # get the features of the beers
        beer_features = df_model.loc[indices, features]
        
        # find the k nearest neighbors
        distances, indices = model.kneighbors(beer_features)
        
        # get the beer names of the nearest neighbors
        beer_names = df.loc[indices[0]]
        
        return beer_names.to_json(orient='records')
    
    # define a function to recommend beers based on a given beer abv and ibu
    def recommend_beers_abv(self, abv_category, ibu_category):
        # get the beer_ids of the given beer abv and ibu
        beer_ids = df_model[(df_model['abv_category'] == abv_category) & 
                            (df_model['ibu_category'] == ibu_category)]['beer_id']
        
        # get the indices of the beers in the model dataframe
        indices = [df_model[df_model['beer_id'] == beer_id].index[0] for beer_id in beer_ids]
        
        # get the features of the beers
        beer_features = df_model.loc[indices, features]
        
        # find the k nearest neighbors
        distances, indices = model.kneighbors(beer_features)
        
        # get the beer names of the nearest neighbors
        beer_names = df.loc[indices[0]]
        
        return beer_names.to_json(orient='records')