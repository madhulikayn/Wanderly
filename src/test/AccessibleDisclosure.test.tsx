import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccessibleDisclosure } from '../../playground/AccessibleDisclosure';

describe('AccessibleDisclosure Component', () => {
  it('renders trigger title and renders content in collapsed state by default', () => {
    render(
      <AccessibleDisclosure title="Flight Details">
        <p>Flight details content text</p>
      </AccessibleDisclosure>
    );

    const button = screen.getByRole('button', { name: /flight details/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');

    const contentRegion = screen.getByRole('region', { hidden: true });
    expect(contentRegion).toBeInTheDocument();
    expect(contentRegion).toHaveAttribute('hidden');
  });

  it('renders in expanded state when defaultExpanded is true', () => {
    render(
      <AccessibleDisclosure title="Hotel Reservation" defaultExpanded={true}>
        <p>Hotel confirmation code #12345</p>
      </AccessibleDisclosure>
    );

    const button = screen.getByRole('button', { name: /hotel reservation/i });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    const contentRegion = screen.getByRole('region');
    expect(contentRegion).not.toHaveAttribute('hidden');
    expect(screen.getByText('Hotel confirmation code #12345')).toBeVisible();
  });

  it('toggles expanded state and updates aria-expanded on user click', async () => {
    const user = userEvent.setup();

    render(
      <AccessibleDisclosure title="Packing List">
        <p>Passport, sunscreen, camera</p>
      </AccessibleDisclosure>
    );

    const button = screen.getByRole('button', { name: /packing list/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Passport, sunscreen, camera')).toBeVisible();

    // Click again to close
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('links trigger aria-controls to content panel id', () => {
    render(
      <AccessibleDisclosure title="Accessibility Check">
        <p>Panel content</p>
      </AccessibleDisclosure>
    );

    const button = screen.getByRole('button', { name: /accessibility check/i });
    const contentRegion = screen.getByRole('region', { hidden: true });

    const ariaControls = button.getAttribute('aria-controls');
    const contentId = contentRegion.getAttribute('id');

    expect(ariaControls).toBeTruthy();
    expect(ariaControls).toBe(contentId);
  });
});
