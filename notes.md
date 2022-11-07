Notes to self.

flow of the app creation (use for future app creation):

Start by setting up the database
1. elephantSQL(4) - development, test, preview, production
2. connect them to dbeaver

Fork and clone the repo, or make a new react app

Update the backend .env file with the connection URL's to your ElephantSQL database instance.

You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5001.

Run npm install to install project dependencies.

Open two terminals:
Run npm run start:dev to start your server in development mode when you cd into backend, and npm run start when you cd into frontend.

connect to render.com for deployment

**working on branches, push to and pull from gitHub often.

refer to notes on using gitHub --
--use of terminal and gitKraken


Decide how you would like your workflow to go:
refer to module 37 Connecting it All may help

Key Terms
-Inside-out development flow
A full-stack workflow that involves making changes starting with the backend, and fully implementing the feature for the current layer before making any changes to the layer above it
==horizontal slice workflow starting:
---- PostgreSQL - database
---- Express API - back end
---- React App - front end


-Outside-in development flow
A full-stack workflow that involves making changes starting with the frontend, fully implementing a small part of the feature through each layer of the architecture
==vertical slice workflow starting:
---- React App - front end
---- Express API - back end
---- PostgreSQL - database

Make Migration and seed files

npx knex migrate:make <tableName>
--fill out new table info, export up and down

npx knex migrate:latest
--will make the tables
npx knex migrate:rollback
--deletes the tables
***do more research on difference between these and npx knex migrate:up, npx knex migrate:down


- the seeds js file will need to require the seeds json file for that table to see the data
npx knex seed:run

After getting the database setup and seeded, 
the first thing you should do is make sure you can see the data.
--get it to appear on screen

Refer to module 37.5
You will start in the frontend project by creating a new route and minimal UI.

Create Layout.js/Routes.js and create the route paths.

Create components for the routes to go to. Start with a Creation component, i.e, CreateReservation.js.

Add a createReservation() function in the api.js, This function will eventually send a POST request to add the data to the backend API route.

Where do you want the information to display?
A Homepage or dashboard

-This is where you will set the useState, make a useEffect to make the request, map through the data, and then use the return to display it how you want.


now in the backend, add the app.js, router.js, controller.js, 
--you can use postman to see if the requests are working

Now that ui and  api are connected:
require in the controller.js and make the:
service.js

error handling files


creating the table using 
npx knex migrate:make tableName
and fill in the export up and down...
ex.
exports.up = function (knex) {
  return knex.schema.createTable("observations", (table) => {
    table.increments("observation_id").primary();
    table.decimal("latitude", null);
    table.decimal("longitude", null);
    table.integer("sky_condition");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("observations");
};

npx knex migrate:latest

Use DBeaver to check that the record was added to the database.

Return to the UI and refresh the home page

------------------
For this project.
making a kanban board using gitHub projects. Others to consider: trello, jira...

Letting the tests run to see what is failing, then working off the tests will get us in the mindset of:
-- the tests should be made before you start building the rest of your app, so it works based off the tests you preset.


work on one user story at a time, work on one item in that user story, do not get overwhelmed, it is ok to ask for help.
I am proud of you >:3
----LaToya Simon 11/06/22

Styling - 11/06/22

Progressive enhancement
A mobile-first approach that involves designing for the smallest screen first, then progressively adding features and rearranging the layout to take advantage of larger screen sizes

----------
deploying on heroku

https://rest-reservation-backendtoya.herokuapp.com/ | https://git.heroku.com/rest-reservation-backendtoya.git

https://rest-reservation-clienttoya.herokuapp.com/ | https://git.heroku.com/rest-reservation-clienttoya.git


----------
3.134.238.10
3.129.111.220
52.15.118.168


-------
NODE_ENV=production npm run knex -- migrate:latest

NODE_ENV=production npx knex migrate:latest