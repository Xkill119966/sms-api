How to start SMS API Project

Requirements
NodeJS (version - 8.0 and above)
Yarn
MySql

Install Packages
$ yarn

To add new packages
$ yarn add [PackageName]

To start Test
$ yarn test

To run BudgetFlow
$ yarn start

To see Yarn Cheatsheet
https://devhints.io/yarn

.. Knex Installation

To install Knex to use CLI globally, 

For Yarn  

$ yarn global add knex 

For npm  

$ npm install knex@0.13.0 -g  

If you haven't initialized the Knex, you can init it.  

$ knex init 

After you initialized, you will see the knex config file. 

.. Migration

knex migrate:make identity

knex migrate:latest --env development

knex seed:make identity_seed

knex seed:run --env development

knex migrate:rollback --env test

.. Database

DROP DATABASE `sms_db`;
CREATE SCHEMA `sms_db` DEFAULT CHARACTER SET utf8mb4;

DROP DATABASE `sms_test_db`;
CREATE SCHEMA `sm_test_db` DEFAULT CHARACTER SET utf8mb4;


.. Linux Commands
... Create Folders
$ mkdir -p {src,test}
