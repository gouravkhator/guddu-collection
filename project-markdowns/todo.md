# Todos

- [ ] Invalidate the old cache, when we publish our new deploy.

  - When we publish our new deploy, and then we again visit our pages, each of the pages gets a blank white page, and when we reload again, it then loads up the page succesfully.
  - [Code splitting causes chunks to fail to load after new deployment for SPA](https://stackoverflow.com/questions/44601121/code-splitting-causes-chunks-to-fail-to-load-after-new-deployment-for-spa)
  - Seems like some workarounds are given [here](https://stackoverflow.com/questions/53704950/webpack-code-splitting-loading-chunk-failed-error-wrong-file-path).
  - Tried to add below code in `index.html` in the script tag, but it does not work for some errors like `Uncaught SyntaxError: expected expression, got '<'`.:

    ```js
    const originalError = console.error;

    console.error = (e) => {
      console.log({ e });

      const isErrorChunkLoadType =
        /Loading chunk [\d]+ failed/.test(e.message) ||
        /Uncaught SyntaxError: expected expression, got/.test(e.message) ||
        /ChunkLoadError/.test(e.message);

      if (isErrorChunkLoadType) {
        window.location.reload();
      } else {
        originalError(e);
      }
    };
    ```

- [ ] Code revamp along with modularization of the utils and helper functions in their own folders, and keeping more comments to the code.
- [ ] Add a runtime caching for images (which are fetched from firebase), with the images limit to 20 or some hardcoded value, and which has some expiration time.
- [ ] Error handling to be revamped, with global error handling strategies.
- [ ] Implement functionality for users' feed, of what they searched and/or clicked.
- [ ] Add admin webpages like uploading of products here itself, whilst adding admin and normal user authentication and authorization.
