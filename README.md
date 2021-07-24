# shopping-cart-api
A RESTful API built for serving as a backend for a Shopping Cart.

---

## Table of Content
- [Description](#description)
- [Folder Structure](#folder-structure)
- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [Local Setup Instructions using Docker](#local-setup-instructions-using-docker)
- [Useful Make commands](#useful-make-commands)
- [Testing using Postman](#testing-using-postman)
- [API Usage Documentation](#api-usage-documentation)
- [API Routes](#api-routes)
    * [Item Routes](#item-routes)
    * [User Routes](#user-routes)
    * [Cart Routes](#cart-routes)
- [Things that can be improved](#things-that-can-be-improved)

---

## Description
A demo shopping cart application that allows a user to register with the API, browse a list of items, create a cart and then add/remove/edit the items in their cart.

 -  Built in Node.js using Express framework
 -  Uses [JWT](https://jwt.io/introduction) for Authetication and Authorization
 -  Uses MySQL database and [Sequelize ORM](https://sequelize.org/)
 -  Uses Redis for caching

---

## Folder Structure

      .
      ├── config                # Configuration files
      ├── docs                  # Swagger documentation files
      ├── env_variables         # Env variables for docker containers (demo purpose)
      ├── migrations            # Sequelize migrations files
      ├── seeders               # Sequelize seeders files
      ├── src                   # Source files for application
      │   ├── controllers
      │   ├── middlewares
      │   ├── model
      │   ├── routes
      │   ├── server.js
      │   ├── services
      │   └── utils
      ├── tests                 # Unit test
      ├── docker-compose.yaml
      ├── Dockerfile
      ├── Makefile
      ├── package-lock.json
      ├── package.json
      └── README.md

---

## Requirements
 -  Install and set up [Docker Engine](https://docs.docker.com/desktop/).

    Ensure you have `docker-cli` installed by running the following command -
    ```
    docker -v
    ```
---

## Local Setup Instructions using Docker
 -  Clone the repository on your local machine (using SSH).
    ```
    git clone git@github.com:MirzaMohammad22/shopping-cart-api.git
    ```
 -  Change directory to the folder that was just cloned.
    ```
    cd shopping-cart-api
    ```
 -  Use the following command to start the required containers. To run the application in `production` mode, update the `NODE_ENV` value in the `docker-compose.yaml` file.
    ```
    make start_app
    ```
    > App should now be running on [**`http://localhost:3000`**](http://localhost:3000), however we still need to run migrations.
 -  Use the following command to run the migrations on the local database.
    ```
    make db_migrate
    ```
 -  Use the following command to seed the local database with dummy data.
    ```
    make db_seed
    ```
 -  Use the following command to follow the logs of the application container.
    ```
    make watch_logs
    ```

---

## Useful Make commands
The app contains a Makefile which contains some useful commands:

- `make start_app` - Start docker containers using docker compose
- `make stop_app` - Stop docker containers using docker compose
- `make watch_logs` - Follow the logs of the application container
- `make seed_db` - Seed the database with initial dummy data
- `make lint` - Run the code quality/linting tools on the application codebase
- `make test` - Run all tests
- `make db_migrate` - Run the migrations on the database
- `make db_migrate_undo_all` - Undo all the migrations on the database
- `make db_migrate_undo_last` - Undo the last migration on the database

> Note: Most of these commands run inside the application container. The default value for the container name is `shopping-cart-api_app_1`. To override the default value, use `CONTAINER_NAME=<container_name> make <command>`.

---

## Testing using Postman
Import the Postman collection (`ShoppingCartAPI.postman_collection`) available in the repo into the Postman application. It contains all the endpoints available for the API.

---

## API Usage Documentation
For more detailed documentation about each endpoint, navigate to [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs) in the browser once the application is running.

---

## API Routes

### Item Routes
| Routes        | Description           |
| ------------- | --------------------- |
| `GET /items/` | Get list of all items |

### User Routes
| Routes                      | Description                   |
| --------------------------- | ----------------------------- |
| `POST /users/`              | Create a new user             |
| `POST /users/login/`        | Login user and get auth token |
| `PATCH /users/:userId/`     | Update details of a user      |
| `GET /users/:userId/`       | Get details of a user         |
| `GET /users/:userId/carts/` | Get the user's cart list      |

### Cart Routes
| Routes                                 | Description                             |
| -------------------------------------- | --------------------------------------- |
| `POST /carts/`                         | Create a new cart for a user            |
| `POST /carts/:cartId/items/`           | Add a new item to the specified cart    |
| `PATCH /carts/:cartId/items/:itemId/`  | Update an item in a cart                |
| `GET /carts/:cartId/items/`            | Get list of items in the specified cart |
| `DELETE /carts/:cartId/items/:itemId/` | Delete an item from a cart              |

---

## Things that can be improved
* For simplicity of the demo application, endpoints for delete user, delete cart, clear full cart have not been implemented.
* Currently only unit tests are done for service layer, ideally should be done for controller and model layer
* Categories are currently stored as string, which should ideally be a table itself
* The currently error handling solution for seperation of concerns between controller and services.
* Service layer could be more SOLID
* cache middleware - Depends on endpoints, current endpoints dont seem to really benefit of it(cache-hit would be low).
