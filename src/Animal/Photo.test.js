import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Photo } from './Photo';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Photo animalName="Hippopotamus"/>
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
        <MemoryRouter>
        <Photo animalName="Hippopotamus"/>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});