import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { isValidDate } from 'openland-y-utils/wallet/dateTime';
import { FormField } from 'openland-form/useField';

import { ZInput } from './ZInput';
import { ZSelect } from './ZSelect';
import { TextStyles } from '../styles/AppStyles';
import { ThemeContext } from '../themes/ThemeContext';

const styles = StyleSheet.create({
    errorContainer: {
        paddingHorizontal: 16,
        paddingTop: 8
    } as ViewStyle,
    error: {
        ...TextStyles.Caption
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

const OPTIONS: SelectedMonth[] = MONTHS.map((item, index) => ({ value: index + 1, label: item }));

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

        onChange(new Date(`${year}-${month.value}-${day}`));
    }, [day, month, year]);

    React.useEffect(() => {
        if (value && isValidDate(value)) {
            setDay(String(value!.getDate()));
            setMonth(OPTIONS[value!.getMonth()]);
            setYear(String(value!.getFullYear()));
        }
    }, [value]);

    return (
        <View>
            <View flexDirection="row" marginHorizontal={noWrapper ? 0 : 16}>
                <View flexShrink={0} marginRight={16} minWidth={72}>
                    <ZInput
                        placeholder="Day"
                        keyboardType="numeric"
                        value={day}
                        noWrapper={true}
                        onChangeText={setDay}
                    />
                </View>
                <View flexGrow={1}>
                    <ZSelect
                        label="Month"
                        options={OPTIONS}
                        value={month?.value}
                        noWrapper={true}
                        onChange={(val) => setMonth(val as SelectedMonth)}
                    />
                </View>
                <View flexShrink={0} marginLeft={16} minWidth={90}>
                    <ZInput
                        placeholder="Year"
                        keyboardType="decimal-pad"
                        value={year}
                        noWrapper={true}
                        onChangeText={setYear}
                    />
                </View>
            </View>
            {!!errorText && (
                <View style={styles.errorContainer}>
                    <Text style={[styles.error, { color: invalid ? theme.accentNegative : theme.foregroundSecondary }]} allowFontScaling={false}>
                        {errorText}
                    </Text>
                </View>
            )}
        </View>
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
