import React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

import { TextCaption } from 'openland-web/utils/TextStyles';
import { FormField } from 'openland-form/useField';
import { getValidatedDate, isValidDate } from 'openland-y-utils/wallet/dateTime';

import { UInput, UInputErrorText } from './UInput';
import { USelect } from './USelect';

const inputErrorStyle = css`
    color: var(--tintRed);
    padding-left: 16px;
    margin-top: 8px;
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
    errorText?: string | null;
    onChange: (newValue: Date | null) => void;
}

export const UDateInputErrorText = React.memo((props: { text: string }) => (
    <div className={cx(inputErrorStyle, TextCaption)}>{props.text}</div>
));

export const UDateInput = React.memo(({ value, errorText, invalid, onChange }: UDateInputProps) => {
    const [day, setDay] = React.useState<string>();
    const [month, setMonth] = React.useState<SelectedMonth>();
    const [year, setYear] = React.useState<string>();

    React.useEffect(() => {
        if (!day && !month && !year) {
            onChange(null);
            return;
        }

        if (!day || !month || !year || year.length !== 4) {
            onChange(new Date('Invalid Date'));
            return;
        }

        onChange(getValidatedDate(Number(day), month.value, Number(year)));
    }, [day, month, year]);

    React.useEffect(() => {
        if (value && isValidDate(value)) {
            setDay(String(value!.getDate()));
            setMonth(OPTIONS[value!.getMonth()]);
            setYear(String(value!.getFullYear()));
        }
    }, [value]);

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
                    invalid={invalid}
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
                    invalid={invalid}
                />
                <UInput
                    value={year}
                    onChange={setYear}
                    maxLength={4}
                    invalid={invalid}
                    type="number"
                    label="Year"
                    width={128}
                />
            </XView>
            {!!errorText && <UInputErrorText text={errorText} />}
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
        errorText={field.input.errorText}
        value={field.value}
    />
));
