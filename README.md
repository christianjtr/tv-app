# My TV App application

Proof of concept aimed at putting into practice an e2e development cycle for an application.

> :bulb: Monorepo-like project in which services can be deployed and run independently. Feel free to add any improvements or suggestions you consider.

### 🎯 Goals

-   Create an application that displays **trending films and TV shows** in two rails.
-   Integrate the **The Movie DB API (TMDB)** to the application.
-   Implement a CI/CD process using **GitHub Actions, Docker, and a Cloud application hosting service.**

    #### The movie DB API:

    To implement the solution, we are required to sign up [themoviedb.org](https://www.themoviedb.org/), and also **integrate it to our back-end** then, we will be able to use their API services. For further details, check the specs here [TMDB API specs](https://developer.themoviedb.org/reference/intro/getting-started).

### Considerations

Please, check this consideration out.

> [!IMPORTANT]
>
> -   The architecture is a **mono repo-like project** that uses **workspaces to share type definitions among the app's tiers**.
> -   The application can be either **started locally or containerized**.
> -   Each app tier, within the project, can be started for development **independently from the others**.

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

##### Preview

![](./samples/showcase.gif)

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

Both applications services (client, server) have a few examples on how to develop unit tests and e2e tests (including some mocking strategies).

-   **Client-side:**

    -   Unit testing for services, react-hooks, state-less components, and entire sections (pages).
    -   **E2E testing:** Using Cypress. (i.e.: Navigate to search section and look for a movie).

![](./samples/cy.gif)

-   **Server-side:**
    -   Unit testing for services, controllers, etc.
    -   **E2E testing:** Using SuperTest. (i.e.: Simulate a running back-end to perform requests).

![](./samples/server-tests.png)

### CI/CD - **Containerization and Deployment**

The strategy followed to deploy the application implies:

##### Containerization of each application

-   Create **Dockerfiles per environment (dev, prod)** to build each application service (client-side, server-side).
-   Every Dockerfile perform a **multi-stage image build**.
-   Consider **workspaces and shared packages** when building images.
-   Create **parametrized docker-compose.yml file per environment (dev, prod)**. (At root folder level only - main Docker context).
-   Create **.dockerignore** files.
-   Create a docker-compose run and build script.
    -   Obtain **production environment variables given application's source files**.
    -   Provide every docker-compose.yml file with those variables in order to parametrize them.
    -   **Note:** Google Bard supported me on this.

##### GitHub actions

-   Implement a **GitHub action workflow** which is going to be dispatched whenever a pull-request or merge is performed.
-   Create repository's project secrets.
    -   Environment variables for production.
    -   Docker credentials
        -   Username.
        -   Docker TOKEN API. (Read, Write permissions).
-   Include jobs:
    -   Run tests.
    -   Containerize applications.
    -   Push applications to Docker Hub.
        -   You must have a **Docker Hub account**.

##### Render (Optional)

> [!IMPORTANT]
>
> At this point, the services are merged to the repository, tested, containerized, and published on Docker Hub (either as public or private images). Now, you should decide which **Cloud provider service to use to host your application**. (Azure, Amazon Web Services, Digital Ocean, Google Cloud Platform, etc, etc, etc.).

**Choice:** I decided to use [Render](https://render.com/), because is free for hobby projects (under certains conditions, of course).

Have a look at this [article on how to deploy pre-built docker images](https://docs.render.com/deploy-an-image) on their side.

![](./samples/cdci.png)

### Next steps

-   Extend this documentation to the applications (client-side, server-side, GitHub actions).
-   Enhance Dockerfiles and multi-stage builds.
-   Better use of npm workspaces (monorepos).
-   Improve overall CD/CI process.
-   Build back-end codebase.
