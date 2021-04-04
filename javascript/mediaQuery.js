window.onload = function () {
    if (window.innerWidth >= 875) {
        $('main').css("margin","auto");
        $('main').css("margin-top","8px");
    }
    if (window.innerWidth < 875) {
        $('main').css("margin","8px");
    }
}

window.onresize = function() {
    if (window.innerWidth >= 875) {
        $('main').css("margin","auto");
        $('main').css("margin-top","8px");
    }
    if (window.innerWidth < 875) {
        $('main').css("margin","8px");
    }
    tableResize();
}




//SCROLL--------------------------------------------
function clickLeft() {
    let currentPos = $('#mainTable').scrollLeft();
    currentPos += -80;
    $('#mainTable').scrollLeft(currentPos);
}

function clickRight() {
    let currentPos = $('#mainTable').scrollLeft();
    currentPos += 80;

    $('#mainTable').scrollLeft(currentPos);
}




//TABLE STRUCTURE------------------------------------
function tableResize() {

    if (holes.length < 10) {
        if (window.innerWidth > 560) {
            $('.hidden').css('display','none');
            $('#table3').css('margin-left',"10px");
            $('#table3').css('margin-top',"0px");
        }
        else {
            $('.hidden').css('display','table-cell');
            $('#table3').css('margin-left',"0px");
            $('#table3').css('margin-top',"10px");
        }
    }
    else if (holes.length > 17) {
        if (window.innerWidth > 868) {
            $('.hidden').css('display','none');
            $('#table3').css('margin-left',"10px");
            $('#table3').css('margin-top',"0px");
        }
        else {
            $('.hidden').css('display','table-cell');
            $('#table3').css('margin-left',"0px");
            $('#table3').css('margin-top',"10px");
        }
    }
}