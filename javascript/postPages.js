//POST-PAGES===================================================================
function createGame(){
    $('#createGame').append(`
        <h1>Set Up</h1>

        <label for="courseSelect" class="block">Select Course</label>
        <select name="courseSelect" id="courseSelect">
            <option value="" disabled selected hidden>Course...</option>
        </select>
        <hr>

        <label for="teeBoxSelect" class="block">Select Tee Box</label>
        <select name="teeBoxSelect" id="teeBoxSelect">
            <option value="" disabled selected hidden>Tee Box...</option>
            <option value="0">Pro</option>
            <option value="1">Champion</option>
            <option value="2">Men</option>
            <option value="3">Women</option>
        </select>
        <hr>

        <label for="holeSelect" class="block">Select Number of Holes</label>
        <select name="holeSelect" id="holeSelect">
            <option value="" disabled selected hidden>Number of Holes...</option>
            <option value="fNine">First 9</option>
            <option value="bNine">Last 9</option>
            <option value="Eighteen">All 18</option>
        </select>
        <hr>

        <div class="playerSetUp">
            <label class="block">Enter Players <sup style="color:#043827;font-size: 12px;">(Up to 4)</sup></label>
            <div class="playerName">
                <input class="playerInput" type="text" placeholder="Player Name...">
                <span class="playerDelete">&#10008;</span>
            </div>
            <span id="addPlayer">&#10010;</span>
        </div>

        <div class="bottom">
            <hr>
            <input id="play" type="button" value="Play!">
        </div>`
        );
}


//POST-POP-UP==================================================================
function popUp(message) {
    $('nav').css("filter","blur(2px)");
    $('main').css("filter","blur(2px)");
    $('body').append(`
        <div id="popUp">
            <div class="popUpBack"></div>
            <div class="popUpMessage">
                <div class="message">
                    <p>${message}</p>
                    <button onclick="closePopUp()">Ok</button>
                </div>
            </div>
        </div>
    `);
}

function closePopUp(){
    $('#popUp').remove();
    $('nav').css("filter","none");
    $('main').css("filter","none");
}


//POST-BUILT===================================================================
function buildScoreCard(){
    let count;

    //TABLE1
    let col1 = ["Hole","Yardage","Par","Handicap", ...players];
    let table1 = `<table id="table1">`;
    for (let i = 0; i < col1.length; i++) {
        table1 += `<tr><th>${col1[i]}</th></tr>`;
    }
    table1 += `</table>`;
    

    //TABLE2
    let table2 = `<table id="table2">`;

    table2 += `<tr>`;
    holes.forEach((elem) => { table2 += `<td class="holes">${elem}</td>`;});
    table2 += `</tr>`;

    table2 += `<tr>`;
    yardage.forEach((elem) => { table2 += `<td class="yardage">${elem}</td>`;});
    table2 += `</tr>`;

    table2 += `<tr>`;
    par.forEach((elem) => { table2 += `<td  class="par">${elem}</td>`;});
    table2 += `</tr>`;

    table2 += `<tr>`;
    handicap.forEach((elem) => { table2 += `<td  class="handicap">${elem}</td>`;});
    table2 += `</tr>`;

    for(let p = 0; p < playerCount; p++) {
        table2 += `<tr>`;
        count = 0;
        playerData[p].scores.forEach((elem) => {
            table2 += `<td value="${count}"><input type="text" maxlength="2" class="${players[p]} data" value="${elem}"></td>`;
            count++;
        });
        table2 += `</tr>`;
    }
    table2 += `</table>`;
    

    //TABLE3
    let table3 = `<table id="table3">`;
    table3 += `<tr><th class="hidden"></th><th>Out</th><th>In</th><th>Total</th></tr>`;
    table3 += `<tr><th class="hidden">Yrds</th><th id="yOut"></th><th id="yIn"></th><th id="yTotal"></th></tr>`;
    table3 += `<tr><th class="hidden">Pars</th><th id="pOut"></th><th id="pIn"></th><th id="pTotal"></th></tr>`;
    table3 += `<tr><th class="hidden">Hcp</th><th id="hOut"></th><th id="hIn"></th><th id="hTotal"></th></tr>`;
    for(let p = 0; p < playerCount; p++) {
        table3 += `<tr><th class="hidden">${players[p]}</th><th id="${players[p]}Out"></th><th id="${players[p]}In"></th><th id="${players[p]}Total"></th></tr>`;
    }







    //BUILDING IT UP
    $('#built').append(`
        <h1>Game Start</h1>
        <div class="fullScore">
            ${table1}
            <div id="mainDisplay">
                <div id="mainTable">
                    ${table2}
                </div>
                <div class="buttonDiv">
                    <button id="left" onclick="clickLeft()">&#8592;</button>
                    <button id="right" onclick="clickRight()">&#8594;</button>
                </div>
            </div>
            ${table3}
        </div>
    `);
    totalParsedForHolesText("yardage",  "y");
    totalParsedForHolesText("par",  "p");
    totalParsedForHolesText("handicap",  "h");
    players.forEach((element) => {
        totalParsedForHolesVal(element, element);
    });
    tableResize();
}