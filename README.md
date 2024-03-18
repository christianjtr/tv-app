# My TV App application

Proof of concept aimed at putting into practice an e2e development cycle for an application.

> :bulb: Monorepo-like project in which services can be deployed and run independently. Feel free to add any improvements or suggestions you consider.

### 🎯 Goals

-   Create an application that displays **trending films and TV shows** in two rails.
-   Integrate the **The Movie DB API (TMDB)** to the application.
-   Implement a CI/CD process using **GitHub Actions, Docker, and a Cloud application hosting service.**

    #### The movie DB API:

    In order to implement the solution, we are required to sign up [themoviedb.org](https://www.themoviedb.org/), and also **integrate it to our back-end** then, we will be able to use their API services. For further details, check the specs here [TMDB API specs](https://developer.themoviedb.org/reference/intro/getting-started).

### Considerations

Please, check this considerations out.

> [!IMPORTANT]  
- The architecture is a **mono repo-like project** that uses **workspaces to share type definitions among the app's tiers**.
- The application can be either **started locally or containerized**.
- Each app tier, within the project, can be started for development **independently from the others**.

### Tech Stack

This conceptual test has been developed using the following technologies:

-   **Front-end**
    -   [React](https://react.dev/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Vite](https://vitejs.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [DaisyUI](https://daisyui.com/)
-   **Back-end**
    -   [Express](https://expressjs.com/)
    -   [Node Cache](https://www.npmjs.com/package/node-cache)
    -   [Hapi Joi](https://github.com/hapijs/joi#readme)
    -   [Swagger](https://swagger.io/)
-   **Tests (Unit test and E2E)**
    -   [Jest](https://jestjs.io/)
    -   [React Testing Tools](https://testing-library.com/)
    -   [Cypress](https://www.cypress.io/)
    -   [SuperTest](https://www.npmjs.com/package/supertest)
-   **Containerization and Deployment**
    -   [Github Actions](https://docs.github.com/en/actions)
    -   [Docker](https://www.docker.com/)
    -   [Render](https://render.com/)
-   **Architecture**
    -   [NPM workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)

### Installation and running the project

The project requires:

-   [NodeJS](https://nodejs.org/)
-   [Docker](https://www.docker.com/)

**Clone the repository:**

```shell
git clone https://github.com/christianjtr/tv-app.git
```

**Scripts:**

Prior to execute these scripts, you must to run **npm install** in the directory you just downloaded/cloned the codebase.

```shell
# Run the entire develepoment environment for both client and server tiers
> npm run dev:app

# Run dev environment for the client-side
> npm run dev:client

# Run develepoment environment for the server-side
> npm run dev:server

# Run unit tests for the client-side tier
> npm run test:client

# Run e2e tests for the client-side tier
> npm run test:client:cy

# Run unit tests for the server-side tier
> npm run test:server

# Build shared types across the application
> npm run build:shared-types

# Perform docker compose to containerize and run the application
> npm run dev:docker:build-up
```

**Environment variables:**

Each app's tier within the project has its own environment variables file, you **should create a .env file following the templates provided** in the correspondant directory.

| Tier   | template     | directory | environment file to create |
| ------ | ------------ | --------- | -------------------------- |
| client | .env.local   | /app      | .env                       |
| server | .env.example | /server   | .env                       |

### Samples

##### Live demo

Click on the following link [GitHub page project](https://christianjtr.github.io/tv-app). **Note:** It's a mocked version of the project.

##### Home page preview

![](./samples/home.png)

##### Detail page preview

![](./samples/detail.png)

### Server side

##### API specs

The server side API follows the [OpenAPI Specification - Version 3](https://swagger.io/specification/)

```shell
# Enter the API's specs documenation by browsing to this URL.
<YOUR HOST>/api/docs
```

![](./samples/swagger.png)

### Tests (unit-tests and e2e)

### CI/CD
