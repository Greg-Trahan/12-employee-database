const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");
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

inquirer
  .prompt([
    // view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
      ],
      name: "start",
    },
  ])
  .then((response) => {
    console.log(response);
  });
