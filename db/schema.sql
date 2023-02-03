DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  role_id INT,

  FOREIGN KEY (role_id)
    REFERENCES role(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id)
    REFERENCES employee(id)
  ON DELETE SET NULL
);


INSERT INTO department (name)
  VALUES ("Biology"),
        ("Chemistry"),
        ("English");

INSERT INTO role (title, salary, department_id)
  VALUES ("Intern", 5000, 1),
        ("Engineer", 20000, 1),
       ("Manager", 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES  ("John", "Doe", 3, 1),
        ("Jane", "Doe", 2, 1),
        ("Susan", "Doe", 1, 3);

