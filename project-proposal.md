# Project Proposal 
## Critter Club: A Science Learning App for Kids
#### What tech stack will you use for your final project?
Postgres-Express-React-Node
#### Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?
Full-stack
#### Will this be a website? A mobile app? Something else?
A website designed with a mobile-first approach
#### What goal will your project be designed to achieve?
To help students learn science content in a fun and engaging way
#### What kind of users will visit your app? In other words, what is the demographic of your users?
Students in grades 2-5
#### What data do you plan on using? How are you planning on collecting your data?
- Parent data (username, password, first name, last name, email) will come from form submission
- User data (username & password) will come from form submission, then build as users collect cards
- Basic animal data will come from [Animals API](https://api-ninjas.com/api/animals)
- Animal photos will come from [Unsplash API](https://unsplash.com/developers)
- Animal videos will come from [YouTube API](https://developers.google.com/youtube/v3)
#### What does your database schema look like?
![Screen Shot 2022-11-28 at 3 49 02 PM](https://user-images.githubusercontent.com/94068349/204418554-32f94664-7fb3-45f1-8e0a-d1a81f759082.png)

#### What kinds of issues might you run into with your API?
- For the Animals API:
    - There is only one endpoint for each animal
    - The keys are not consistent within the data
- For the Youtube API:
    - Search requests are costly against the quota limits; I'll need to figure out a way to stay within the quota while accessing the data I need
#### Is there any sensitive information you need to secure?
Each user will have a username and password that will be stored securely. I would also like to set up safe and child-friendly signup and login practices
#### What functionality will your app include?
A parent will be able to:
- Create an account
- Be informed about the app their child will be using
- Get an access code that will enable their child to create an account
The user will be able to:
- Create an account
- Log in and out
- Search for information about animals
- Answer questions about animals including classification, habitat, characteristics, etc.
- Collect cards for successfully answering questions
- Earn badges and status based on the number of cards they collect
#### What will the user flow look like?
![Screen Shot 2022-11-28 at 3 13 41 PM](https://user-images.githubusercontent.com/94068349/204414762-cd1bdcc4-63c2-4fba-b4f9-5156f0d1cb2b.png)

#### What features make your site more than a CRUD app? What are your stretch goals?
- The interactive nature of the challenges and the opportunity to earn cards takes it beyond being a basic CRUD app. Stretch goals include:
    -  Avatars that users can select from, scaled according to their player status level
    -  A feedback feature where users can interact with each other in a safe and positive way (i.e. thumbs up, "great game", etc.)
    -  Inclusion of a geolocation API so that the animal habitat data displays a map instead of just text
    -  A parent portal that allows parents to check their child's progress
    -  A teacher portal that allows teachers to track student progress
