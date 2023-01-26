import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Badge } from './Badge';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Badge />
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Badge />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});