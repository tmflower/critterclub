# Project Proposal 
## Critter Club: A Science Learning App for Kids
#### What tech stack will you use for your final project?
React-Node-Postgres
#### Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?
Full-stack
#### Will this be a website? A mobile app? Something else?
A website designed with a mobile-first approach
#### What goal will your project be designed to achieve?
To help students learn science content in a fun and engaging way
#### What kind of users will visit your app? In other words, what is the demographic of your users?
Students in grades 2-5
#### What data do you plan on using? How are you planning on collecting your data?
- Animal data (except photos) will come from [Animals API](https://api-ninjas.com/api/animals)
- Animal photos will come from [Unsplash API](https://unsplash.com/developers)
#### What does your database schema look like?
![db_schema](https://user-images.githubusercontent.com/94068349/200149831-0f11f2ad-2453-4a71-85c2-ee177bd1b8c6.jpg)

#### What kinds of issues might you run into with your API?
- For the Animals API:
    - There is only one endpoint for each animal
    - The keys are not consistent within the data
- For the Unsplash API:
    - I would like to have some control over selecting a photo from the results of a dynamic search and I'm not sure how to achieve this
#### Is there any sensitive information you need to secure?
Each user will have a username and password that will be stored securely. I would also like to set up safe and child-friendly signup and login practices
#### What functionality will your app include?
The user will be able to:
- Create an account
- Log in and out
- Search for information about animals
- Play games requiring knowledge of animal classification, habitat, characteristics, etc.
- Collect cards for successful game play
- Earn badges and status based on the number of cards they collect
#### What will the user flow look like?
![userflow](https://user-images.githubusercontent.com/94068349/200150736-551c53db-be47-474c-aac3-cdd3a2549864.jpg)

#### What features make your site more than a CRUD app? What are your stretch goals?
- The interactive nature of a game takes it beyond being a basic CRUD app. Stretch goals include:
    -  Avatars that users can select from, scaled according to their player status level
    -  A chat feature where users can interact with each other
    -  Inclusion of a geolocation API so that the location data displays a map instead of just text
    -  A parent portal that allows parents to track student progress
    -  A teacher portal that allows teachers to track student progress
