import { Platform, Linking, Clipboard } from 'react-native';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Toast from 'openland-mobile/components/Toast';

export const openCalendar = (date: string | number) => {
    return async () => {
        const loader = Toast.loader();
        loader.show();

        if (Platform.OS === 'ios') {
            const referenceDate = new Date('2001-01-01');
            const secondsSinceRefDate = ((typeof date === 'string' ? parseInt(date, 10) : date) - referenceDate.getTime()) / 1000;

            await Linking.openURL('calshow:' + secondsSinceRefDate);
        } else if (Platform.OS === 'android') {
            await Linking.openURL('content://com.android.calendar/time/' + date);
        }

        loader.hide();
    };
};

export const openCalendarContextMenu = (date: string, text: string) => {
    let builder = new ActionSheetBuilder();

    builder.action('Copy', () => {
        Clipboard.setString(text);
        Toast.showCopied();
    }, false, require('assets/ic-copy-24.png'));

    builder.action('Open in Calendar', openCalendar(date), false, require('assets/ic-calendar-24.png'));

    builder.show();
};