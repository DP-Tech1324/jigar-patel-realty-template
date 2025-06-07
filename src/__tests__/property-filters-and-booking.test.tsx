
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropertySearch from '../pages/PropertySearch';

// Test wrapper with necessary providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('PropertySearch Filters', () => {
  it('renders property search page', async () => {
    render(
      <TestWrapper>
        <PropertySearch />
      </TestWrapper>
    );
    
    expect(screen.getByText('Find Your Perfect Property')).toBeInTheDocument();
  });

  it('shows filters when filter button is clicked', async () => {
    render(
      <TestWrapper>
        <PropertySearch />
      </TestWrapper>
    );
    
    const filterButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterButton);
    
    await waitFor(() => {
      expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
    });
  });
});

describe('Booking Form', () => {
  it('contains CTA buttons for user engagement', async () => {
    render(
      <TestWrapper>
        <PropertySearch />
      </TestWrapper>
    );
    
    expect(screen.getByText('Schedule Consultation')).toBeInTheDocument();
    expect(screen.getByText('Get Home Valuation')).toBeInTheDocument();
  });
});
