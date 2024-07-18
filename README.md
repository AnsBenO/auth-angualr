# Angular JWT Authentication Demo

This project is a demo application built with Angular to explore and understand authentication using JSON Web Tokens (JWT) with a public API.

## API

https://realworld-docs.netlify.app/

## Features

User Authentication: Users can register and log in using a public API that issues JWTs for authentication. Upon successful login, a token is received and stored locally for managing session state and the user gains access to his user detail page. 

Guards: The application utilizes Angular guards to restrict access to authentication pages (login and register) for authenticated users. This ensures that logged-in users cannot navigate back to the login or register pages.

Interceptors: Angular interceptors are used to automatically include the JWT in the Authorization header of outgoing HTTP requests to protected API endpoints.
