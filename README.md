# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploy the React App without Docker
Supossing that you already have [nvm](https://github.com/nvm-sh/nvm), npm and create-react-app installed on your system, let's proceed with the next steps:
1. Move to the root folder of your react-app.
    ```
    cd <wherever_your_github_proyect_is>/frontend
    ```
    
2. Install all the dependencies:
    ```
    npm install
    ```

3. Build your react app:
    ```
    npm run build
    ```

4. Run your react app, once its finishes it will open automatically a new window with your app in your browser:
    ```
    npm start
    ```

## Deploy the React App with Docker
1. Install [Docker](https://docs.docker.com/get-docker/). It is not recommended to use Docker in Windows, **may be problematic**.

2. Once you have installed docker, you have to build your container image. Note that this image will be built locally:
    ```
    docker build -t <your_username>/<whatever_image_name> .
    ```
    - `-t`: gives name (tag) to the image. In this case we are specifying to Docker that the built image has to be saved under the name `<whatever_image_name>` in the `<your_username>` local repository. 
    - A image built locally means that this image cannot be accesed from other computers, because the image is not published in your online repository, it's only on your local computer.

3. Once is built, then you can run your reactapp:
    ```
    docker run -d -p <port_to_forward_to>:80 <your_username>/<whatever_image_name>
    ```
    - `-d`: runs the container in background.
    - `-p <port_to_forward_to>:<port_to_forward>`: indicates the service ports. The `<port_to_forward>` port is where the container is listening, this port was defined in the nginx.conf. The `<port_to_forward_to>` port is the port that we want our app to be accessible in.

4. As the image has been built locally, access your app through localhost:<port_to_forward_to> in your browser.

<!--
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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
