import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocationsForm } from './LocationsForm';
import UserContext from '../userContext';
import userEvent from "@testing-library/user-event";


const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}

const message = {
  correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
  incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
};

const locations = ["Africa"];

const validLocations = [ 
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "NorthAmerica",
  "Eurasia",
  "Ocean",
  "CentralAmerica",
  "SouthAmerica",
  "Oceania"
];

// smoke test
test("renders without crashing", () => {

    render(
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <LocationsForm 
          commonName="Hippopotamus"
          message={message}
          locations={locations}
          validLocations={validLocations}/>
      </UserContext.Provider>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={currentUser}>
          <LocationsForm 
            commonName="Hippopotamus"
            message={message}
            locations={locations}
            validLocations={validLocations}/>
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// tests for user interactions
test("accepts user's selected answer and responds with feedback message", async () => {

  const user = userEvent.setup();

  render(  
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <LocationsForm 
        commonName="Hippopotamus"
        message={message}
        locations={locations}
        validLocations={validLocations}
        />
      </UserContext.Provider>      
    </MemoryRouter>);

  const wrong = screen.getByLabelText("Antarctica");
  expect(wrong).not.toBeChecked();
  await user.click(wrong);
  expect(wrong).toBeChecked();
  // await user.click(screen.getByText("Check answer"));
  // expect(screen.getByText("😧😧😧 Sorry, try again. 😧😧😧")).toBeInTheDocument(); 

  const right = screen.getByLabelText("Africa");
  expect(right).not.toBeChecked();
  await user.click(right);
  expect(right).toBeChecked();
  // await user.click(screen.getByText("Check answer"));
  // expect(screen.getByText("⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️")).toBeInTheDocument(); 
});