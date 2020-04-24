import { Platform, Linking, Clipboard } from 'react-native';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Toast from 'openland-mobile/components/Toast';

export const openCalendar = (date: string) => {
    return async () => {
        const loader = Toast.loader();
        loader.show();

        if (Platform.OS === 'ios') {
            const referenceDate = new Date('2001-01-01');
            const secondsSinceRefDate = (parseInt(date, 10) - referenceDate.valueOf()) / 1000;

            await Linking.openURL('calshow:' + secondsSinceRefDate);
        } else if (Platform.OS === 'android') {
            await Linking.openURL('content://com.android.calendar/time/' + date);
        }

        loader.hide();
    };
};

export const openCalendarContextMenu = (date: string, text: string) => {
    let builder = new ActionSheetBuilder();

    builder.action('Copy', () => Clipboard.setString(text), false, require('assets/ic-copy-24.png'));
    builder.action('Open in Calendar', openCalendar(date), false, require('assets/ic-calendar-24.png'));

    builder.show();
};