import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './Search';
import sampleAnimals from '../assets/sampleAnimals';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Search allAnimals={sampleAnimals}/>     
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Search allAnimals={sampleAnimals}/>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});