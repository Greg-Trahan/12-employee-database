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
      res.status(500).json({ error: err.message });
      return;
    } else {
      console.table("Departments", results);
    }
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      console.table("Roles", results);
    }
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    } else {
      console.table("Employees", results);
    }
  });
}

function addDepartment() {}

function addRole() {}

function addEmployee() {}

function updateEmployee() {}

start();
