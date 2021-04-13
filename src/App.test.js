import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logo', () => {
  render(<App />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
