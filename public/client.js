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

//User will search a national park they want information on
//$("#searchButton").submit(function (event) {
//    console.log('userSearch');
//    event.preventDefault();
//    var userSearch = $(".parks").val();
//    if (userSearch === "") {
//        alert("Please chose a park from the list and try again.");
//    } else {
//        getSearchResults(parkCode);
//    }
//});

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
            //will display object from external api to determind parts needed for html build .results will be changed based on output of object in console
            console.log(dataOutput);
            //displayParkResult(dataOutput.results);
            displayParkResult(dataOutput.results);
        })
        .fail(function (jqXHR, error, errorThrown) {
            //            console.log(jqXHR);
            //            console.log(error);
            //            console.log(errorThrown);
        });
}


// STEP 1 - get the input from the user
//$("#parkForm").submit(function (event) {
//    event.preventDefault();
//    var nationalParks = $(".parks").val();
//    //  console.log(nationalParks);
//    getParkResult(nationalParks);
//});


//App will display the park result in HTML form
//name, description, weatherInfo, states, directionsInfo, url
//change order to match from html
function displayParkResult(dataOutput) {
    var buildTheHtmlOutput = "";
    $.each(dataMatches, function (dataMatchesKey, dataOutputValue) {
        buildTheHtmlOutput += '<li>';
        buildTheHtmlOutput += '<section class="results">';
        var linkUrl = dataMatchesValue.url;
        if (linkUrl === undefined) {
            buildTheHtmlOutput += '<h2><a target="_blank" href="www.nps.gov"' + dataMatchesValue.name + '</a></h2>';
            console.log(data.url);
        } else {
            buildTheHtmlOutput += '<h2><a target="_blank" href="' + dataMatchesValue.url + '" >' + dataMatchesValue.name + '</a></h2>';
        }
        //
        //        var fullName = dataMatchesValue.data[0];
        //        if (fullName === undefined) {
        //            buildTheHtmlOutput += "";
        //        } else {
        //            buildTheHtmlOutput += '<p>' + dataMatchesValue.assetAttributes[0].attribute.attributeValue + '</p>';
        //        }
        //
        //        buildTheHtmlOutput += '<p>' + dataMatchesValue.place.cityName + ', ' + dataMatchesValue.place.stateProvinceCode + '</p>';
        //
        //        buildTheHtmlOutput += '<p>' + new Date(utcDate) + '</p>';
        //
        //        var showDescription = dataMatchesValue.assetDescriptions[0];
        //        if (showDescription === undefined) {
        //            buildTheHtmlOutput += "";
        //        } else {
        //            buildTheHtmlOutput += "<div class='auto-populated-description'>" + dataMatchesValue.assetDescriptions[0].description + "</div>";
        //        }
        //
        //        buildTheHtmlOutput += '</div>';
        //        buildTheHtmlOutput += '<form class="addToFavorites">';
        //        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesValue' value='" + dataMatchesValue.assetName + "'>";
        //        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesDateValue' value='" + new Date(utcDate) + "'>";
        //        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesPlaceValue' value='" + dataMatchesValue.place.cityName + ", " + dataMatchesValue.place.stateProvinceCode + "'>";
        //        buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesUrlValue' value='" + dataMatchesValue.registrationUrlAdr + "'>";
        //        buildTheHtmlOutput += '<button type="submit" class="addToFavoritesButton">';
        //        buildTheHtmlOutput += '<input type="image" src="img/hikingbutton-transparency.png" alt="Submit" class="addToFavs">';
        //        buildTheHtmlOutput += '</button>';
        //        buildTheHtmlOutput += '</form>';
        buildTheHtmlOutput += '</li>';
    });

    //use the HTML output to show it in the index.html
    $("#results ul").html(buildTheHtmlOutput);
}




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
