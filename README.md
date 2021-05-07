# Tutorial-Vue-Router-Authentication-Handling
This repository is dedicated to Chris Nwamba's tutorial, [How To Set Up Vue.js Authentication and Route Handling Using vue-router](https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router).  **All credit for code origination goes to Chris Nwamba's tutorial post from DigitalOcean, and this is hosted as an academic excersise to learn more about Authentication with Vue.js, as well as improve skills with the Git version control software.

## Breakdown
The tutorial is broken down into **client** and **server**.
- The **client** uses the following packages:
  - [Vue.js](https://vuejs.org/) as a front-end framework for building the ui. 
  - [Vue CLI](https://www.npmjs.com/package/@vue/cli) to scaffold project.
  - [@vue/cli-init](https://www.npmjs.com/package/@vue/cli-init) to initialize front end project folder.
  
- The **server** uses the following packages:
  - [Node.js](https://nodejs.org/en/) to run.
  - [Express.js](https://www.npmjs.com/package/express) to act as an API server.
  - [body-parser](https://www.npmjs.com/package/body-parser) to access values from AJAX requests.
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) to encrypt sensitive data.
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) to store the user id and expiration date of a successful login. 
  - [sqlite3](https://github.com/mapbox/node-sqlite3) to create, store, and interact with the user data.

## Summary

## Notes
1. Tutorial summary:
    - Initialized an empty folder for the server
    - Installed required **npm** packages
    - Instantiated required packages for server api
    - Added routing to *App.js*
    - Backfilled *config* and *db* files
    - Added server api execution code
    - Scaffolded a **webpack** based folder structure for the client
    