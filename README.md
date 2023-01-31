# Critter Club
A kid-friendly web application for learning about animals, earning animal badges, and accumulating points to achieve higher status. 

## Table of Contents

- [Critter Club](#critter-club)
  - [Table of Contents](#table-of-contents)
  - [Live site](#live-site)
  - [Backend repo](#backend-repo)
  - [Introduction](#introduction)
  - [Technologies](#technologies)
  - [APIs](#apis)
  - [Launch Instructions](#launch-instructions)
  - [User Views](#user-views)
  - [About the Developer](#about-the-developer)

## Live site 

[🐞 🐸 🐷 Critter Club 🦉 🦊 🐙](https://critterclub.surge.sh)

To demo the site without setting up an account, you may use the demo account:
- username: SadieCat
- password: meow!345

## Backend repo

All backend code has been moved into its own repo located at:
[Critter Club Backend](https://github.com/tmflower/critterclub-backend)

## Introduction

Upon registering and logging in, the app welcomes the user to their personalized dashboard. The dashboard displays the user's current player level, determined by the number of points they've earned. Users will also see any badges they've earned, and options for viewing animal information by browsing, searching, or random selection.

Each animal informational page displays facts, videos, and photographs about the selected animal. Each page also offers the user the option to earn a badge for that animal and earn points toward leveling up by answering questions based on the facts provided. New users begin at the "Observer" level and attempt to earn their way up to "Zoologist". Users must register for an account and be logged in to access the app, and a parent account is required in order to register a user account.

## Technologies

- React 18.2.0
- Node 16.17.1
- Express 4.18.2
- Postgres 14
- MUI 5.11.2
  
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

<img src="/images/landing.png" width="400" alt="landing">

Signup page for parent:

<img src="/images/parent-page.png" width="400" alt="parent page">

User signup page:

<img src="/images/signup.png" width="400" alt="signup">

User login page:

<img src="/images/login.png" width="400" alt="signup">

Views for logged-in users:

- Dashboard:

<img src="/images/dashboard.png" width="400" alt="dashboard">

- Browse:

<img src="/images/browse.png" width="400" alt="browse">

- Search:

<img src="/images/search.png" width="400" alt="browse">

- Animal info before clicking on fact cards:

<img src="/images/animal-facts-closed.png" width="400" alt="animal page with facts closed">

- Animal info with facts showing (user can toggle fact to open or close):

<img src="/images/animal-facts-open.png" width="400" alt="animal pages with facts showing">

- Challenge questions:

<img src="/images/challenge.png" width="400" alt="challenge">

- Challenge after submitting:

<img src="/images/challenge-completed.png" width="400" alt="challenge completed">

Mobile views:

- Dashboard:

<img src="/images/dashboard-mobile.png" width="100" alt="dashboard mobile">

- Animal:
  
<img src="/images/animal-mobile.png" width="100" alt="animal mobile">

- Challenge:
<img src="/images/challenge-mobile.png" width="100" alt="challenge mobile">

## About the Developer

😊 Please visit my [portfolio](https://tmflower.github.io/portfolio2/#) for more examples of my work. 
