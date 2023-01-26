import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Browse } from './Browse';
import sampleAnimals from '../assets/sampleAnimals';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Browse allAnimals={sampleAnimals}/>   
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
  
    const { asFragment } = render(
      <MemoryRouter>
        <Browse allAnimals={sampleAnimals}/>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});