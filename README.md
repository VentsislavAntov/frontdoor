
# Description
This is a Chrome extension application that allows the user to select text from any webpage, queries OpenAI api twice to create a short summary and 5 tags of the text, uses GraphQL and stores the information in the cloud via MongoDB Atlas. These are then displayed in the extension's popup. The summary is shown as a tooltip upon hover over the original text in the popup's items. There is a date sorting and tag filtering functionality. There is also a button for disabling the extension and a button for downloading the summaries in CSV. The application sends and listens to messages between the background and content scripts with which to enable only one operation at a time while processing the backend. In addition, the process will be triggered only if a text is selected. The server is running on port 3000 and the client on 3001. In terms of tech stack, the application is written fully in typescipt and used GraphQL. It has React for frontend, Node.js/Nest.js, for backend. Jest for testing.

# Instructions for starting up the application
* Run npm install in both root and /server
* Run npm build-start from root
* Open a new terminal and run npm run start from /server
* From a chrome tab open the extensions menu, enable developer mode and click load unpacked. Select the project root directory. The extension is enabled

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
