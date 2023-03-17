import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(abv, beer_style):
        beer_stylez = 0
        






        input_pred = [[abv, beer_style]]


        filename = 'finalized_model.sav'
        ada_load = pickle.load(open(filename, 'rb'))

        X = np.array(input_pred)
        preds = ada_load.predict_proba(X)
        preds_singular = ada_load.predict(X)

        return preds_singular[0]