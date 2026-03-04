import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdvancedCalculator from './AdvancedCalculator';

// Mock Recharts to avoid issues in JSDOM
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => (
            <div style={{ width: '800px', height: '400px' }}>{children}</div>
        ),
    };
});

describe('AdvancedCalculator Component', () => {
    it('renders the calculator title correctly', () => {
        render(<AdvancedCalculator />);
        const title = screen.getByText(/כמה כסף מחכה לכם/i);
        expect(title).toBeInTheDocument();
    });

    it('updates total balance when monthly deposit is changed', () => {
        render(<AdvancedCalculator />);

        // Find the total balance amount by its label
        const totalBalanceLabel = screen.getByText(/סכום סופי/i);
        const initialValue = totalBalanceLabel.nextElementSibling.textContent;

        // Find the monthly deposit slider
        const monthlySlider = screen.getAllByRole('slider')[1]; // second slider is monthly

        // Change monthly deposit to 5000
        fireEvent.change(monthlySlider, { target: { value: '5000' } });

        const newValue = totalBalanceLabel.nextElementSibling.textContent;
        expect(newValue).not.toBe(initialValue);
    });

    it('displays the profit correctly', () => {
        render(<AdvancedCalculator />);
        const profitLabel = screen.getByText(/רווח מהשקעה/i);
        expect(profitLabel).toBeInTheDocument();

        // Find profit value next to the label
        const profitValue = profitLabel.nextElementSibling;
        expect(profitValue.textContent).toContain('₪');
    });
});
