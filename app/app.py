from flask import Flask, render_template, jsonify, send_from_directory, redirect, url_for, request
from random import random
import json
import pandas as pd
import numpy as np
import os
from modelHelper import ModelHelper

# Create Flask
app = Flask(__name__, static_url_path='/static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
modelHelper = ModelHelper()

# Route 
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

@app.route("/tableau")
def tableau():
    # Return template and data
    return render_template("tableau.html")

@app.route("/recommender")
def recommender():
    # Return template and data
    return render_template("recommender.html")

@app.route("/data")
def data():
    # Return template and data
    return render_template("data.html")

@app.route("/resources")
def resources():
    # Return template and data
    return render_template("resources.html")

@app.route("/recommend_beers_name", methods=["POST"])
def recommend_beers_name():
    content = request.json["data"]
    beer_name = content["beer_name"]
    prediction = modelHelper.recommend_beers_name(beer_name)

    return prediction

@app.route("/recommend_beers_style", methods=["POST"])
def recommend_beers_style():
    content = request.json["data"]

    beer_style = content["beer_style"]

    prediction = modelHelper.recommend_beers_style(beer_style)

    return prediction

@app.route("/recommend_beers_abv", methods=["POST"])
def recommend_beers_abv():
    content = request.json["data"]

    beer_abv = content["beer_abv"]
    beer_ibu = content["beer_ibu"]

    prediction = modelHelper.recommend_beers_abv(beer_abv, beer_ibu)

    return prediction

#############################################################
#cache control

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

#main
if __name__ == "__main__":
    app.run(debug=True)