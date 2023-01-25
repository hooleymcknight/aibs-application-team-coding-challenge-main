/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import React from 'react';

import { FilterColumnRange } from '../components/filter-column-range';
import { mockCategory, mockFilterCategoryState } from './filter-column-range.mock';

const filterColumnRangeMockProps = {
    category: mockCategory,
    filterCategoryCount: mockCategory,
    filterCategoryState: mockFilterCategoryState,
    handleSliderDrag: jest.fn(),
    title: '',
};

describe('FilterColumnRange', () => {
    test('renders sliders with min and max values', async () => {
        render(<FilterColumnRange {...filterColumnRangeMockProps} />);
        const sliderValues = filterColumnRangeMockProps.filterCategoryState.slider;
        const sliderMin = screen.getByRole('slider', { name: `${sliderValues.min}` });
        const sliderMax = screen.getByRole('slider', { name: `${sliderValues.min}` });

        expect(sliderMin).toBeDefined();
        expect(sliderMax).toBeDefined();
    });
    test('renders buttons for each item with correct values', async () => {
        render(<FilterColumnRange {...filterColumnRangeMockProps} />);

        const buttons = screen.getAllByRole('button', { hidden: true });
        const buttonOne = screen.getByRole('button', { name: `${filterColumnRangeMockProps.category.items[0].count}` });
        const buttonTwo = screen.getByRole('button', { name: `${filterColumnRangeMockProps.category.items[1].count}` });

        expect(buttons.length).toEqual(filterColumnRangeMockProps.category.items.length);
        expect(buttonOne).toBeDefined();
        expect(buttonTwo).toBeDefined();
    });
    test('displays min and max labels and textboxes', async () => {
        render(<FilterColumnRange {...filterColumnRangeMockProps} />);

        const minLabel = screen.queryByDisplayValue('Min');
        const maxLabel = screen.queryByDisplayValue('Max');

        const minTextbox = screen.getByDisplayValue(`${filterColumnRangeMockProps.filterCategoryState.slider.min}`);
        const maxTextbox = screen.getByDisplayValue(`${filterColumnRangeMockProps.filterCategoryState.slider.max}`);

        expect(minLabel).toBeDefined();
        expect(maxLabel).toBeDefined();
        expect(minTextbox).toBeDefined();
        expect(maxTextbox).toBeDefined();
    });
});
