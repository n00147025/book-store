This application is created using the MERN stack. A user can currently view all the books within the api, register and login. 
Once logged in the user can create, edit and delete books.
And a user can click on the title of a book to get a more detailed view.

A demo can be found hosted oh Heroku here: http://book-store42.herokuapp.com/

## Installation Instructions

Download or clone this repo.

Run ```npm i``` in the root directory and in the backend directory.

In backend run:

```npm run watch```

This will start the backend server.
In the root folder run:

```npm start```

This will start the front end.
Now the application is ready for use.

Open the root directory in a terminal (Git Bash) and the backend directory in a separate terminal window

In the ```/backend``` directory run the following to install and run the backend

- ```npm install```
- ```npm run watch```

In the root directory run the following to install and run the frontend

- ```npm install```
- ```npm start```

Go to ```http://localhost:4000/``` to test the backend (use a REST Client)

In Chrome, go to ```http://localhost:3000/``` to test the frontend

With the above setup you will be connected to the default MongoDB cluster on Atlas. To connect to your own cluster, modify the ```ATLAS_URI``` URI in ```/backend/.env``` to your cluster's URI
