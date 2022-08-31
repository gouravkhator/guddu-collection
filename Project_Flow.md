# Project Flow

## Folder structure

- `src/static_files`: For storing all static files, which should be in `/public/` directory, but some static files needs to be imported in the components or sass files present in the `/src` directory.

  React does not allow us to import anything from outside the `src` directory, in the files inside the `src` directory. That is why, we have to keep certain static files in this folder inside `src` directory.
