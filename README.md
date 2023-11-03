# PLease Leak

This project is a web application built with [React](https://reactjs.org/) and initialized using [Vite](https://vitejs.dev/). It is designed to be highly configurable, allowing you to integrate your own Firebase configuration with ease.

## Configuration

To properly use this application, you need to configure it to work with your Firebase instance.

1. Start by renaming the `config.template.json` file to `config.json`.
2. Open the `config.json` file and insert your Firebase configuration details:

   ```json
   {
     "apiKey": "your-api-key",
     "authDomain": "your-auth-domain",
     "projectId": "your-project-id",
     "storageBucket": "your-storage-bucket",
     "messagingSenderId": "your-messaging-sender-id",
     "appId": "your-app-id"
   }
   ```

Make sure to replace the values with your actual Firebase project settings. This information can be found in your Firebase project settings.

## Starting the Development Server

To run this React application, follow these steps:

1. Install all the necessary dependencies:

   ```sh
   npm install
   ```

   This command reads all the dependencies listed in the `package.json` file and installs them in your project's `node_modules` directory.

2. Once the installation is complete, you can start the development server:

   ```sh
   npm run dev
   ```

   This command starts the Vite development server. By default, it will be accessible at `http://localhost:3000` in your web browser. Vite will also provide hot module replacement, which means you can make changes to your code and see them instantly in the browser without needing to refresh the page.

## Building for Production

If you want to build the application for production use, run:

    ```sh
    npm run build
    ```

This will compile your React components and bundle your JavaScript using Vite's production settings. The output will be optimized for the best performance.

## Running Production Build Locally

To serve the production build on your local machine, you can use Vite preview:

    ```sh
    npm run preview
    ```

This serves the built app with Vite at `http://localhost:5173` by default.

## Conclusion

With your Firebase configuration set and the development server running, you're now ready to develop and build your React application. If you encounter any issues, please file them in the issues section of this repository.
