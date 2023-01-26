import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import userEvent from '@testing-library/user-event';
import UserContext from '../userContext';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// tests for conditional rendering based on user status
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    animalName: 'Hippopotamus',
  }),
}));

test("displays prompt to sign up for not logged in users", () => {
  const currentUser = null;
  const alert = {severity: "warning", message: "not logged in"}

  render(  
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <Dashboard alert={alert}/>
      </UserContext.Provider>      
    </MemoryRouter>);

  expect(screen.getByText('Sign up for a free account to earn badges and level up:')).toBeInTheDocument();
  expect(screen.queryByText('Hello, Tiny!')).not.toBeInTheDocument();
});

test("displays message for logged in users", () => {
  const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}
  const alert = {severity: "success", message: "logged in"}
  render(  
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <Dashboard alert={alert}/>
      </UserContext.Provider>      
    </MemoryRouter>);

expect(screen.getByText('Hello, Tiny!')).toBeInTheDocument();
expect(screen.queryByText('Sign up for a free account to earn badges and level up:')).not.toBeInTheDocument();
});