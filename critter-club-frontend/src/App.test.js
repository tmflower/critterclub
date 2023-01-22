import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

// smoke test
test("renders without crashing", () => {
  render(
  <MemoryRouter>
    <App />
  </MemoryRouter>);
});

// snapshot test
test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});