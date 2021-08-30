#!/usr/bin/env node

const { readFileSync } = require("fs");
const inquirer = require("inquirer");
const { green, red } = require("chalk");
const parser = require("mongodb-uri");

inquirer
  .prompt([
    {
      type: "list",
      name: "type",
      message: "For what do you want to use the URI",
      choices: [
        {
          name: "mongodb",
          value: 0,
        },
        {
          name: "mongoose",
          value: 1,
        },
      ],
    },
    {
      type: "list",
      name: "method",
      message: "Choose your build option",
      choices: [
        {
          name: "Build via questions",
          value: 0,
        },
        {
          name: "Build by file",
          value: 1,
        },
      ],
    },
  ])
  .then(({ method, type }) => {
    const format = (data) => {
      if (type === 0) {
        return parser.format(data);
      }
      if (type === 1) {
        return parser.formatMongoose(data);
      }
    };

    switch (method) {
      case 0:
        inquirer
          .prompt([
            {
              type: "list",
              name: "scheme",
              message: "Select your scheme",
              choices: ["mongodb", "mongodb+srv"],
            },
            {
              type: "input",
              name: "host",
              message: "Input your host (ip-adress or domain)",
            },
            {
              type: "input",
              name: "port",
              message: "Input your port (leave blank to use default port)",
            },
            {
              type: "input",
              name: "username",
              message: "Input your username (leave blank for url without auth)",
            },
            {
              type: "input",
              name: "password",
              message: "Input your password (leave blank for url without auth)",
            },
            {
              type: "input",
              name: "authSource",
              message: "Input your authSource (default admin)",
            },
            {
              type: "input",
              name: "database",
              message: "Input your database",
            },
          ])
          .then((answer) => {
            const validator = (unvalidated) => {
              if (unvalidated) return unvalidated;
              return undefined;
            };

            if(!answer.host) return console.log(red(">>> ") + "Please specify a host!");

            const URL_DATA = {
              scheme: validator(answer.scheme),
              hosts: [
                {
                  host: validator(answer.host),
                  port: validator(answer.port),
                },
              ],
              username: validator(answer.username),
              password: validator(answer.password),
              options: {
                authSource: answer.authSource || "admin",
              },
              database: validator(answer.database),
            };

            console.log(green(">>> ") + format(URL_DATA));
          });
        break;
      case 1:
        inquirer
          .prompt([
            {
              type: "input",
              name: "path",
              message: "Your file path (must be a JSON file)",
            },
          ])
          .then(({ path }) => {
            const URL_DATA = format(JSON.parse(readFileSync(path)));
            console.log(green(">>> ") + URL_DATA);
          });
        break;
    }
  });
