const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log("Connected to the company_db database.")
);

async function start() {
  await inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
        name: "answer",
      },
    ])
    .then((response) => {
      switch (response.answer) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        case "Quit":
          process.exit();
      }
    });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.error({ error: err.message });
      return;
    } else {
      console.table("Departments", results);
    }
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.error({ error: err.message });
      return;
    } else {
      console.table("Roles", results);
    }
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error({ error: err.message });
      return;
    } else {
      console.table("Employees", results);
    }
  });
}

async function addDepartment() {
  await inquirer
    .prompt({
      type: "text",
      message: "What is the name of the department?",
      name: "name",
    })
    .then((response) => {
      console.log(response.name);
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        response.name,
        (err, results) => {
          if (err) {
            console.error({ error: err.message });
            return;
          }
        }
      );
    });
}

async function addRole() {
  await inquirer
    .prompt(
      {
        type: "text",
        message: "What is the name of the role?",
        name: "name",
      },
      {
        type: "text",
        message: "What is the salary?",
        name: "salary",
      },
      {
        type: "text",
        message: "Waht is the ID of its department?",
        name: "deptID",
      }
    )
    .then((response) => {
      console.log(response.name);
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [response.name, response.salary, response.deptID],
        (err, results) => {
          if (err) {
            console.error({ error: err.message });
            return;
          }
        }
      );
    });
}

async function addEmployee() {}

async function updateEmployee() {}

start();
