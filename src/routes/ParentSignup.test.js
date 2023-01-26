import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ParentSignup } from './ParentSignup';

const alert = { severity: 'warning', message: 'this is a message'}
const setAlert = () => {return}

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <ParentSignup alert={alert} setAlert={setAlert}/>      
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ParentSignup alert={alert} setAlert={setAlert}/>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});