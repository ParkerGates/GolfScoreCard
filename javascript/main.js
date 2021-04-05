//=============================================================================
//VARIABLE=====================================================================
//=============================================================================
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







//=============================================================================
//STARTUP======================================================================
//=============================================================================
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







//=============================================================================
//FUNCTIONS====================================================================
//=============================================================================
function capFirstLetter(word) {
    let capital = word[0].toUpperCase();
    word = word.substring(1,word.length);
    return capital + word;
}



function playerDataSetUp(){
    playerData.forEach((index) => {
        for (let h = 0; h < holes.length; h++) {
            index.scores.push("");
        }
    });
}



function totalParsedForHolesText(item, classKey) {
    let answer = [];
    let inTotal = 0;
    let outTotal = 0;
    let fullTotal = 0;
    let counter = 0;

    $(`.${item}`).each((index, object) => {
        if (holes.length == 18) {  //ALL 18
            if (counter < 9) { outTotal += Number($(object).text()); }
            else { inTotal += Number($(object).text()); }
        }
        else {
            if(holes[0] == 1 && holes[8] == 9) { //FIRST 9
                outTotal += Number($(object).text());
                inTotal = "";
            }
            else {  //LAST 9
                inTotal += Number($(object).text());
                outTotal = "";
            }
        }
        counter++
    });

    fullTotal = Number(inTotal) + Number(outTotal);
    answer.push(outTotal); answer.push(inTotal); answer.push(fullTotal);

    $(`#${classKey}Out`).text(answer[0]);
    $(`#${classKey}In`).text(answer[1]);
    $(`#${classKey}Total`).text(answer[2]);
 
}



function totalParsedForHolesVal(item, classKey) {
    let answer = [];
    let inTotal = 0;
    let outTotal = 0;
    let fullTotal = 0;
    let counter = 0;

    $(`.${item}`).each((index, object) => {
        if (holes.length == 18) {  //ALL 18
            if (counter < 9) { outTotal += Number($(object).val()); }
            else { inTotal += Number($(object).val()); }
        }
        else {
            if(holes[0] == 1 && holes[8] == 9) { //FIRST 9
                outTotal += Number($(object).val());
                inTotal = "";
            }
            else {  //LAST 9
                inTotal += Number($(object).val());
                outTotal = "";
            }
        }
        counter++
    });

    fullTotal = Number(inTotal) + Number(outTotal);
    answer.push(outTotal); answer.push(inTotal); answer.push(fullTotal);
    
    for (let t = 0; t < answer.length; t++){
        if (answer[t] == 0) {
            answer[t] = "";
        }
    }

    $(`#${classKey}Out`).text(answer[0]);
    $(`#${classKey}In`).text(answer[1]);
    $(`#${classKey}Total`).text(answer[2]);
 
}



function endMessage(playerIndex, passedInData, dataIndex, scoreIndex) {
    setTimeout(() => {
        if (passedInData == playerData[dataIndex].scores[scoreIndex]) {
            let playerName = players[playerIndex];
            let parTotal = Number($('#pTotal').text());
            let parStanding = Number($(`#${playerName}Total`).text()) - parTotal;
            if (parStanding < 0) {
                popUp(`
                    AMAZING! ${playerName} ended the game ${parStanding} points under par! Congratulations!
                `);
            }
            else if (parStanding == 0) {
                popUp(`
                    Wow! ${playerName} ended the game EXACTLY on par. Cutting it a bit close there aren't ya?
                `);
            }
            else {
                popUp(`
                    ${playerName} ended the game ${parStanding} points over par. Well played. But try harder next time. &#128540;
                `);
            }
        }
    }, 2000);
}







//=============================================================================
//CREATE-GAME==================================================================
//=============================================================================
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
                        console.log(mainData.data.holes);
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








//=============================================================================
//GOLF-SCORE-CARD==============================================================
//=============================================================================
$('#built').on("keyup", ".data", (event) => {
    let allFilled = 0;

    let currentClasses = (event.currentTarget).className.split(" ");
    let scoreIndex = $(event.currentTarget).parent().attr("value");
    let dataIndex = players.indexOf(currentClasses[0]);
    let updatedData = Number($(event.currentTarget).val());

    if(isNaN(updatedData * 5)) {
        $(event.currentTarget).val(playerData[dataIndex].scores[scoreIndex]);
    }
    else {
        playerData[dataIndex].scores[scoreIndex] = updatedData;

        let totalAdded = 0;
        $(`.${currentClasses[0]}`).each((index, object) => {
            totalAdded += Number($(object).val());
            if ($(object).val() != "") { allFilled++; }
        });

        totalParsedForHolesVal(currentClasses[0], currentClasses[0]);

        if (holes.length == allFilled) {
            endMessage(dataIndex, updatedData, dataIndex, scoreIndex)
        }
    }
});