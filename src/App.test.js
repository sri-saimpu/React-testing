import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/testing/i);
  expect(linkElement).toBeInTheDocument();
}); //to check if certain data is wrapped inside html control

test("render login component in the document", () => {
  const component = render(<App />);
  const children = component.getByLabelText("Email");
  expect(children).toBeTruthy();
});


