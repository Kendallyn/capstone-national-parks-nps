"use strict"
var nationalParks = [{
        "parkName": "Acadia National Park",
        "parkCode": "acad"
    },
    {
        "parkName": "Arches National Park",
        "parkCode": "arch"
    }, {
        "parkName": "Badlands National Park",
        "parkCode": "badl"
    }, {
        "parkName": "Bryce Canyon National Park",
        "parkCode": "brca"
    }, {
        "parkName": "Canyonlands National Park",
        "parkCode": "cany"
    }, {
        "parkName": "Capitol Reef National Park",
        "parkCode": "care"
    }, {
        "parkName": "Carlsbad Caverns National Park",
        "parkCode": "cave"
    }, {
        "parkName": "Channel Islands National Park",
        "parkCode": "chis"
    }, {
        "parkName": "Crater Lake National Park",
        "parkCode": "crla"
    }, {
        "parkName": "Death Valley National Park",
        "parkCode": "deva"
    }, {
        "parkName": "Denali National Park",
        "parkCode": "dena"
    }, {
        "parkName": "Gates of the Arctic National Park",
        "parkCode": "gaar"
    }, {
        "parkName": "Glacier National Park",
        "parkCode": "glac"
    }, {
        "parkName": "Glacier Bay National Park",
        "parkCode": "glba"
    }, {
        "parkName": "Grand Canyon National Park",
        "parkCode": "grca"
    }, {
        "parkName": "Grand Teton National Park",
        "parkCode": "grte"
    }, {
        "parkName": "Great Sand Dunes National Park",
        "parkCode": "grsa"
    }, {
        "parkName": "Great Smoky Mountains National Park",
        "parkCode": "grsm"
    }, {
        "parkName": "Hawaii Volcanoes National Park",
        "parkCode": "havo"
    }, {
        "parkName": "Joshua Tree National Park",
        "parkCode": "jotr"
    }, {
        "parkName": "Katmai National Park and Preserve",
        "parkCode": "katm"
    }, {
        "parkName": "Kenai Fjords National Park",
        "parkCode": "kefj"
    }, {
        "parkName": "Lassen Volcanic National Park",
        "parkCode": "lavo"
    }, {
        "parkName": "Mesa Verde National Park",
        "parkCode": "meve"
    }, {
        "parkName": "Mount Rainier National Park",
        "parkCode": "mora"
    }, {
        "parkName": "North Cascades National Park",
        "parkCode": "noca"
    }, {
        "parkName": "Olympic National Park",
        "parkCode": "olym"
    }, {
        "parkName": "Rocky Mountain National Park",
        "parkCode": "romo"
    }, {
        "parkName": "Saguaro National Park",
        "parkCode": "sagu"
    }, {
        "parkName": "Sequoia National Park",
        "parkCode": "seki"
    }, {
        "parkName": "Yellowstone National Park",
        "parkCode": "yell"
    }, {
        "parkName": "Yosemite National Park",
        "parkCode": "yose"
    }, {
        "parkName": "Zion National Park",
        "parkCode": "zion"
    }]


//STEP 1 Populate the Parks options
function populateParks() {
    $(".parks").html('');
    var buildTheParksOutput = "";
    buildTheParksOutput += '<option value="0" selected> Choose your park</option>';
    $.each(nationalParks, function (parkName, parkCode) {
        buildTheParksOutput += '<option value="' + parkName + '">' + parkCode + '</option>';
    });

    //use the HTML output to show it in the index.html
    $("#parkForm").html(buildTheParksOutput);
}

// STEP 2 - get the input from the user
$("#parkForm").submit(function (event) {
    event.preventDefault();
    var nationalParks = $(".parks").val();
    //  console.log(nationalParks);
    getParkResult(nationalParks);
});

//STEP 3
//Results of park information from the external API will be returned(fullName, description, weatherInfo, states, directionsInfo, url)
function getParkResult(parkCode) {
    //    console.log(parkCode);
    $.ajax({
            type: "GET",
            url: '/park/' + parkCode,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            //displays the external api json object in the console
            //console.log(dataOutput);
            //.data will be changed based on output of object in console from previous line
            displayParkResult(dataOutput.data);
            //console.log(dataOutput.data["0"].description);
        })
        .fail(function (jqXHR, error, errorThrown) {
            //console.log(jqXHR);
            //console.log(error);
            //console.log(errorThrown);
        });
}

//App will take information from json object returned to display the park result information from external api in HTML form
//name, description, weatherInfo, states, directionsInfo, url
function displayParkResult(dataFromApi) {
    var buildTheHtmlOutput = "";
    $.each(dataFromApi, function (index) {
        console.log(dataFromApi[index]);
        buildTheHtmlOutput += '<li>';
        buildTheHtmlOutput += '<section class="results">';
        var fullName = dataFromApi[index].fullName;
        buildTheHtmlOutput += '<h2>' + dataFromApi[index].fullName + '<span><img src="img/plus.png" class="add"></span></h2>';
        var description = dataFromApi[index].description;
        buildTheHtmlOutput += '<h4>Description: </h4><p>' + dataFromApi[index].description + '</p>';
        var weatherInfo = dataFromApi[index].weatherInfo;
        if (weatherInfo === undefined) {
            buildTheHtmlOutput += "";
        } else {
            buildTheHtmlOutput += '<h4>Weather Information: </h4><p>' + dataFromApi[index].weatherInfo + '</p>';
        }
        var states = dataFromApi[index].states;
        buildTheHtmlOutput += '<h4>State(s) Park is located in: <span>' + dataFromApi[index].states + '</span></h4>';
        var directionsInfo = dataFromApi[index].directionsInfo;
        buildTheHtmlOutput += '<h4>Directions: </h4><p>' + dataFromApi[index].directionsInfo + "</p>";
        var url = dataFromApi[index].url;
        buildTheHtmlOutput += '<h4>Park Website: <a target="_blank" href="' + dataFromApi[index].url + '" >' + dataFromApi[index].fullName + '</a></h4>';
        /////////////////////////////////////////////////////////
        buildTheHtmlOutput += '<form class="addToBucketList">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListFullName" value="' + dataFromApi[index].fullName + '">';
        //console.log('name');
        buildTheHtmlOutput += '<input type="image" src="img/plus.png" alt="Submit" class="addToList">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListDescription" value="' + dataFromApi[index].description + '">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListWeatherInfo" value="' + dataFromApi[index].weatherInfo + '">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListState" value="' + dataFromApi[index].states + '">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListDirectionsInfo"' + dataFromApi[index].directionsInfo + '">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListParkUrl"' + dataFromApi[index].url + '">';
        //////////////////////////////////////////////////////////////////////////////
        buildTheHtmlOutput += '</section>';
        buildTheHtmlOutput += '</li>';

        //use the HTML output to show it in the index.html
        $(".results ul").html(buildTheHtmlOutput);
        //        console.log('show results');
    })
};



////Populate 'National Park Bucket List' section
//function populateBucketList() {
//
//    $.ajax({
//            type: "GET",
//            url: "/bucket-list/",
//            dataType: 'json',
//        })
//        .done(function (dataOutput) {
//            console.log(dataOutput);
//            If successful, set some globals instead of using result object
//            if (dataOutput.length != 0) {
//                var buildTheHtmlOutput = '<div class="pinnedTitle"> <img src="img/hikingbutton-transparency.png"> <h3>Pinned Hiking Trails</h3>  </div>';
//                $.each(dataOutput, function (dataOutputKey, dataOutputValue) {
//                    buildTheHtmlOutput += "<li class = 'pinned'>";
//                    buildTheHtmlOutput += "<div class = 'delete-favorites-container' > ";
//                    buildTheHtmlOutput += "<form class = 'deleteFavoriteValue' > ";
//                    buildTheHtmlOutput += "<input type='hidden' class='deleteFavoriteValueInput' value='" + dataOutputValue._id + "'>";
//                    buildTheHtmlOutput += "<button type = 'submit' class = 'deleteFavoriteButton'>";
//                    buildTheHtmlOutput += "<i class = 'fa fa-minus-circle' aria - hidden = 'true'></i>";
//                    buildTheHtmlOutput += "</button>";
//                    buildTheHtmlOutput += "</form>";
//                    buildTheHtmlOutput += "</div>";
//                    buildTheHtmlOutput += '<h4><a target="_blank" href="' + dataOutputValue.url + '" >' + dataOutputValue.name + '</a></h4>';
//                    var showCity = dataOutputValue.place;
//                    if (showCity === undefined) {
//                        buildTheHtmlOutput += "";
//                    } else {
//                        buildTheHtmlOutput += '<p>' + dataOutputValue.place + '</p>';
//                    }
//                    buildTheHtmlOutput += '<p>' + dataOutputValue.date + '</p>';
//                    buildTheHtmlOutput += "</li>";
//                });
//
//                $(".savedHikes").html(buildTheHtmlOutput);
//            }
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            //console.log(jqXHR);
//            //console.log(error);
//            //console.log(errorThrown);
//        });
//}
//$(function () {
//    populateBucketList();
//
//});
//
//
//
//
////User will be able to add a location to 'National Park Bucket List' section
//$(document).on('click', '#results .add', function (event) {
//    event.preventDefault();
//
//    //highlight the icon to show it has been added to favorites
//    $(this).toggleClass("highlight");
//    var favoritesValue = $(this).parent().find('.addToFavoritesValue').val();
//    var favoritesDateValue = $(this).parent().find('.addToFavoritesDateValue').val();
//    var favoritesPlaceValue = $(this).parent().find('.addToFavoritesPlaceValue').val();
//    var favoritesUrlValue = $(this).parent().find('.addToFavoritesUrlValue').val();
//
//    var nameObject = {
//        'name': favoritesValue,
//        'date': favoritesDateValue,
//        'place': favoritesPlaceValue,
//        'url': favoritesUrlValue
//    };
//
//    $.ajax({
//            method: 'POST',
//            dataType: 'json',
//            contentType: 'application/json',
//            data: JSON.stringify(nameObject),
//            url: '/add-to-favorites/',
//        })
//        .done(function (result) {
//
//            populateFavoritesContainer();
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            //console.log(jqXHR);
//            //console.log(error);
//            //console.log(errorThrown);
//        });
//});
//
//
//
//
//
//
////User will be able to 'check' item as a place visited
//
//
//
//
////User will be able to remove item from list
//$(document).on('click', '.remove', function (event) {
//            event.preventDefault();
//            //get the value from the input box
//            var favoritesIdToDelete = $(this).parent().find('.deleteFavoriteValueInput').val();
//            var nameObject = {
//                'name': favoritesIdToDelete
//            };
//
//            $.ajax({
//                    method: 'DELETE',
//                    dataType: 'json',
//                    contentType: 'application/json',
//                    url: '/delete-favorites/' + favoritesIdToDelete,
//                })
//                .done(function (result) {
//                    populateFavoritesContainer();
//                })
//                .fail(function (jqXHR, error, errorThrown) {
//                    //console.log(jqXHR);
//                    //console.log(error);
//                    //console.log(errorThrown);
//                });
//
//            //if last one, empty the div
//            $(".deleteFavoriteButton").click(function () {
//                $(".bucketList").empty();
//            });
