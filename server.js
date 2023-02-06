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
          "Update an employee",
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
        case "Update an employee":
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
    start();
  });
}

function viewAllRoles() {
  db.query(
    "SELECT * FROM role JOIN department ON role.department_id = department.id",
    (err, results) => {
      if (err) {
        console.error({ error: err.message });
        return;
      } else {
        console.table("Roles", results);
      }
      start();
    }
  );
}

async function viewAllEmployees() {
  db.query(
    "SELECT * FROM employee JOIN role ON employee.role_id = role.id",
    (err, results) => {
      if (err) {
        console.error({ error: err.message });
        return;
      } else {
        console.table("Employees", results);
      }
      start();
    }
  );
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
        `INSERT INTO department (dept_name) VALUES (?)`,
        response.name,
        (err, results) => {
          if (err) {
            console.error({ error: err.message });
            return;
          }
        }
      );
    });
  start();
}

async function addRole() {
  await inquirer
    .prompt([
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
      },
    ])
    .then((response) => {
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
  start();
}

async function addEmployee() {
  await inquirer
    .prompt([
      {
        type: "text",
        message: "What is the employees first name?",
        name: "first",
      },
      {
        type: "text",
        message: "What is the employees last name?",
        name: "last",
      },
      {
        type: "text",
        message: "What is the ID of thier role?",
        name: "roleID",
      },
      {
        type: "text",
        message: "What is the ID of thier manager?",
        name: "managerID",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`,
        [response.first, response.last, response.managerID, response.roleID],
        (err, results) => {
          if (err) {
            console.error({ error: err.message });
            return;
          }
        }
      );
    });
  start();
}

async function updateEmployee() {
  await inquirer
    .prompt([
      {
        type: "text",
        message: "What is the id of the employee you wish to update?",
        name: "id",
      },
      {
        type: "list",
        message: "What would you like to update?",
        choices: ["First Name", "Last Name", "Role", "Manager"],
        name: "change",
      },
    ])
    .then((response) => {
      switch (response.change) {
        case "First Name":
          inquirer
            .prompt([
              {
                type: "text",
                message: "What is thier new first name?",
                name: "name",
              },
            ])
            .then((answer) => {
              db.query(
                "UPDATE employee SET first_name = ? WHERE id = ?",
                [answer.name, response.id],
                (err, results) => {
                  if (err) {
                    console.error({ error: err.message });
                    return;
                  }
                }
              );
              start();
            });
          break;
        case "Last Name":
          inquirer
            .prompt([
              {
                type: "text",
                message: "What is thier new last name?",
                name: "name",
              },
            ])
            .then((answer) => {
              db.query(
                "UPDATE employee SET last_name = ? WHERE id = ?",
                [answer.name, response.id],
                (err, results) => {
                  if (err) {
                    console.error({ error: err.message });
                    return;
                  }
                }
              );
              start();
            });
          break;
        case "Role":
          inquirer
            .prompt([
              {
                type: "text",
                message: "What is the ID of thier new role?",
                name: "roleId",
              },
            ])
            .then((answer) => {
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answer.roleId, response.id],
                (err, results) => {
                  if (err) {
                    console.error({ error: err.message });
                    return;
                  }
                }
              );
              start();
            });
          break;
        case "Manager":
          inquirer
            .prompt([
              {
                type: "text",
                message: "What is the id of thier new manager?",
                name: "managerId",
              },
            ])
            .then((answer) => {
              db.query(
                "UPDATE employee SET manager_id = ? WHERE id = ?",
                [answer.managerId, response.id],
                (err, results) => {
                  if (err) {
                    console.error({ error: err.message });
                    return;
                  }
                }
              );
              start();
            });
          break;
      }
    });
}

start();
