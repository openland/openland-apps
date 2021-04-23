import React from 'react';
import { Image, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { EMPTY_YEAR, getValidatedDate, isValidDate } from 'openland-y-utils/wallet/dateTime';
import { FormField } from 'openland-form/useField';

import { ZInput } from './ZInput';
import { ZSelectBasic } from './ZSelect';
import { HighlightAlpha, TextStyles } from '../styles/AppStyles';
import { ThemeContext } from '../themes/ThemeContext';

const styles = StyleSheet.create({
    errorContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    } as ViewStyle,
    error: {
        ...TextStyles.Caption,
    } as TextStyle,
    box: {
        width: 80,
        height: 68,
        flexDirection: 'row',
        position: 'absolute',
        top: -57,
        right: 8,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    title: {
        ...TextStyles.Body,
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
    onChange: (newValue: Date | null) => void;
}

export const ZDateInput = React.memo((props: ZDateInputProps) => {
    const theme = React.useContext(ThemeContext);
    const [day, setDay] = React.useState<string>();
    const [month, setMonth] = React.useState<SelectedMonth | null>();
    const [year, setYear] = React.useState<string>();
    const { value, noWrapper, invalid, onChange } = props;

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
        <React.Suspense fallback={null}>
            <View style={{ flexDirection: 'row', marginHorizontal: noWrapper ? 0 : 16 }}>
                <View style={{ flexShrink: 0, marginRight: 16, minWidth: 72 }}>
                    <ZInput
                        placeholder="Day"
                        keyboardType="numeric"
                        value={day}
                        invalid={getInvalid('day')}
                        maxLength={2}
                        noWrapper={true}
                        onChangeText={setDay}
                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <ZSelectBasic
                        label="Month"
                        options={OPTIONS}
                        value={month?.value}
                        modalTitle="Month"
                        invalid={getInvalid('month')}
                        noWrapper={true}
                        onChange={(val: SelectedMonth) => setMonth(val)}
                    />
                </View>
                <View style={{ flexShrink: 0, marginLeft: 16, minWidth: 90 }}>
                    <ZInput
                        placeholder="Year"
                        keyboardType="decimal-pad"
                        value={year}
                        invalid={getInvalid('year')}
                        noWrapper={true}
                        maxLength={4}
                        onChangeText={setYear}
                    />
                </View>
            </View>
            {value && (
                <TouchableOpacity onPress={onClear} activeOpacity={HighlightAlpha} style={styles.box}>
                    <Image source={require('assets/ic-delete-16.png')} style={{ tintColor: theme.foregroundTertiary, marginRight: 8 }} />
                    <Text style={[{ color: theme.foregroundTertiary }, styles.title]} allowFontScaling={false}>
                        Clear
                    </Text>
                </TouchableOpacity>
            )}
            {!!invalid && (
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
    />
));
