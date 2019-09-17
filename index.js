function findEmpty(name, numSecs) {
    var tiles = document.querySelectorAll( 'div.tile:not(.is-ancestor)' );
    console.log(tiles);

    for (var i = 0; i < tiles.length; i++) {
        console.log(i);
        var tile = tiles[i];
        if (tile.getAttribute("data-filled") === "False"){
            var title = tile.querySelector('.title');
            var subtitle = tile.querySelector('.subtitle');
            title.innerText = name;
            subtitle.innerText = "Time: " + numSecs + " secs";
            tile.setAttribute("data-filled", "True");
            subtitle.setAttribute("data-seconds", numSecs);

            updateKitchen("kitchen-" + (i + 1).toString(), name, numSecs)
            return;
        }
    }

    // if loop goes through, all elements are filled so just fill the first element
    var tileToFill = tiles[0];
    var title = tileToFill.querySelector('.title');
    var subtitle = tileToFill.querySelector('.subtitle');
    title.innerText = name;
    subtitle.innerText = "Time: " + numSecs + " secs";       

}

function cook(foodTextIndex){
    tileID = foodTextIndex + "-tile";
    tile = document.getElementById(tileID);
    subtitle = tile.querySelector('.subtitle');
    var timeleft = subtitle.getAttribute('data-seconds');
    console.log(timeleft);
    var downloadTimer = setInterval(function(){
        tile.querySelector('.subtitle').innerHTML = timeleft + " seconds remaining";
        timeleft -= 1;
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            finishCook(foodTextIndex);
        }
    }, 1000);



}

function closeTile(tileID){
    var tile = document.getElementById(tileID);
    var title = tile.querySelector('.title');
    var subtitle = tile.querySelector('.subtitle');
    title.innerText = "Empty";
    subtitle.innerText = "Time: 0 sec";
    tile.setAttribute("data-filled", "False");
    let deleteFirebaseParam = 0;
    if (tileID === "first-tile")
        deleteFirebaseParam = 1;
    else if (tileID === "second-tile")
        deleteFirebaseParam = 2;
    else if (tileID === "third-tile")
        deleteFirebaseParam = 3;
    deleteFirebase(deleteFirebaseParam);
}

