# metamask-sign-in

In order to view the hosted version of the test task.<br />
Open [https://metamask-sign-in.vercel.app/](https://metamask-sign-in.vercel.app/) to view it in the browser.

## Available Scripts

To intall the project dependencies, you can run:

### `npm install --legacy-peer-deps`

Then, to start the project locally, you can run:

### `npm start dev`

## Notes

1. Even though the project is tiny, I decided to use redux-toolkit for state management, in order to reduce props-drilling and to make code more readable
2. Initially started the project with app-router paradigm, but was unable to quickly fix the [issue with NextResponse](https://github.com/vercel/next.js/issues/48524) in api-routes, so to make things quicker I decided to switch to the pages-router paradigm
3. If I were to build a Next.js application for production purpose, I'd better not use api-routes in Next.js, and build the api as a separate application by means of any reliable framework. To my experience api-routes is the weakest part of Next.js, that often causes unexpected and frustrating problems both in app-router and pages-router

