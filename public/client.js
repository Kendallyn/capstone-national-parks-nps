"use strict"

//User will search a national park they want information on
$("#searchButton").submit(function (event) {
    event.preventDefault();
    var userSearch = $(".parks").val();
    if (userSearch === "") {
        alert("Please chose a park from the list and try again.");
    } else {
        getSearchResults(userSearch);
    }
});

//Results of park information from the external API will be returned (fullName, description, weatherInfo, states, directionsInfo, url)
function getSearchResults(parkCode) {
    console.log(parkCode);
    $.ajax({
            type: "GET",
            //        host: "developer.nps.gov",
            //        path: "/api/v0/parks?parkCode=yell",
            url: "/park/" + parkCode,
            dataType: "json",
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            displayParkResults(dataOutput.results);
        })
        .fail(function (jqXHR, error, errorThrown) {
            //console.log(jqXHR);
            //console.log(error);
            //console.log(errorThrown);
        });
}

//App will display the park result in HTML form
function displayParkResults(dataPairs) {
    var buildTheHtmlOutput = "";
    $.each(dataPairs),
        function (dataKey, dataValue) {
            buildTheHtmlOutput += '<li>';
            buildTheHtmlOutput += '<section class="results">';
            //            var linkUrl = dataMatchesValue.registrationUrlAdr;
            //            if (linkUrl === undefined) {
            //                buildTheHtmlOutput += '<h2><a target="_blank" href="www.active.com"' + dataMatchesValue.assetName + '</a></h2>';
            //            } else {
            //                buildTheHtmlOutput += '<h2><a target="_blank" href="' + dataMatchesValue.registrationUrlAdr + '" >' + dataMatchesValue.assetName + '</a></h2>';
            //            }
            //
            //            var showDistance = dataMatchesValue.assetAttributes[0];
            //            if (showDistance === undefined) {
            //                buildTheHtmlOutput += "";
            //            } else {
            //                buildTheHtmlOutput += '<p>' + dataMatchesValue.assetAttributes[0].attribute.attributeValue + '</p>';
            //            }
            //
            //            buildTheHtmlOutput += '<p>' + dataMatchesValue.place.cityName + ', ' + dataMatchesValue.place.stateProvinceCode + '</p>';
            //
            //            buildTheHtmlOutput += '<p>' + new Date(utcDate) + '</p>';
            //
            //            var showDescription = dataMatchesValue.assetDescriptions[0];
            //            if (showDescription === undefined) {
            //                buildTheHtmlOutput += "";
            //            } else {
            //                buildTheHtmlOutput += "<div class='auto-populated-description'>" + dataMatchesValue.assetDescriptions[0].description + "</div>";
            //            }
            //
            //            buildTheHtmlOutput += '</div>';
            //            buildTheHtmlOutput += '<form class="addToFavorites">';
            //            buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesValue' value='" + dataMatchesValue.assetName + "'>";
            //            buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesDateValue' value='" + new Date(utcDate) + "'>";
            //            buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesPlaceValue' value='" + dataMatchesValue.place.cityName + ", " + dataMatchesValue.place.stateProvinceCode + "'>";
            //            buildTheHtmlOutput += "<input type='hidden' class='addToFavoritesUrlValue' value='" + dataMatchesValue.registrationUrlAdr + "'>";
            //            buildTheHtmlOutput += '<button type="submit" class="addToFavoritesButton">';
            //            buildTheHtmlOutput += '<input type="image" src="img/hikingbutton-transparency.png" alt="Submit" class="addToFavs">';
            //            buildTheHtmlOutput += '</button>';
            //            buildTheHtmlOutput += '</form>';
            //            buildTheHtmlOutput += '</li>';
            //        });

            //use the HTML output to show it in the index.html
            $("#results ul").html(buildTheHtmlOutput);
        }
}
}



//Populate 'National Park Bucket List' section
function populateBucketList() {

    $.ajax({
            type: "GET",
            url: "/bucket-list/",
            dataType: 'json',
        })
        .done(function (dataOutput) {
                console.log(dataOutput);
                //If successful, set some globals instead of using result object
                //        if (dataOutput.length != 0) {
                //            var buildTheHtmlOutput = '<div class="pinnedTitle"> <img src="img/hikingbutton-transparency.png"> <h3>Pinned Hiking Trails</h3>  </div>';
                //            $.each(dataOutput, function (dataOutputKey, dataOutputValue) {
                //                buildTheHtmlOutput += "<li class = 'pinned'>";
                //                buildTheHtmlOutput += "<div class = 'delete-favorites-container' > ";
                //                buildTheHtmlOutput += "<form class = 'deleteFavoriteValue' > ";
                //                buildTheHtmlOutput += "<input type='hidden' class='deleteFavoriteValueInput' value='" + dataOutputValue._id + "'>";
                //                buildTheHtmlOutput += "<button type = 'submit' class = 'deleteFavoriteButton'>";
                //                buildTheHtmlOutput += "<i class = 'fa fa-minus-circle' aria - hidden = 'true'></i>";
                //                buildTheHtmlOutput += "</button>";
                //                buildTheHtmlOutput += "</form>";
                //                buildTheHtmlOutput += "</div>";
                //                buildTheHtmlOutput += '<h4><a target="_blank" href="' + dataOutputValue.url + '" >' + dataOutputValue.name + '</a></h4>';
                //                var showCity = dataOutputValue.place;
                //                if (showCity === undefined) {
                //                    buildTheHtmlOutput += "";
                //                } else {
                //                    buildTheHtmlOutput += '<p>' + dataOutputValue.place + '</p>';
                //                }
                //                buildTheHtmlOutput += '<p>' + dataOutputValue.date + '</p>';
                //                buildTheHtmlOutput += "</li>";
                //            });
                //
                //            $(".savedHikes").html(buildTheHtmlOutput);
                //        }
                //    })
                //        .fail(function (jqXHR, error, errorThrown) {
                //        //console.log(jqXHR);
                //        //console.log(error);
                //        //console.log(errorThrown);
                //    });
                //}
                //        $(function () {
                //            populateBucketList();
                //
                //        });




                //User will be able to add a location to 'National Park Bucket List' section
                $(document).on('click', '#results .add', function (event) {
                    event.preventDefault();

                    //highlight the icon to show it has been added to favorites
                    $(this).toggleClass("highlight");
                    var favoritesValue = $(this).parent().find('.addToFavoritesValue').val();
                    var favoritesDateValue = $(this).parent().find('.addToFavoritesDateValue').val();
                    var favoritesPlaceValue = $(this).parent().find('.addToFavoritesPlaceValue').val();
                    var favoritesUrlValue = $(this).parent().find('.addToFavoritesUrlValue').val();

                    var nameObject = {
                        'name': favoritesValue,
                        'date': favoritesDateValue,
                        'place': favoritesPlaceValue,
                        'url': favoritesUrlValue
                    };

                    $.ajax({
                            method: 'POST',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(nameObject),
                            url: '/add-to-favorites/',
                        })
                        .done(function (result) {

                            populateFavoritesContainer();
                        })
                        .fail(function (jqXHR, error, errorThrown) {
                            //console.log(jqXHR);
                            //console.log(error);
                            //console.log(errorThrown);
                        });
                });






                //User will be able to 'check' item as a place visited




                //User will be able to remove item from list
                $(document).on('click', '.remove', function (event) {
                            event.preventDefault();
                            //get the value from the input box
                            var favoritesIdToDelete = $(this).parent().find('.deleteFavoriteValueInput').val();
                            var nameObject = {
                                'name': favoritesIdToDelete
                            };

                            $.ajax({
                                    method: 'DELETE',
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    url: '/delete-favorites/' + favoritesIdToDelete,
                                })
                                .done(function (result) {
                                    populateFavoritesContainer();
                                })
                                .fail(function (jqXHR, error, errorThrown) {
                                    //console.log(jqXHR);
                                    //console.log(error);
                                    //console.log(errorThrown);
                                });

                            //if last one, empty the div
                            $(".deleteFavoriteButton").click(function () {
                                $(".savedHikes").empty();
                            });
