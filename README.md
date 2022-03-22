# Guddu Collection 

> **A Progressive WebApp for Men and Women Fashion Wear**

Please visit our [Webapp](https://guddu-collection.netlify.app/) and our shops located at : 

### Branches in Rishra, Hooghly:
* 89/173, Bangur Park, Near Mother Dairy
* Near Paul Complex, Mio Amore Market

## Checklist To Revamp/Integrate in this webapp

- [ ] Code revamp along with modularization of the utils and helper functions in their own folders, and keeping more comments to the code.
- [ ] Have a runtime caching for images (which are fetched from firebase), with the images limit to 20 or some hardcoded value, and which has some expiration time.
- [ ] Error handling to be revamped, with global error handling strategies.
- [ ] Implement functionality for users' feed, of what they searched and/or clicked.
- [ ] Import scss directly into React jsx components, rather than transpiling the scss to css and then importing css.
- [ ] Don't lazy load critical components like the Navbar or Footer components for example. Just import them to be built in one main chunk itself.
- [ ] Don't keep the env variables as REACT_APP_, instead keep them safely in some other storage. It is bcoz, these env variables gets bundled into the client-side bundle.
- [ ] Use prettier to keep the same coding structure formatting.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
