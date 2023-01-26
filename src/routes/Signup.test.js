import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Signup } from './Signup';

const alert = { severity: 'warning', message: 'this is a message'}

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Signup alert={alert}/>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Signup alert={alert}/>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});