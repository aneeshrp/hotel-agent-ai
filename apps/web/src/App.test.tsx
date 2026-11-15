import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('disables submit until a request is typed, then shows it', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Find a hotel' });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText('What are you looking for?'), {
      target: { value: 'Double room in York' },
    });
    fireEvent.click(button);

    expect(screen.getByRole('status')).toHaveTextContent('Double room in York');
  });
});
