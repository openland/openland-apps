import { Platform, Linking, Clipboard } from 'react-native';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';

export const openCalendar = (date: string) => {
    return async () => {
        startLoader();

        if (Platform.OS === 'ios') {
            const referenceDate = new Date('2001-01-01');
            const secondsSinceRefDate = (parseInt(date, 10) - referenceDate.valueOf()) / 1000;

            await Linking.openURL('calshow:' + secondsSinceRefDate);
        } else if (Platform.OS === 'android') {
            await Linking.openURL('content://com.android.calendar/time/' + date);
        }

        stopLoader();
    }
}

export const openCalendarContextMenu = (date: string, text: string) => {
    let builder = new ActionSheetBuilder();

    builder.action('Copy', () => Clipboard.setString(text));
    builder.action('Open in Calendar', openCalendar(date));

    builder.show();
}