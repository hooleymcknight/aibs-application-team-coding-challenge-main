import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import clamp from 'lodash/clamp';
import round from 'lodash/round';
import isNaN from 'lodash/isNaN';

import { validFloatInput } from '../../../../utils';

export interface NumericTextFieldProps {
    label: string;
    value: number;
    minRange: number;
    maxRange: number;
    onUpdate: (value: number) => void;
}

export const NumericTextField = ({ label, value, minRange, maxRange, onUpdate }: NumericTextFieldProps) => {
    const [inputValue, setInputValue] = useState<string>(String(value));

    const validateValue = useCallback(
        (nextInputValue: string, update = true) => {
            const numericValue = parseFloat(nextInputValue);

            if (isNaN(numericValue)) {
                setInputValue(String(value));
            } else {
                const clampedValue = clamp(numericValue, minRange, maxRange);
                const validatedValue = round(clampedValue, 3);

                setInputValue(String(validatedValue));

                if (update) {
                    onUpdate(validatedValue);
                }
            }
        },
        [minRange, maxRange, value, onUpdate]
    );

    useEffect(() => {
        validateValue(String(value), false);
    }, [value, validateValue]);

    const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((event) => {
        const input = event.target.value;
        const validInput = validFloatInput(input);
        setInputValue(validInput);
    }, []);

    const onKeyPress = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (event.key === 'Enter') {
                validateValue(inputValue);
                event.preventDefault();
            }
        },
        [validateValue, inputValue]
    );

    const onBlur = useCallback<React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>>(() => {
        validateValue(inputValue);
    }, [validateValue, inputValue]);

    return (
        <TextField
            label={label}
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
            variant="outlined"
        />
    );
};
