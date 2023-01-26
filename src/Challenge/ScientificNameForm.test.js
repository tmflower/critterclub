import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScientificNameForm } from './ScientificNameForm';
import UserContext from '../userContext';
import userEvent from "@testing-library/user-event";


const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}

const message = {
  correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
  incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
};

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <ScientificNameForm
          commonName="Hippopotamus"
          message={message} />
      </UserContext.Provider>      
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={currentUser}>
          <ScientificNameForm
            commonName="Hippopotamus"
            message={message} />
        </UserContext.Provider>        
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});