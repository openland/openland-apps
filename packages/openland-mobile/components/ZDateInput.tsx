import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { getValidatedDate, isValidDate } from 'openland-y-utils/wallet/dateTime';
import { FormField } from 'openland-form/useField';

import { ZInput } from './ZInput';
import { ZSelect } from './ZSelect';
import { TextStyles } from '../styles/AppStyles';
import { ThemeContext } from '../themes/ThemeContext';

const styles = StyleSheet.create({
    errorContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    } as ViewStyle,
    error: {
        ...TextStyles.Caption,
    } as TextStyle,
});

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

export interface ZDateInputProps {
    value: Date | null;
    invalid?: boolean;
    noWrapper?: boolean;
    errorText?: string | null;
    onChange: (newValue: Date | null) => void;
}

export const ZDateInput = React.memo((props: ZDateInputProps) => {
    const theme = React.useContext(ThemeContext);
    const [day, setDay] = React.useState<string>();
    const [month, setMonth] = React.useState<SelectedMonth>();
    const [year, setYear] = React.useState<string>();
    const { value, noWrapper, errorText, invalid, onChange } = props;

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
        <React.Suspense fallback={null}>
            <View flexDirection="row" marginHorizontal={noWrapper ? 0 : 16}>
                <View flexShrink={0} marginRight={16} minWidth={72}>
                    <ZInput
                        placeholder="Day"
                        keyboardType="numeric"
                        value={day}
                        invalid={invalid}
                        maxLength={2}
                        noWrapper={true}
                        onChangeText={setDay}
                    />
                </View>
                <View flexGrow={1}>
                    <ZSelect
                        label="Month"
                        options={OPTIONS}
                        value={month?.value}
                        invalid={invalid}
                        noWrapper={true}
                        onChange={(val) => setMonth(val as SelectedMonth)}
                    />
                </View>
                <View flexShrink={0} marginLeft={16} minWidth={90}>
                    <ZInput
                        placeholder="Year"
                        keyboardType="decimal-pad"
                        value={year}
                        invalid={invalid}
                        noWrapper={true}
                        maxLength={4}
                        onChangeText={setYear}
                    />
                </View>
            </View>
            {!!errorText && (
                <View style={styles.errorContainer}>
                    <Text
                        style={[
                            styles.error,
                            { color: invalid ? theme.accentNegative : theme.foregroundSecondary },
                        ]}
                        allowFontScaling={false}
                    >
                        {errorText}
                    </Text>
                </View>
            )}
        </React.Suspense>
    );
});

interface ZDateInputFieldProps {
    field: FormField<Date | null>;
}

export const ZDateInputField = React.memo(({ field, ...other }: ZDateInputFieldProps) => (
    <ZDateInput
        {...other}
        value={field.input.value}
        invalid={field.input.invalid}
        onChange={field.input.onChange}
        errorText={field.input.errorText}
    />
));
