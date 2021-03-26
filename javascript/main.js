//VARIABLE=====================================================================
let mainData;
let courseName;

let holes = [];
let yardage = [];
let par = [];
let handicap = [];

let players = [];
let playerData = [];

let teeBoxIndex;

let tableRows = 4;
let playerCount = 1;
let localstorage = true;




//STARTUP======================================================================





//FUNCTIONS====================================================================
function capFirstLetter(word) {
    let capital = word[0].toUpperCase();
    word = word.substring(1,word.length);
    return capital + word;
}

function playerDataSetUp(){
    playerData.forEach((index) => {
        for (let h = 0; h < holes.length; h++) {
            index.scores.push([]);
        }
    });
}





//CREATE-GAME==================================================================
$('#createGame').on('change',"#courseSelect", () => {
    courseName = $("#courseSelect").val();
});


$('#createGame').on('change',"#holeSelect", () => {
    selected = $('#holeSelect option:selected').text();
    switch (selected) {
        case "First 9":
            holes = [1,2,3,4,5,6,7,8,9];
            break;
        case "Last 9":
            holes = [10,11,12,13,14,15,16,17,18];
            break;
        case "All 18":
            holes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
            break;
    }
});


$('#createGame').on('change',"#teeBoxSelect", () => {
    teeBoxIndex = $('#teeBoxSelect option:selected').attr("value");

});


$('#createGame').on("click","#addPlayer", () => {
    if (playerCount != 4) {
        $('.playerSetUp').children().last().remove();
        $('.playerSetUp').append(`
            <div class="playerName">
                    <input class="playerInput" type="text" placeholder="Player Name...">
                    <span class="playerDelete">&#10008;</span>
            </div>
        `);
        if (playerCount < 3) {
            $('.playerSetUp').append(`<span id="addPlayer">&#10010;</span>`);
        }

        playerCount++;
    }
});


$('#createGame').on("click",".playerDelete", (item) => {
     current = item.currentTarget;
    $(current).parent().remove();

    if (playerCount == 4) {
        $('.playerSetUp').append(`<span id="addPlayer">&#10010;</span>`);
    }
    playerCount--;
});


$('#createGame').on("click","#play", () => {
//If ALL DROPDOWNS r selected
    if ($('#createGame option:selected').attr("value") != "" && $('#teeBoxSelect option:selected').attr("value") != "" && $('#holeSelect option:selected').attr("value") != "") {
        
        //If there is AT LEAST 1 INPUT
        if ($(".playerInput")[0]) {
            players = [];

            $(".playerInput").each((index, element) => {
                if ($(element).val() != "") {
                    players.push($(element).val());
                    playerData.push({name: $(element).val(), scores: []});
                }
            });

            //If all INPUTS are FILLED IN
            if (players.length != playerCount) {
                popUp("All Players Must Be Named");
                return;
            }
            else {
                let selectedCourse = courses[coursePositionKey[courseName]];
                let courseLink = selectedCourse.apiLink ;
                
                fetch(courseLink)
                    .then(response => response.json())
                    .then(info => {
                        mainData = info;

                        for (let h in holes) {
                            h = holes[h] - 1;
                            current = mainData.data.holes[h].teeBoxes[teeBoxIndex];

                            yardage.push(current.yards);
                            par.push(current.par);
                            handicap.push(current.hcp);
                        }
                        $('#createGame').remove();

                        playerDataSetUp();







                        buildScoreCard();
                    });
            }
        }
        else {
            popUp("Must Have At Least One Player");
            return;
        }
    }
    else { 
        popUp("All Drop Down Items Need To Have A Value Selected");
        return;
    } 
});





//GOLF-SCORE-CARD==============================================================



















//ASYNC CRINGE=================================================================
    //For START-UP
    if (localstorage) {

        createGame();
        setTimeout(() => {
            for (let item of courses) {
                $('#courseSelect').append(`
                    <option value="${item.name}">${item.name}</option>
                `);
            }
        },1000);
    }