//ON-LOAD==============================================================================
let courses = [];               //arr of obj containing course "name:" and "apiLink" keys
let coursePositionKey = {};     //obj containing name of courses and there index in temp
let temp = [];                  //arr of obj of each specific course data

fetch("https://golf-courses-api.herokuapp.com/courses")
    .then(response => response.json())
    .then(data => {
        count = 0;
        for (let i in data.courses) {
            courses.push({
                name: data.courses[i].name,
                apiLink: `https://golf-courses-api.herokuapp.com/courses/${data.courses[i].id}`
            });
            coursePositionKey[data.courses[i].name] = count;
            count++;
        }
    });