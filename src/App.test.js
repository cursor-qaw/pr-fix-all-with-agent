import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders to-do heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /to-do/i })).toBeInTheDocument();
});

test('test button logs message when clicked', async () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: /^test$/i }));

  expect(consoleSpy).toHaveBeenCalledWith("We're not in Kansas anymore");

  consoleSpy.mockRestore();
});

test('adds a task and shows it in the list', async () => {
  render(<App />);

  await userEvent.type(screen.getByPlaceholderText(/add a task/i), 'Buy milk');
  await userEvent.click(screen.getByRole('button', { name: /^add$/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});
