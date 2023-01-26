import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';

const alert = { severity: 'warning', message: 'this is a message'}

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Login alert={alert}/>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Login alert={alert}/>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});