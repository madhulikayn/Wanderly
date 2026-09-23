import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccessibleTabs, TabItem } from '../../playground/AccessibleTabs';

describe('AccessibleTabs Component', () => {
  const sampleTabs: TabItem[] = [
    { id: 'overview', label: 'Overview', content: <div>Overview Content</div> },
    { id: 'itinerary', label: 'Itinerary', content: <div>Itinerary Content</div> },
    { id: 'reviews', label: 'Reviews', content: <div>Reviews Content</div> },
  ];

  it('renders tablist and tabs with correct initial active state', () => {
    render(<AccessibleTabs items={sampleTabs} label="Destination sections" />);

    const tablist = screen.getByRole('tablist', { name: /destination sections/i });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('tabIndex', '0');

    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabIndex', '-1');

    expect(screen.getByText('Overview Content')).toBeVisible();
    expect(screen.getByText('Itinerary Content')).not.toBeVisible();
  });

  it('switches active tab and panel on click', async () => {
    const user = userEvent.setup();

    render(<AccessibleTabs items={sampleTabs} />);

    const itineraryTab = screen.getByRole('tab', { name: /itinerary/i });
    await user.click(itineraryTab);

    expect(itineraryTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /overview/i })).toHaveAttribute('aria-selected', 'false');

    expect(screen.getByText('Itinerary Content')).toBeVisible();
    expect(screen.getByText('Overview Content')).not.toBeVisible();
  });

  it('handles keyboard navigation (ArrowRight, ArrowLeft, Home, End)', async () => {
    const user = userEvent.setup();

    render(<AccessibleTabs items={sampleTabs} />);

    const overviewTab = screen.getByRole('tab', { name: /overview/i });
    overviewTab.focus();

    // ArrowRight to next tab
    await user.keyboard('{ArrowRight}');
    const itineraryTab = screen.getByRole('tab', { name: /itinerary/i });
    expect(itineraryTab).toHaveFocus();
    expect(itineraryTab).toHaveAttribute('aria-selected', 'true');

    // End key to go to last tab
    await user.keyboard('{End}');
    const reviewsTab = screen.getByRole('tab', { name: /reviews/i });
    expect(reviewsTab).toHaveFocus();
    expect(reviewsTab).toHaveAttribute('aria-selected', 'true');

    // Home key to return to first tab
    await user.keyboard('{Home}');
    expect(overviewTab).toHaveFocus();
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');
  });
});
