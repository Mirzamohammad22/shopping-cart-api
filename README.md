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
 -  Install and set up [Docker Desktop](https://docs.docker.com/desktop/)( >= 3.5.2)

    Ensure `docker-cli` has been installed by running the following command -
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
 -  Use the following command to build and start the required containers. To run the application in `production` mode, update the `NODE_ENV` and `command` values for `app` in the `docker-compose.yaml` file.
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
 -  Use the following command to stop and remove the containers.
   ```
   make stop_app
   ```

---

## Useful Make commands
The app contains a Makefile which contains some useful commands:

- `make start_app` - Start docker containers using docker compose
- `make stop_app` - Stop and remove docker containers using docker compose
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
| `POST /users/`              | Create a user                 |
| `POST /users/login/`        | Login user and get auth token |
| `PATCH /users/:userId/`     | Update details of a user      |
| `GET /users/:userId/`       | Get details of a user         |
| `GET /users/:userId/carts/` | Get the user's cart list      |

### Cart Routes
| Routes                                 | Description                             |
| -------------------------------------- | --------------------------------------- |
| `POST /carts/`                         | Create a cart for a user                |
| `POST /carts/:cartId/items/`           | Add an item to a cart                   |
| `PATCH /carts/:cartId/items/:itemId/`  | Update an item in a cart                |
| `GET /carts/:cartId/items/`            | Get list of items in a cart             |
| `DELETE /carts/:cartId/items/:itemId/` | Delete an item from a cart              |

---

## Things that can be improved
* For simplicity of the demo application, endpoints for delete user, delete cart, clear full cart have not been implemented.
* Currently only unit tests are done for service layer, ideally should be done for controller and model layer as well as integration testing.
* Categories are currently stored as string, which should ideally be a model itself.
* The error handling can be improved to have better seperation of concerns between controllers and services.
* Service layer can be made more SOLID.
* Add a cache middleware. The current endpoints would not benefit much from it (cache-hit would be low), could be added for read endpoints with high traffic.
