# Movie Recommender

## Overview
This Movie Recommender app, is an app that is designed to take in a Movie or TV Series and return either Movies or TV Shows that are similar to the input. This is built around a principle of community influence and impact as it relies mainly on the inputs of users. It allows an every growing database where users are able to add their favorite movies and TV Shows while leaving ratings that both let other users know what each Movie or Series is like as well as assisiting the similar movie searches to be more accurate, and have them be more user reccomendation based.

## Project Architecture
### Front-End
- Technologies Used: HTML, CSS, Java Script, Font_Awesome Icons Library
- Files: 
  - src/index.html
    - The main html file that holds all of the html used in the application
  - src/main.css
    - The main css file that holds all of the css used in the application
  - src/main.js
    - The main javascript file that holds the majority of the front end logic including mostly event listeners as well as calls to movieInfo.js, also where the local storage calls are made 
  - src/movieInfo.js 
    - The javascript file that hosts all of the connections from the front-end to the backend that uses the fetch API to get information from the backend
  - src/types.js
    - The javascript file that holds the important MovieInfo and Rating types that are used to organize the information that will be later put in the database

### Back-End
- Technologies Used: Javascript, Express
- Files:
  - server/index.js
    - The javascript file that uses Express to handle the fetch calls for the CRUD operations and makes calls to get database.js to get and store the needed information
  - server/database.js
    - The javascript file that stores the fucntions that make calls to the database. This does all of the CRUD operations to the database as well as doing sorting for returned movie arrays as well as stores the fucntion CompareAllMovie() which is how the similarity search is calculated.

### Database
- Technologies Used: MongoDB
- Overview:
  - This database is hosted on MongoDB where it stores all of the information used by the web application in a format that is an object with an ObjID, information and ratings. Where information stores all of the movie details like title, genres, cast, etc. and the ratings is an array of all of the ratings objects 

## Getting Started
### Installation
Steps to install:
1. Download the files
2. Database Connection should already be set up
3. Run the command 'npm start'
4. In a browser search 'localhost:3000'
5. All Set to Start Using!

## Usage
How to use:
### Searching
1. In the Search Bar, type in the name of a TV Series or Movie you like and want to find a similar Series or Movie to
2. Select whether you would like to find Similar TV Series or Movies 
3. Press Search to begin the search
4. (On Success) A Display similar Movies or Series will pop up
4. (On Failure) A notification that the search is not in the database will pop up
5. (On Success) Click on whatever movie you want to look at and the information will pop up!
5. (On Failure) Either try a new search or add the Movie or Series to grow the database and search it again, this time it will be a success

### Adding Movies or Series
1. Press on the Add Movie or Series Button in the Explore Section
2. Select as a Movie or TV Series and fill out the form with your information
3. Press Submit and you will be notified it is added!

### Editing Movies
1. If you notice incorrect info or want to make changes, press the Edit button in the information section
2. Select what field you would like to edit, then insert your desired change
3. Press Submit and it will be changed!

### Deleting Movies
1. **Warning** This is implemented for everyone but ideally it would be an admin only
2. Press the trash can symbol
3. Press either confirm or cancel
4. If confirmed it will be deleted :/

### Adding Reviews
1. While in a Movie or TV Series press the Add Rating button
2. Fill out the number of stars, and leave a review, and add some tags to help the similarity calculator
3. Press Submit and you are all set!

### Your Saved List
1. While in a movie press on the heart to add a movie to your list
2. To check your list press on the profile button in the top right and select My List
3. Your list will get rendered on the display for you to view


## Key Features
- Searching Movies and Series
  - This feature allows the user to find similar movies and series based on what they input. This calculates the similarity ratings based on a calculation that compares almost every aspect of the movie details such as actors, directors and genres for a based score, as well as using user provided tags in order to add to the similarity scores. This calculation will become more and more accurate as ratings are added to the Movies and Series as it will have more information to calculate based off of.
- Adding Movies and Series
  - The core of running this as a functioning application is the ability for the users to create and update the information that is in the database. Giving users the ability to add movies and series allows for a much wider and easier way to get information into the system as it is impossible for just me as the creator to enter all of the information myself. This is especially helpful for anyone looking for similar movies to a specific show or movie that might not be in the database already as they can add the shows themselves and then search the show. All of the similarity calculation is dynamic in order to allow new additions and changes to immediately take effect.
- Making Edits and Adding Ratings
  - While in a Movie or Series, users will have the option to either make changes to an entry or to add a rating for an entry. Both of these make updates to the database whether it be changing the information, or modifying the array of ratings in the database. These changes are important for the users as it allows them to help with the management of the user built database.
- Deleting Movies or Series
  - This is implemented for everyone currently but it hopefully will later be implemented to be an admin only feature that way any user can not just delete it
- Explore Options
  - If a user doesn't have an exact Movie or Series they want to look for similar movies, they can also use one of the many explore features as well. These features include a What's New function that returns the most recently released movies and tv series, a Feeling Lucky feature that gives a random movie or TV series to view, as well as a Genres list to look at any movies or TV Series that fall under a certain genre. The Popular feature is an additonal feature that is still in development that I will be implementing later on.
- My Profile and My List
  - This feature utilizes local storage in order to keep a users information for the web application. Currently the only implemented feature is the My List feature which stores a users saved movies and series between sessions so they can start a watchlist that they will be able to come back to whenever they want and it will be stored there. Two other features that are in development that I hope to later implement are other local storage features that will save a user name for the user as well as settings for the application that I hope to implement

