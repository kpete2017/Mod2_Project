RECOMMEND IT!
========================
A web application that allows a user to add various media (Music Artists, Televison Shows, Movies, Books and Video Games) to thier profile and get recommendations based on those selections.

This application is built using Rails 6.0 on the backend and HTML, CSS, and JavaScript on the frontend.

It also uses and api called tastedive (https://tastedive.com/read/api) to create the recommendations for each favoirted media selection.

We have pre-seed the database with two users (Kyle and Will - creators) and a few of our favorite media queries.  

This application was developed for Flatiron School's Module 2 Project. 

HOW TO GET STARTED
========================
1) Clone this repository

2) In your terminal cd into the Backend directory

3) `bundle install` the gems required to load this app

4) `bundle exec Figaro` which creates an application.yml where you insert your tatedive api key

5) `rails db:create` to create the database

6) `rails db:migrate` to create the necessary tables in the database

7) `rails db:seed` to seed the database with some users and media queries

8) `rails s` to run the database's server on port 3000

9) In a separate terminal cd into the frontend directory 

10) `npm i lite-server` to install lite-server

11) `lite-server` to run the frontend on port 3001

12) Then use the window that appears and have fun with the app!

CREATORS
========================
Kyle Petersen: http://github.com/kpete2017

Will Reeves: http://github.com/WRHR
