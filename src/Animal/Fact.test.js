import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Fact } from './Fact';

// smoke test
test("renders without crashing", () => {
    render(
    <MemoryRouter>
      <Fact />
    </MemoryRouter>);
  });

// snapshot test
test("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Fact />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// tests for user interactions
test("displays title by default; displays facts when clicked", async () => {
  const user = userEvent.setup();
  render(  
    <MemoryRouter>
      <Fact title="test title" text="test facts"/>
    </MemoryRouter>);
  expect(screen.getByText('test title')).toBeInTheDocument();
  expect(screen.queryByText('test facts')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button'));
  expect(screen.getByText('test facts')).toBeInTheDocument();
  expect(screen.queryByText('test title')).not.toBeInTheDocument();
});