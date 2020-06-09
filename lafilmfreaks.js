// Global scope variables we need to take care of
log_in_status = "Logged_out"
user_name = "john doe"

// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

//Firebase

//End of Firebase

//Support Functions

// A function that sorts a list from low to high and returns sorted index
function checkIn(index, sortedList) {
    var count = sortedList.length;
    for (var i = 0; i < count; i++) {
        if (sortedList[i] == index) { return true; }
    }
    return false;
}

function sortList(unsortedList) {
    var totalCount = unsortedList.length;
    var sortedList = new Array(totalCount);
    for (var i = 0; i < totalCount; i++) {
        var smallestIndex = 0;

        while (checkIn(smallestIndex, sortedList) == true) { smallestIndex++; }

        for (var j = 0; i < totalCount; j++) {
            if (checkIn(j, sortedList) == false) {
                if (unsortedList[smallestIndex] > unsortedList[j]) { smallestIndex = j; }
            }
        }
        sortedList[i] = smallestIndex;
    }
    return sortedList;
}
//Get Time function
function diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}


//End of Support Functions

$(document).ready(function() {
    // We do most of the necassary javascript here.
    // Your web app's Firebase configuration
    //////////////////////////////////////////////////////////
    ///////////// Initialize the firebase database ///////////
    var firebaseConfig = {
        apiKey: "AIzaSyDjJu5i81w26naQgnazTU4jLba9oNBY2Ic",
        authDomain: "hci-pr3-9e2b2.firebaseapp.com",
        databaseURL: "https://hci-pr3-9e2b2.firebaseio.com",
        projectId: "hci-pr3-9e2b2",
        storageBucket: "hci-pr3-9e2b2.appspot.com",
        messagingSenderId: "1079814003486",
        appId: "1:1079814003486:web:b97b6729ea5f5e83b8c70f",
        measurementId: "G-KBHVMNE94B"
    };
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    /////////////////////////////////////////////////////////


    var sortBtn = document.getElementById("dropbtn0");
    var table = document.getElementById("movies_display");
    var mySelect = document.getElementById('mySelect');

    // //draw divs containing movie information inside a row== May not be correct, doublecheck
    // function drawDiv(review_object) {
    //     var divElement = document.createElement("Div");

    //     var divTitle = document.createElement("Div");
    //     divTitle.innerHTML = review_object.Title;
    //     divTitle.style.height = 50 % ;
    //     divTitle.style.width = 25 % ;
    //     divTitle.style.position = "relative";
    //     divTitle.style.left = 0 + 'px';
    //     divTitle.style.top = 0 + 'px';
    //     divElement.appendChild(divTitle);

    //     var divName = document.createElement("Div");
    //     divName.innerHTML = review_object.Author;
    //     divName.style.height = 50 % ;
    //     divName.style.width = 25 % ;
    //     divName.style.position = "relative";
    //     divName.style.left = "0px";
    //     divName.style.top = divTitle.style.height;
    //     divElement.appendChild(divName);

    //     var divComment = document.createElement("Div");
    //     divComment.innerHTML = review_object.Comments + "comments";
    //     divComment.style.height = 50 % ;
    //     divComment.style.width = 9 % ;
    //     divComment.style.position = "relative";
    //     divComment.style.right = "0px";
    //     divComment.style.top = "0px";
    //     divElement.appendChild(divComment);

    //     var divDownvote = document.createElement("Div");
    //     divDownvote.innerHTML = "&#8681;" + review_object.Downvotes;
    //     divDownvote.style.height = 50 % ;
    //     divDownvote.style.width = 8 % ;
    //     divDownvote.style.position = "relative";
    //     divDownvote.style.right = divComment.style.width;
    //     divDownvote.style.top = "0px";
    //     divElement.appendChild(divDownvote);

    //     var divUpvote = document.createElement("Div");
    //     divUpvote.innerHTML = "&#8679;" + review_object.Upvotes;
    //     divUpvote.style.height = 50 % ;
    //     divUpvote.style.width = 8 % ;
    //     divUpvote.style.position = "relative";
    //     divUpvote.style.right = divDownvote.style.width + divComment.style.width;
    //     divUpvote.style.top = "0px";
    //     divElement.appendChild(divUpvote);

    //     var divSpoil = document.createElement("Div");
    //     divSpoil.innerHTML //update Spoil-o-meter
    //     divSpoil.style.height = 50 % ;
    //     divSpoil.style.width = 25 % ;
    //     divSpoil.style.position = "relative";
    //     divSpoil.style.right = "0px";
    //     divSpoil.style.top = divUpvote.style.height;
    //     divElement.appendChild(divSpoil);

    //     return divElement;
    // }

    // //Data Structure: Reviews: Author/ Title/ Date/ Comments/Upvotes/Downvotes/Articles/Spoil 

    // function printTable(sortValue) { //sortValue: Hottest, Newest, Oldest, Spoil-o-Low, Spoil-o-High
    //     return firebase.database().ref( /*Firebase reference*/ ).once('value', function(snapshot) {
    //         var numRows = myTable.rows.length;

    //         for (var i = 0; i < numRows; i++) {
    //             myTable.deleteRow(0);
    //         }
    //         var myValue = snapshot.val(); //myValue[myKey] = Review Objects
    //         var keyList = Object.keys(myValue); //keyList[i]

    //         if (sortValue == "Newest") {
    //             var current = new Date();
    //             var currentTime = current.getTime();

    //             var count = keyList.length;
    //             var unsortedTime = new Array(count);

    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[i];
    //                 var reviewTime = new Date(myValue[myKey].Date); //Change Date to something else if you use different names
    //                 unsortedTime[i] = diff_hours(currentTime, reviewTime);
    //             }
    //             var sortedList = sortList(unsortedTime);
    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[sortedList[i]]; //the sortedList[i] contains the ith smallest element

    //                 var newRow = table.insertRow(i);
    //                 var Cell = newRow.insertCell(0);

    //                 Cell.appendChild(drawDiv(myValue[myKey]));
    //             }
    //         } else if (sortValue == "Hottest") {
    //             var count = keyList.length;
    //             var unsortedHot = new Array(count);

    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[i];
    //                 unsortedHot[i] = myValue[myKey].Comments + myValue[myKey].Upvotes + myValue[myKey].Downvotes // Change the attributes if necessary, you use different names in Firebase
    //             }
    //             var sortedHot = sortList(unsortedHot);
    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[sortedHot[count - 1 - i]]; //the sortedHot[count - 1- i] contains the ith greatest element

    //                 var newRow = table.insertRow(i);
    //                 var Cell = newRow.insertCell(0);

    //                 Cell.appendChild(drawDiv(myValue[myKey]));
    //             }
    //         } else if (sortValue == "Oldest") {
    //             var current = new Date();
    //             var currentTime = current.getTime();

    //             var count = keyList.length;
    //             var unsortedTime = new Array(count);

    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[i];
    //                 var reviewTime = new Date(myValue[myKey].Date); //Change Date to something else if you use different names
    //                 unsortedTime[i] = diff_hours(currentTime, reviewTime);
    //             }
    //             var sortedList = sortList(unsortedTime);
    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[sortedList[count - i - 1]]; //the sortedList[count -i -1] contains the ith greatest element

    //                 var newRow = table.insertRow(i);
    //                 var Cell = newRow.insertCell(0);

    //                 Cell.appendChild(drawDiv(myValue[myKey]));
    //             }
    //         } else if (sortValue == "Spoil-o-Low") {
    //             var count = keyList.length;
    //             var unsortedSpoil = new Array(count);

    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[i];
    //                 unsortedSpoil[i] = myValue[myKey].Spoil // Change the attributes if necessary, you use different names in Firebase
    //             }
    //             var sortedSpoil = sortList(unsortedSpoil);
    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[sortedSpoil[i]]; //the sortedSpoil[i] contains the ith lowest element

    //                 var newRow = table.insertRow(i);
    //                 var Cell = newRow.insertCell(0);

    //                 Cell.appendChild(drawDiv(myValue[myKey]));
    //             }
    //         } else if (sortValue == "Spoil-o-High") {
    //             var count = keyList.length;
    //             var unsortedSpoil = new Array(count);

    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[i];
    //                 unsortedSpoil[i] = myValue[myKey].Spoil // Change the attributes if necessary, you use different names in Firebase
    //             }
    //             var sortedSpoil = sortList(unsortedSpoil);
    //             for (var i = 0; i < count; i++) {
    //                 var myKey = keyList[sortedSpoil[i]]; //the sortedSpoil[count -  1- i] contains the ith greatest element

    //                 var newRow = table.insertRow(i);
    //                 var Cell = newRow.insertCell(0);

    //                 Cell.appendChild(drawDiv(myValue[myKey]));
    //             }
    //         }

    //     })
    // }

    // function bindEvents() {
    //     mySelect.onchange = function() {
    //         var x = document.getElementById("mySelect").value;
    //         printTable(x);
    //     }
    // }

    // printTable("Hottest");
    // bindEvents();

    $('#sign_me_up').click(function() {
        location.replace('index.html')
    });    

});