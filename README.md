# Critter Club
A kid-friendly web application for learning about animals, earning animal badges, and accumulating points to achieve higher status. 

## Table of Contents

- [Critter Club](#critter-club)
  - [Table of Contents](#table-of-contents)
  - [Live site](#live-site)
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [APIs](#apis)
  - [Launch Instructions](#launch-instructions)
  - [User Views](#user-views)
  - [About the Developer](#about-the-developer)

## Live site

Coming soon

## Introduction

The app provides an informational page including facts, videos, and photographs about each of 144 different animals. Users can search for an animal, browse all the animals, or get a randomly selected animal. Each animal page offers the user the option to earn a badge for that animal and earn points toward leveling up by answering questions based on the facts provided. New users begin at the "Observer" level and attempt to earn their way up to "Zoologist". Users must register for an account and be logged in to access the app, and a parent account is required in order to register a user account.

## Technologies

- React 18.2.0
- Node 16.17.1
- Express 4.18.2
- Postgres 14
- MUI 5.11.2
- 
## APIs

- [Animals API](https://api-ninjas.com/api/animals)
  - Used to access animal facts
- [Unsplash API](https://unsplash.com/documentation)
  - Used to access animal photos
- [Media API](https://github.com/tmflower/critter-club/blob/main/critter-club-backend/utils/media.js)
  - Used to access codes for requesting preselected, kid-friendly images and videos

## Launch Instructions

To install and run this project locally:
1. Install postgres.
2. Clone the repo: [critter-club](https://github.com/tmflower/critter-club.git)
3. Use [critter-club.sql](https://github.com/tmflower/critter-club/blob/main/critter-club-backend/critter-club.sql) to create and seed the database
4. Navigate into each directory for frontend and backend, and run npm start:
    - Backend runs on port 3001
    - Frontend runs on port 3000
5. To run tests: navigate into directory for frontend and backend, and run npm test

## User Views

Landing page seen by all visitors, whether logged in or not:

<img src="/images/landing.png" width="400">



Login and signup pages:

![parent signup page](/images/parent-page.png)
![signup page](/images/signup.png)
![login page](/images/login.png)


Logged in user views:

![dashboard](/images/dashboard.png)

![browse](/images/browse.png)

![search](/images/search.png)

![animal facts hidden](/images/animal-facts-closed.png)

![animal facts showing](/images/animal-facts-open.png)

![challenge](/images/challenge.png)

![challenge-completed](/images/challenge-completed.png)

Mobile views of dashboard, animal, and challenge:

![dashboard](/images/dashboard-mobile.png)

![animal](/images/animal-mobile.png)

![challenge](/images/challenge-mobile.png)


## About the Developer

😊 Please visit my [portfolio](https://tmflower.github.io/portfolio2/#) for more examples of my work. 
