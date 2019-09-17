let firebaseURL = 'https://darlenelabs-3360d.firebaseio.com/bakery-lab';
let moneyToFetch = firebaseURL + '/profit.json';


// initializing money 
fetch(moneyToFetch)
    .then(function(response){return response.json();})
    .then(function(json) {
    moneyTitle = document.getElementById("money-title");
    moneyTitle.innerText = "Money made: $" + json;
});

// initializing kitchen
let kitchensURL = firebaseURL + "/kitchen.json";
fetch(kitchensURL)
    .then(function(response){return response.json();})
    .then(function(json) {
    kitchenOneData = json["kitchen-1"];
    kitchenTwoData = json["kitchen-2"];
    kitchenThreeData = json["kitchen-3"];
    console.log(kitchenTwoData);
    var firstTile = document.getElementById("first-tile");
    var secondTile = document.getElementById("second-tile");   
    var thirdTile = document.getElementById("third-tile");  
    firstTile.setAttribute("data-filled", kitchenOneData.filled);
    if (kitchenOneData.filled === "True"){
        kitchenOneFood = kitchenOneData.food;
        var firstTitle = document.getElementById("first-title");
        firstTitle.innerText = kitchenOneFood.name;
        var firstSub = firstTile.querySelector('.subtitle');
        firstSub.innerText = "Time: " + kitchenOneFood.time + " secs";     

    }

    secondTile.setAttribute("data-filled", kitchenTwoData.filled);
    if (kitchenTwoData.filled === "True"){
        console.log('hello');
        kitchenTwoFood = kitchenTwoData.food;
        console.log(kitchenTwoFood);
        var secondTitle = document.getElementById("second-title");
        secondTitle.innerText = kitchenTwoFood.name;
        var secondSub = secondTile.querySelector('.subtitle');
        console.log(secondSub);
        secondSub.innerText = "Time: " + kitchenTwoFood.time + " secs";      

    }

    thirdTile.setAttribute("data-filled", kitchenThreeData.filled);
    if (kitchenThreeData.filled === "True"){
        kitchenThreeFood = kitchenThreeData.food;
        var thirdTitle = document.getElementById("third-title");
        thirdTitle.innerText = kitchenThreeFood.name;
        var thirdSub = thirdTile.querySelector('.subtitle');
        thirdSub.innerText = "Time: " + kitchenThreeFood.time + " secs";      

    }

});



function updateKitchen(kitchenIndex, foodName, numSecs) {
    kitchenURL = firebaseURL + "/kitchen/" + kitchenIndex + ".json";
    jsonToUpdate = {"filled": "True", "food":{"name": foodName, "time": numSecs}};
    fetch(kitchenURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonToUpdate)
    }).then(function(response){
        return response.text();
    })    

}

function finishCook(foodTextIndex) {
    tileID = foodTextIndex + "-tile";
    titleID = foodTextIndex + "-title";
    var tile = document.getElementById(tileID);
    var title = document.getElementById(titleID);
    let profit;
    let balance;
    if (tile.getAttribute("data-filled") === "True") {
        foodTitle = title.innerText;
        urlToFetch = firebaseURL + '/foods/' + foodTitle + '.json';
        // GET request to Firebase
        fetch(urlToFetch)
            .then(function(response){return response.json();})
            .then(function(json) {
            profit = json.money;  
            fetch(moneyToFetch)
                .then(function(response){return response.json();})
                .then(function(json) {
                balance = json; 
                balance += profit;
                fetch(moneyToFetch, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(balance)
                }).then(function (response) { // At this point, Flask has printed our JSON
                    return response.text();
                }).then(function (text) {
                    console.log("works");
                    moneyTitle = document.getElementById("money-title");
                    moneyTitle.innerText = "Money made: $" + balance;
                });
            })
        })

        // finished cooking? close the tile 
        closeTile(tileID);

    }    
}

function deleteFirebase(kitchenIndex){
    kitchenURL = firebaseURL + '/kitchen/kitchen-' + kitchenIndex + '.json';
    fetch (kitchenURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"filled":"False","food":{"name":"null","time":0}})
    }).then(function(response){
        return response.text();
    })
}