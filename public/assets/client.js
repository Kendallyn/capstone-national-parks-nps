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
            displayParkResult(dataOutput.data, parkCode);
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
function displayParkResult(dataFromApi, parkCode) {
    //    var buildTheHtmlOutput = '<ul class="results">';
    var buildTheHtmlOutput = "";
    $.each(dataFromApi, function (index) {
        console.log(dataFromApi[index]);
        //        buildTheHtmlOutput += '<ul>';
        buildTheHtmlOutput += '<li>';
        //        buildTheHtmlOutput += '<section class="results">';
        buildTheHtmlOutput += '<h2>' + dataFromApi[index].fullName + '</h2>';

        //        starting the add to form
        buildTheHtmlOutput += '<form class="addToBucketList">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListFullName" value="' + dataFromApi[index].fullName + '">';
        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListParkCode" value="' + parkCode + '">';
        //        buildTheHtmlOutput += '<button type="submit" class="addToBucketListButton">';
        //        buildTheHtmlOutput += '<input type="image" src="../assets/img/plus.png" class="add" alt="submit">';
        //        buildTheHtmlOutput += '</button>';

        buildTheHtmlOutput += '<button type="submit" class="addToBucketListButton" value="">';
        buildTheHtmlOutput += '<img src="../assets/img/plus.png" class="addToBucketListButton" alt="submit">';
        buildTheHtmlOutput += '</button>';

        buildTheHtmlOutput += '<input type="hidden" class="addToBucketListParkImage" value="img/parkImages/' + parkCode + '.jpg">';
        buildTheHtmlOutput += '</form>';
        //        end of the add to form

        //        start park image
        buildTheHtmlOutput += '<div id="parkImageFile">';
        buildTheHtmlOutput += '<img src="../assets/img/parkImages/' + parkCode + '.jpg" alt="' + parkCode + ' National Park" class="parkImage">';
        buildTheHtmlOutput += '</div>';
        //        end park image


        buildTheHtmlOutput += '<h4>Description: </h4><p>' + dataFromApi[index].description + '</p>';
        if (dataFromApi[index].weatherInfo.search('http') >= 0) {
            buildTheHtmlOutput += '<h4>Weather Information: <a target="_blank" href="' + dataFromApi[index].weatherInfo + '" >Click for weather info</a></h4>';
        } else {
            buildTheHtmlOutput += '<h4>Weather Information: </h4><p>' + dataFromApi[index].weatherInfo + '</p>';
        }
        buildTheHtmlOutput += '<h4>State(s) Park is located in: <span>' + dataFromApi[index].states + '</span></h4>';
        buildTheHtmlOutput += '<h4>Directions: </h4><p>' + dataFromApi[index].directionsInfo + "</p>";
        buildTheHtmlOutput += '<h4>Park Website: <a target="_blank" href="' + dataFromApi[index].url + '" >' + dataFromApi[index].fullName + '</a></h4>';
        buildTheHtmlOutput += '</section>';
        buildTheHtmlOutput += '</li>';
        //        buildTheHtmlOutput += '</ul>';

        //use the HTML output to show it in the index.html
        $(".results ul").html(buildTheHtmlOutput);
        //        console.log('show results');
    })
};

////Populate 'National Park Bucket List' section
function populateBucketListContainer() {
    $(".bucketList").html("");
    $.ajax({
            type: 'GET',
            url: '/populate-bucket-list/',
            dataType: 'json',
        })
        .done(function (dataFromApi) {
            //If successful, set some globals instead of using result object

            var buildTheHtmlOutput = "";

            buildTheHtmlOutput += '<ul>';
            $.each(dataFromApi, function (dataOutputKey, dataOutputValue) {
                if (dataOutputValue.status == "unchecked") {
                    buildTheHtmlOutput += '<li>';
                    buildTheHtmlOutput += '<h2>' + dataOutputValue.name + '</h2>';
                    buildTheHtmlOutput += '<form class="deleteBucketListForm">';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteBucketListItem" value="' + dataOutputValue._id + '" >';
                    //Working code in chrome next 3 lines//
                    //                    buildTheHtmlOutput += '<button type="submit" class="deleteItemButton" value="something">';
                    //                    buildTheHtmlOutput += '<img src="../assets/img/remove.png" class="removeExplanation">';
                    //                    buildTheHtmlOutput += '</button>';

                    //Testing code
                    buildTheHtmlOutput += '<button type="submit" class="deleteItemButton" value="">';
                    buildTheHtmlOutput += '<img src="../assets/img/remove.png" class="deleteItemButton">';
                    buildTheHtmlOutput += '</button>';




                    buildTheHtmlOutput += '</form>';
                    //                    buildTheHtmlOutput += '<h2>' + dataOutputValue.name + '</h2>';
                    //        start park image
                    buildTheHtmlOutput += '<div id="parkImageFile">';
                    if (dataOutputValue.status == "unchecked") {
                        buildTheHtmlOutput += '<img src="../assets/img/parkImages/' + dataOutputValue.image + '.jpg" alt="' + dataOutputValue.image + ' National Park" class="parkImage">';
                    } else {
                        buildTheHtmlOutput += '<img src="../assets/img/parkImages/been-there.jpg" alt="Visited Park" class="parkImage">';
                    }
                    buildTheHtmlOutput += '</div>';
                    //        end park image
                    //start check box button
                    buildTheHtmlOutput += '<form class="updateBucketListForm">';
                    buildTheHtmlOutput += '<input type="hidden" class="updateBucketListItem" value="' + dataOutputValue._id + '">';
                    buildTheHtmlOutput += '<input type="hidden" class="updateBucketListItemStatus" value="' + dataOutputValue.status + '">';
                    buildTheHtmlOutput += '<button type="submit" class="checkbox">';
                    if (dataOutputValue.status == "unchecked") {
                        buildTheHtmlOutput += '<div class="checkbox"></div>';
                    } else {
                        buildTheHtmlOutput += '<div class="checkbox checkbox-checked"></div>';
                    }
                    buildTheHtmlOutput += '</button>';
                    buildTheHtmlOutput += '</form>';
                    buildTheHtmlOutput += '</li>';
                }
            });
            buildTheHtmlOutput += '</ul>';
            $(".bucketList").html(buildTheHtmlOutput);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

////Populate 'National Park Bucket List' section
function populateBeenThereContainer() {
    $(".bucketList").html("");
    $.ajax({
            type: 'GET',
            url: '/populate-bucket-list/',
            dataType: 'json',
        })
        .done(function (dataFromApi) {
            //If successful, set some globals instead of using result object
            var buildTheHtmlOutput = "";
            buildTheHtmlOutput += '<ul>';
            $.each(dataFromApi, function (dataOutputKey, dataOutputValue) {
                if (dataOutputValue.status == "checked") {
                    buildTheHtmlOutput += '<li>';
                    buildTheHtmlOutput += '<h2>' + dataOutputValue.name + '</h2>';
                    buildTheHtmlOutput += '<form class="deleteBucketListForm">';
                    buildTheHtmlOutput += '<input type="hidden" class="deleteBucketListItem" value="' + dataOutputValue._id + '">';
                    //Working code in chrome next 4 lines
                    //                    buildTheHtmlOutput += '<button type="submit" class="deleteItemButton">';
                    //                    buildTheHtmlOutput += '<img src="../assets/img/remove.png" class="removeExplanation">';
                    //                    buildTheHtmlOutput += '<input type="image" src="../assets/img/remove.png" class="removeExplanation" alt="submit">';
                    //                    buildTheHtmlOutput += '</button>';

                    //Testing code
                    buildTheHtmlOutput += '<button type="submit" class="deleteItemButton">';
                    //                    buildTheHtmlOutput += '<img src="../assets/img/remove.png" class="deleteItemButton">';
                    buildTheHtmlOutput += '<input type="image" src="../assets/img/remove.png" class="deleteItemButton" alt="submit">';
                    buildTheHtmlOutput += '</button>';


                    buildTheHtmlOutput += '</form>';
                    //                    buildTheHtmlOutput += '<h2>' + dataOutputValue.name + '</h2>';
                    //        start park image
                    buildTheHtmlOutput += '<div id="parkImageFile">';
                    if (dataOutputValue.status == "unchecked") {
                        buildTheHtmlOutput += '<img src="../assets/img/parkImages/' + dataOutputValue.image + '.jpg" alt="' + dataOutputValue.image + ' National Park" class="parkImage">';
                    } else {
                        buildTheHtmlOutput += '<img src="../assets/img/parkImages/been-there.jpg" alt="Visited Park" class="parkImage">';
                    }
                    buildTheHtmlOutput += '</div>';
                    //        end park image
                    //start check box button
                    buildTheHtmlOutput += '<form class="updateBucketListForm">';
                    buildTheHtmlOutput += '<input type="hidden" class="updateBucketListItem" value="' + dataOutputValue._id + '">';
                    buildTheHtmlOutput += '<input type="hidden" class="updateBucketListItemStatus" value="' + dataOutputValue.status + '">';
                    buildTheHtmlOutput += '<button type="submit" class="checkbox">';
                    if (dataOutputValue.status == "unchecked") {
                        buildTheHtmlOutput += '<div class="checkbox"></div>';
                    } else {
                        buildTheHtmlOutput += '<div class="checkbox checkbox-checked"></div>';
                    }
                    buildTheHtmlOutput += '</button>';
                    buildTheHtmlOutput += '</form>';
                    buildTheHtmlOutput += '</li>';
                }
            });
            buildTheHtmlOutput += '</ul>';
            $(".beenThere").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
$(function () {
    populateBucketListContainer();
    populateBeenThereContainer();
});


////User will be able to add a location to 'National Park Bucket List' section
$(document).on('submit', '.addToBucketList', function (event) {
    event.preventDefault();
    var bucketListName = $(this).parent().find('.addToBucketListFullName').val();
    var parkCode = $(this).parent().find('.addToBucketListParkCode').val();

    var parkObject = {
        'name': bucketListName,
        'image': parkCode,
        'status': 'unchecked',
    };
    console.log(parkObject);

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(parkObject),
            url: '/add-to-bucket-list/',
        })
        .done(function (result) {
            populateBucketListContainer();
            populateBeenThereContainer();
            sweetAlert('Success!', 'Go explore!', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            sweetAlert('Oops...', 'Please try again', 'error');
        });
});

////User will be able to 'check' item as a place visited
$(document).on('submit', '.updateBucketListForm', function (event) {
    event.preventDefault();
    //    $(".checkbox").toggleClass("checkbox-checked");
    var parkIdToUpdate = $(this).parent().find('.updateBucketListItem').val();
    var parkStatus = $(this).parent().find('.updateBucketListItemStatus').val();
    var parkObject = {
        'id': parkIdToUpdate,
        'status': parkStatus
    };
    $.ajax({
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: '/update-bucket-list/' + parkIdToUpdate + '/' + parkStatus,
        })
        .done(function (result) {
            populateBucketListContainer();
            populateBeenThereContainer();
            sweetAlert('Success!', 'Where to next?', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            sweetAlert('Oops...', 'Please try again', 'error');
        });
});

////User will be able to remove item from list
$(document).on('submit', '.deleteBucketListForm', function (event) {
    //    alert('here');
    event.preventDefault();
    var parkIdToDelete = $(this).parent().find('.deleteBucketListItem').val();
    var parkObject = {
        'id': parkIdToDelete
    };
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-from-bucket-list/' + parkIdToDelete,
        })
        .done(function (result) {
            populateBucketListContainer();
            populateBeenThereContainer();
            sweetAlert('Removed!', 'Maybe next time...', 'success');
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            sweetAlert('Oops...', 'Please try again', 'error');
        });
});
