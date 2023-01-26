import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Video } from './Video';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Video animalName="Hippopotamus"/>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Video animalName="Hippopotamus"/>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});