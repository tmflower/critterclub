import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Code } from './Code';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Code/>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Code />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});