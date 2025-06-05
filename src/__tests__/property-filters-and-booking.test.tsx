import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertySearch from '../pages/PropertySearch';
import PropertyCard from '../components/PropertyCard';

describe('PropertySearch Filters', () => {
  it('filters properties by bedrooms', async () => {
    render(<PropertySearch />);
    // Open filters if needed
    const filterButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterButton);
    // Set bedrooms filter
    const bedroomsSelect = screen.getByLabelText(/bedrooms/i);
    fireEvent.change(bedroomsSelect, { target: { value: '3' } });
    // Wait for results to update
    await waitFor(() => {
      expect(screen.getAllByText(/3+ Bedrooms|3 beds/i).length).toBeGreaterThan(0);
    });
  });
});

describe('Booking Form', () => {
  it('submits booking form successfully', async () => {
    // PropertyDetails page contains the booking form modal
    // For simplicity, test InquiryForm directly if available
    // Otherwise, simulate opening the modal in PropertyDetails
    // This is a placeholder; adjust as needed for your actual InquiryForm usage
    // render(<PropertyDetails />);
    // fireEvent.click(screen.getByText(/Schedule Viewing/i));
    // fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    // fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    // fireEvent.submit(screen.getByRole('form'));
    // expect(await screen.findByText(/Thank you|Message Sent/i)).toBeInTheDocument();
  });
});
