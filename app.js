//const Manager = require("./lib/Manager");
const Engineer = require('./lib/Engineer');
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


async function askQuestions(employeeList) {
    const baseQuestions = [
        'What is the employee name?',
        'What is the employee id?',
        'What is the email of the employee?',
        'What is the role of the employee?'
    ];
    try {
        const questions = baseQuestions.map(q=> ({ name: q, type: 'input' }));
        const answers = await inquirer.prompt(questions);
        console.log(answers['What is the role of the employee?']);
        if (answers['What is the role of the employee?'].toLowerCase() === 'intern') {
            //Ask what school
            const school = await inquirer.prompt({name: "What is the name of the student's school?", type: 'input'});
            const name = answers['What is the employee name?'];
            const id = answers['What is the employee id?'];
            const email = answers['What is the email of the employee?'];
            const int = new Intern(name, id, email, school);
            employeeList.push(int);
        }
        if (answers['What is the role of the employee?'].toLowerCase() === 'manager') {
            //Ask what Office Number
            const office = await inquirer.prompt({name: "What is the office number?", type: 'input'});
            const name = answers['What is the employee name?'];
            const id = answers['What is the employee id?'];
            const email = answers['What is the email of the employee?'];
            const man = new Manager(name, id, email, office);
            employeeList.push(man);
        }
        if (answers['What is the role of the employee?'].toLowerCase() === 'engineer') {
            const githubAnswer = await inquirer.prompt({name: "What is engineer's github screen name?", type: 'input'});
            const name = answers['What is the employee name?'];
            const id = answers['What is the employee id?'];
            const email = answers['What is the email of the employee?'];
            const github = githubAnswer["What is engineer's github screen name?"];
            const eng = new Engineer(name, id, email, github);
            employeeList.push(eng);
        }
        return employeeList;   
    } catch(err) {
    console.log('Error prompting user questions', err);
    }
}


function writeToFile(fileName, data) {
    fs.appendFile(fileName, data, function (err) {
    if (err) throw err;
    console.log('Saved!');
    });
}


async function init() {
    let employeeList = [];
    const numberOfEmployees = 1;

    try {
        for (let i=0; i<numberOfEmployees; i++) {
            employeeList = await askQuestions(employeeList);
        }
    
    } catch(err) {
        console.log('error:',err);
    }

    const htmlData = render(employeeList);
    writeToFile(outputPath, htmlData);
    




}


init();


// function generateMarkdown(data) {
//     return `
//     Name: ${data.name}
//     Role: ${data.role}
//     Email: ${data.email}
//     Github: ${data.github}
//     `;
// }

// module.exports = generateMarkdown;
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
