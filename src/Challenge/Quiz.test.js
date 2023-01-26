import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';
import { Quiz } from './Quiz';
import UserContext from '../userContext';

// smoke test
test("renders without crashing", () => {
    const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}
    render(
    <MemoryRouter>
      <UserContext.Provider value={currentUser}>
        <Quiz 
          commonName="Hippopotamus"
          locations="some location"/>
      </UserContext.Provider>      
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
  const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={currentUser}>
          <Quiz 
            commonName="Hippopotamus"
            locations="some location"/>
        </UserContext.Provider>        
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// tests for user interactions

// test("changes from quiz view to animal info view when user clicks back button", async () => {
//   const currentUser = {user: { username: "Tiny", id: 1, password: 'abc123$%^', points: 40, userBadges: ['Koala', 'Jellyfish', 'Painted Turtle'], parentId: 1 }}
// const user = userEvent.setup();  
//   render(  
//     <MemoryRouter>
//       <UserContext.Provider value={currentUser}>
//         <Quiz 
//         commonName="Hippopotamus"
//         locations="some location"
//         />
//       </UserContext.Provider>      
//     </MemoryRouter>);
    
//   expect(screen.getByText('Take the HIPPOPOTAMUS challenge!')).toBeInTheDocument();
//   expect(screen.queryByText('Collecting your animal information!')).not.toBeInTheDocument();

//   await user.click(screen.getByText("Return to animal info"));

//   expect(screen.queryByText('Take the HIPPOPOTAMUS challenge!')).not.toBeInTheDocument();
//   expect(screen.getByText('Collecting your animal information!')).toBeInTheDocument();
// });