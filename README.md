# Instagram Stories

## Version: 1.0.0

### Technologies Used

- React
- TypeScript
- CSS Modules

### Design Choices

- **Lazy Loading & Prefetching:** Used lazy loading for images to defer loading until they come into view, and prefetching the next and previous story to ensure seamless transitions without delay.
- **Code Splitting for Story Preview:** Implemented dynamic imports to split the story preview component, loading it only when needed to reduce the initial load time.
- **Memoized Components:** Applied memoization techniques (e.g., React.memo) to avoid unnecessary re-renders and improve performance, ensuring only changed components are re-rendered.
- **Cache Control Headers:** Used images with proper cache control headers for browser caching, reducing repeated image requests and improving load times for subsequent visits.
- **Scalability:** Modularized components, separating page containers from core components, and focusing on testing core components for stability as the app grows.

## Getting Started

To get started with Instagram Stories, first clone the repository using: `git clone https://github.com/mehulsachdeva/instagram-stories.git`

Once cloned, navigate to the project directory: `cd instagram-stories`

Then, install the necessary dependencies with: `npm install`

To run the app in development mode, use: `npm start`<br/>
This will start the server, and you can view the app in your browser at [http://localhost:3000](http://localhost:3000).

In order to run the test cases, use: `npm test -- --watchAll` or `npm test` (and press `a` on prompt)

In order to build the app for <b>production</b>, use: `npm run build`
<br />This bundles React in production mode and optimizes the build for the best performance.
