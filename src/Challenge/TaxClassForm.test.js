import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TaxClassForm } from './TaxClassForm';
import UserContext from '../userContext';

const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}

const setTaxClass = () => {
    return
}

const taxClass = "mammalia";

const message = {
    correct: "⭐️⭐️⭐️ You got it! ⭐️⭐️⭐️",
    incorrect: "😧😧😧 Sorry, try again. 😧😧😧"
  };

// smoke test
test("renders without crashing", () => {
  
    render(
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <TaxClassForm 
          commonName="Hippopotamus"
          setTaxClass={setTaxClass}
          taxClass={taxClass}
          message={message}/>
      </UserContext.Provider>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
  const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={currentUser}>
          <TaxClassForm
            commonName="Hippopotamus"
            setTaxClass={setTaxClass}
            taxClass={taxClass}
            message={message}/>
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});