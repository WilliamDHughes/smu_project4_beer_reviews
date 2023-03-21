$(document).ready(function() {

    buildTable(); 

}); 

function buildTable() {
    d3.csv("app/static/data/aggregated_review_scores.csv").then(function(beerData) {

        var filteredData = beerData
            
        buildTableString(filteredData);
    }); 
}

function buildTableString(beerData) {

    // JQUERY creates an HTML string
    var tbody = $("#table>tbody");
    //clear table
    tbody.empty();

    //destroy datatable
    $("table").DataTable().clear().destroy();

    var datarows = beerData.map(x => [x["beer_id"], x["beer_name"], x["beer_style"], x["look"],  x["smell"], x["taste"], x["feel"], x["overall"], x["estimated_ibu"], x["availability"], x["abv"], x["brewery_id"], x["brewery_name"], x["city"], x["state"], x["country"], x["types"]])

    //redraw
    $("#table").DataTable({

        data: datarows,
        "defaultContent": "", 

        "pageLength": 10, 
        dom: 'Bfrtip', //lbfrtip if you want the length changing thing
        searching: false, 
        paging: false, 
        info: false,
        width: '100%',
        responsive: true,
        buttons: [
            { extend: 'copyHtml5' },
            { extend: 'excelHtml5' },
            { extend: 'csvHtml5' },
            {
                extend: 'pdfHtml5',
                title: function() { return "BeerAdvocate Beer Data"; },
                orientation: 'portrait',
                pageSize: 'LETTER',
                text: 'PDF',
                titleAttr: 'PDF'
            }
        ]
    });
}; 