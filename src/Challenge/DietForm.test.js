import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DietForm } from './DietForm';
import UserContext from '../userContext';
import userEvent from "@testing-library/user-event";

const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}

const message = {
  correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
  incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
};

const setPoints = () => {
  return;
}

const setNumQuestions = () => {
  return;
}

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <DietForm 
          commonName="Hippopotamus"
          message="some message"/>
      </UserContext.Provider>      
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={currentUser}>
          <DietForm 
            commonName="Hippopotamus"
            message="some message"/>
        </UserContext.Provider>        
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// tests for user interactions
test("user submits wrong answer", async () => {
  const user = userEvent.setup();
  const setPoints = () => {return}
  render(  
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <DietForm 
        commonName="Hippopotamus"
        message={message}
        diet="Herbivore"
        setPoints={setPoints}
        />
      </UserContext.Provider>      
    </MemoryRouter>);

  const wrong = screen.getByLabelText("Carnivore");
  expect(wrong).not.toBeChecked();
  await user.click(wrong);
  expect(wrong).toBeChecked();
  await user.click(screen.getByText("Check answer"));
  expect(screen.getByText("😧😧😧 Sorry, try again. 😧😧😧")).toBeInTheDocument(); 
});

test("user submits correct answer", async () => {
  const user = userEvent.setup();

  render(  
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <DietForm 
        commonName="Hippopotamus"
        message={message}
        diet="Herbivore"
        setPoints={setPoints}
        setNumQuestions={setNumQuestions}
        />
      </UserContext.Provider>      
    </MemoryRouter>);

  const right = screen.getByLabelText("Herbivore");
  expect(right).not.toBeChecked();
  await user.click(right);
  expect(right).toBeChecked();
  await user.click(screen.getByText("Check answer"));
  expect(screen.getByText("⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️")).toBeInTheDocument(); 
});