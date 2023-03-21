$(document).ready(function() {

    $("#filterbyname").click(function() {
        var beerName = $("#name").val();
        makePredictionsName(beerName);
    });

    $("#filterbystyle").click(function() {
        var beerStyle = $("#style").val();
        makePredictionsStyle(beerStyle);
    });

    $("#filterbyabv").click(function() {
        var abv = $("#abv").val();
        var ibu = $("#ibu").val();
        makePredictionsAbvIbu(abv, ibu);
    });
});

// call Flask API endpoint
function makePredictionsName(beer_name) {
    // create the payload
    var payload = {
        "beer_name": beer_name
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/recommend_beers_name",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {

            var beer = JSON.parse(returnedData)

            let table = '<thead><tr><th style="background-color:#DEA90A; padding:5px">Name</th><th style="background-color:#DEA90A; padding:5px">Style</th><th style="background-color:#DEA90A; padding:5px">ABV</th><th style="background-color:#DEA90A; padding:5px">IBU</th><th style="background-color:#DEA90A; padding:5px">Availability</th><th style="background-color:#DEA90A; padding:5px">Brewery</th><th style="background-color:#DEA90A; padding:5px">City</th><th style="background-color:#DEA90A; padding:5px">State</th><th style="background-color:#DEA90A; padding:5px">Brewery Type</th></tr></thead><tbody>';

            $.each(beer , function(index, item) { 
                table += '<tr><td style="background-color:#DEA90A; padding:5px">'+item["beer_name"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["beer_style"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["abv_category"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["ibu_category"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["availability"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["brewery_name"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["city"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["state"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["types"]+'</td></tr>';
            });

            table += '</tbody>';

            $('#output').empty().html(table);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("The beer you entered is not in this list. Check spelling and try again.");
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

// call Flask API endpoint
function makePredictionsStyle(beer_style) {
    // create the payload
    var payload = {
        "beer_style": beer_style
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/recommend_beers_style",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {

            var beer = JSON.parse(returnedData)

            let table = '<thead><tr><th style="background-color:#DEA90A; padding:5px">Name</th><th style="background-color:#DEA90A; padding:5px">Style</th><th style="background-color:#DEA90A; padding:5px">ABV</th><th style="background-color:#DEA90A; padding:5px">IBU</th><th style="background-color:#DEA90A; padding:5px">Availability</th><th style="background-color:#DEA90A; padding:5px">Brewery</th><th style="background-color:#DEA90A; padding:5px">City</th><th style="background-color:#DEA90A; padding:5px">State</th><th style="background-color:#DEA90A; padding:5px">Brewery Type</th></tr></thead><tbody>';

            $.each(beer , function(index, item) { 
                table += '<tr><td style="background-color:#DEA90A; padding:5px">'+item["beer_name"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["beer_style"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["abv_category"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["ibu_category"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["availability"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["brewery_name"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["city"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["state"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["types"]+'</td></tr>';
            });

            table += '</tbody>';

            $('#output').empty().html(table);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}

// call Flask API endpoint
function makePredictionsAbvIbu(abv, ibu) {
    // create the payload
    var payload = {
        "beer_abv": abv,
        "beer_ibu": ibu
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/recommend_beers_abv",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {

            var beer = JSON.parse(returnedData)

            let table = '<thead><tr><th style="background-color:#DEA90A; padding:5px">Name</th><th style="background-color:#DEA90A; padding:5px">Style</th><th style="background-color:#DEA90A; padding:5px">ABV</th><th style="background-color:#DEA90A; padding:5px">IBU</th><th style="background-color:#DEA90A; padding:5px">Availability</th><th style="background-color:#DEA90A; padding:5px">Brewery</th><th style="background-color:#DEA90A; padding:5px">City</th><th style="background-color:#DEA90A; padding:5px">State</th><th style="background-color:#DEA90A; padding:5px">Brewery Type</th></tr></thead><tbody>';

            $.each(beer , function(index, item) { 
                table += '<tr><td style="background-color:#DEA90A; padding:5px">'+item["beer_name"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["beer_style"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["abv_category"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["ibu_category"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["availability"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["brewery_name"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["city"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["state"]+'</td>';
                table += '<td style="background-color:#DEA90A; padding:5px">'+item["types"]+'</td></tr>';
            });

            table += '</tbody>';

            $('#output').empty().html(table);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
}