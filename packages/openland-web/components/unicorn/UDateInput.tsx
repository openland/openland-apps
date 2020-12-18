import React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

import { TextBody, TextCaption } from 'openland-web/utils/TextStyles';
import { FormField } from 'openland-form/useField';
import { EMPTY_YEAR, getValidatedDate, isValidDate } from 'openland-y-utils/wallet/dateTime';

import ClearIcon from 'openland-icons/s/ic-delete-16.svg';

import { UInput } from './UInput';
import { USelect } from './USelect';

const inputErrorStyle = css`
    color: var(--tintRed);
    padding-left: 16px;
    margin-top: 8px;
`;

const clearButtonStyle = css`
  display: flex;
  align-items: center;
  position: absolute;
  top: 13px;
  opacity: 1;
  right: 0;
  color: var(--foregroundTertiary);
  cursor: pointer;
  transition: opacity 200ms;
  
  &:hover {
    opacity: 0.64;
  }
`;

const clearIconStyle = css`
  margin-right: 8px;      
        
  path {
    fill: var(--foregroundTertiary);
  }
`;

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const OPTIONS: SelectedMonth[] = MONTHS.map((item, index) => ({ value: index, label: item }));

type SelectedMonth = { value: number; label: string };

interface UDateInputProps {
    value: Date | null;
    invalid?: boolean;
    onChange: (newValue: Date | null) => void;
}

export const UDateInputErrorText = React.memo((props: { text: string }) => (
    <div className={cx(inputErrorStyle, TextCaption)}>{props.text}</div>
));

export const UDateInput = React.memo(({ value, invalid, onChange }: UDateInputProps) => {
    const [day, setDay] = React.useState<string>();
    const [month, setMonth] = React.useState<SelectedMonth | null>();
    const [year, setYear] = React.useState<string>();

    React.useEffect(() => {
        if (!day && !month && !year) {
            onChange(null);
            return;
        }

        if (!day || !month || (year && year.length < 4)) {
            onChange(new Date('Invalid Date'));
            return;
        }

        onChange(getValidatedDate(Number(day), month.value, Number(year || EMPTY_YEAR)));
    }, [day, month, year]);

    React.useEffect(() => {
        if (value && isValidDate(value)) {
            const fullYear = value.getFullYear() === EMPTY_YEAR ? undefined : String(value.getFullYear());

            setDay(String(value.getDate()));
            setMonth(OPTIONS[value.getMonth()]);
            setYear(fullYear);
        }
    }, [value]);

    const onClear = React.useCallback(() => {
        setDay('');
        setMonth(null);
        setYear('');
    }, []);
    
    const getInvalid = React.useCallback((field: 'day' | 'month' | 'year'): boolean => {
        if (field === 'day') {
            return Boolean(invalid && (month || Number(day) > 31));
        } else if (field === 'month') {
            return Boolean(invalid && day);
        } else {
            return Boolean(invalid && year);
        }
    }, [invalid, day, month, year]);

    const errorText = React.useMemo(() => {
        if (!day && month) {
            return 'Please enter day';
        }

        if (!month && day) {
            return 'Please select month';
        }

        return 'Please enter valid date';
    }, [day, month, year]);

    return (
        <>
            <XView flexDirection="row" alignItems="center" justifyContent="space-between">
                <UInput
                    label="Day"
                    type="number"
                    width={96}
                    value={day}
                    maxLength={2}
                    onChange={setDay}
                    invalid={getInvalid('day')}
                />
                <USelect
                    onChange={(val) => setMonth(val as SelectedMonth)}
                    options={OPTIONS}
                    multi={false}
                    label="Month"
                    width="100%"
                    flexShrink={1}
                    marginHorizontal={16}
                    value={month}
                    invalid={getInvalid('month')}
                />
                <UInput
                    value={year}
                    onChange={setYear}
                    maxLength={4}
                    invalid={getInvalid('year')}
                    type="number"
                    label="Year"
                    width={128}
                />
            </XView>
            {value && (
                <div className={cx(TextBody, clearButtonStyle)} onClick={onClear}>
                    <ClearIcon className={clearIconStyle} />
                    Clear
                </div>
            )}
            {!!invalid && <UDateInputErrorText text={errorText} />}
        </>
    );
});

interface UDateInputFieldProps {
    field: FormField<Date | null>;
}

export const UDateInputField = React.memo(({ field, ...other }: UDateInputFieldProps) => (
    <UDateInput
        {...other}
        invalid={field.input.invalid}
        onChange={field.input.onChange}
        value={field.value}
    />
));
