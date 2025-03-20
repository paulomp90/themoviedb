# themoviedb

A movie movie catalog application using Vue that interacts with The Movie
Database API (TMDb).

## Setup

- [Vite](https://vite.dev/) to start the project with the command option `--template vue`
- [Vue Router](https://router.vuejs.org/) for routing
- [Vuex](https://vuex.vuejs.org/) for state management
- [Vue Test Utils](https://test-utils.vuejs.org/) with [Jest](https://jestjs.io/) for testing
- [tailwindcss](https://tailwindcss.com/) for styling

## Process

### Routing

Decided to create the project with 2 routes `Home` and `Movie Details`

### State Management

The store has 2 modules in the state `movies` and `user`.

#### Movies

Movies module contains the filters, pagination and api calls.

There are 2 options in the filters: a `query` to search by the movie title, and a `year` that works together with the query to search movies.

For the pagination there are four entries in the state.

- `perPage`: number of movies per page;
- `totalResults`: total results is the number of results in the tmdb request;
- `currentPage`: the current page that is being rendered for the user;
- `tmdbPage`: tmdb only works with 20 movies per page and we need to save the tmdb page;

Since TMDB provides results in pages of 20 movies, but the user can set a custom `perPage` value (e.g., 5), additional logic is needed to determine whether another API request is necessary.

For example, if the first API call retrieves 20 movies and the user has `perPage = 10`, we already have enough data for the second page. In this case, there’s no need to make another request, as the results are already available.

#### User

The user module manages the user's favorite movies. When the state is initialized, it syncs with `localStorage` to retrieve the list of favorite movies.

Every time the user adds/removes a movie from the favorites list, the state is updated, and `localStorage`.

`localStorage` is used to ensure that the user have persistence.

### Testing

There are several tests for both the store and for vue components.

#### Store

The store tests cover both mutations and actions, as these contain the most significant logic. Testing them ensures that API calls function correctly and that state updates occur as expected.

#### Vue components

The Vue component tests contemplate rendering, interactions, props, and event emissions. They ensure that components display the correct information, respond to user actions, and behave as expected when receiving different props.
Lastly, event emissions are tested to verify that components communicate with their parent components.

## Run the project

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (Recommended: LTS version)
- npm (comes with Node.js) or pnpm or Yarn

Note: Vite requires Node.js version 18+ or 20+

### Installation

1. Clone the project

```sh
git clone git@github.com:paulomp90/themoviedb.git
cd themoviedb
```

2. Install dependencies

Run one of the following commands

```sh
npm install
yarn install
pnpm install
```

3. Running the Development Server

```sh
npm run dev
yarn dev
pnpm dev
```

By default, the app will be available at http://localhost:5173.

4. Running Tests

```sh
npm run test
yarn test
pnpm test
```
