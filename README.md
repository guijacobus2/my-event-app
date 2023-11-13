This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run

```bash
npm ci
```

to install node modules.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DECISION MAKING

I have decided to use NEXT JS as the framework for the Visory code challange.

The reason for it was that I have been studying the new version of next with Next 14, utilising Server actions / components to communicate with APIs.

The process works as:

- Inside the /src/app/api directory I have the route.ts file with a GET request to the Ticket master events API.
- I have used ZOD as the npm package for schema validation, to make sure the params being passed through the query params were of the expected type.
- I have then used the DatePicker component from Material UI (MUI) to select the start and end date times as required, and a simple text input for the Location filter (city).
- Then, once the button is clicked, it's then rendered a list of events with the name, date, time, and venue.
