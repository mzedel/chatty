## Chatty

## Development setup

In order to get the project up and running, a few steps have to be made.

### Prerequisites

You need to have `node` & `npm` installed.

### Starting development

```bash
$ npm ci
```

As soon as this finishes you should be able to start an instance using `npm run dev`, so that modifications are shown in a browser at http://localhost:5173. To ensure a unified codestyle is kept across the codebase I also recommend using [Prettier](https://prettier.io) or at least some linting tool that can be integrated with your editor of choice. Furthermore the repository includes an `.editorconfig`, which helps to keep consistent codestyle and reduce friction during CI and pull requests.

## Technology choice

In order to complete the assignment a SPA was created based on React and the Create Vite App toolkit, as this was the quickest way to get an a scaffolding for an extendable page running, besides this it also comes with a convenient debugging experience. To provide a usable backend like experience MSW used and relied on during Vitest tests.

Regarding the styling of the app I stuck to plain CSS, as most of the formatting for an application of this size could still be managed with basic CSS features and would otherwise add to the asset size.

## Steps to test

Start a development server using `npm run dev`. As soon as this finishes you should be able to see the result in a browser at http://localhost:5173 and be able to interact with an echo functionality through the mock backend.

To test the API and user interaction and beyond type checking I added some basic unit tests using Vitest. To allow a more relaxed development of features these test suites should be extended, e.g. with Playwright as end-to-end tests, if a backend is to be taken into account.
