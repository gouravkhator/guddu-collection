# Notes for Developers

- Why Firebase API Keys and Env Variables are exposed publicly?

  - The env variables prefixed with `REACT_APP_` gets hardcoded with actual values in the built files, which can be inspected on the client side by anyone.
  - These firebase env variables are not meant by design by the firebase team, to be private. These are not secret keys, rather they are just the keys to identify the firebase project.
  - Main database security lies in the Firebase Security rules, and not in hiding these keys.
  - Read more on [How to secure your firebase project, even when your api key is publicly available](https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843).

- Uploading of products is not baked into this repo. It is a private github repo linked [here](https://github.com/gouravkhator/guddu-collection-products-upload).
  - In future, I might add this into guddu-collection repo itself, whilst also adding admin and normal user role-based access and authorization.
