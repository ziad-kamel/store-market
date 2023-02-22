# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

Your first task is to read the requirements and update the document with the following:

- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.  
  **Example**: A SHOW route: 'blogs/:id' [GET]

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.  
  **Example**: You can format this however you like but these types of information should be provided
  Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape.

### 2. DB Creation and Migrations

npx db-migrate create users-table --sql-file
npx db-migrate create products-table --sql-file
npx db-migrate create orders-table --sql-file

_Table_: **users** (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, email VARCHAR(50) UNIQUE, user_name VARCHAR(50) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, password text NOT NULL)

_Table_: **products** (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(100) NOT NULL, price integer NOT NULL)

_Table_: **orders** (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, product_id TEXT NOT NULL, user_id TEXT NOT NULL, quantity integer NOT NULL)

npx db-migrate up

### 3. Models

**UserModel** is the model for Users and deal with users table in database
it has:
_createuser_ used with /api/users/ [Post] route
_getUsers_ used with /api/users/ [Get] route [token required]
_getOneUser_ used with /api/users/:id [Get] route [token required]
_authenticateUser_ used with /api/users/authenticateUser [Post] route [token required]

**ProductModel** is the model for Products and deal with products table in database
it has:
_create_ used with /api/products/ [Post] route [token required]
_getMany_ used with /api/products/ [Get] route
_getOne_ used with /api/products/:id [Get] route

**OrderModel** is the model for orders and deal with orders table in database
it has:
_create_ used with /api/orders/ [Post] route [token required]
_getMany_ used with /api/orders/ [Get] route [token required]
_getOne_ used with /api/orders/:id [Get] route [token required]

### 4. Express Handlers

/api/

### 5. JWTs

done with authenticateUser method in **users.controllers.ts** and defined in _AuthenticateUser_ to make **token**

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
