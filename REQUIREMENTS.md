# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  /api/products/ [Get]

- Show // read one
  /api/products/:id [Get]

- Create [token required]
  /api/products/ [Post]

#### Users

- Index [token required]
  /api/users/ [Get]

- Show [token required]
  /api/users/:id [Get]

- Create N[token required]
  /api/users/ [Post]

#### Orders

- Current Order by user (args: user id)[token required]
  /api/orders/ [Get]

  /api/orders/ [Post]

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- email
- user_name
- first_name
- last_name
- password

#### Orders

- id
- product_id
- user_id
- quantity
