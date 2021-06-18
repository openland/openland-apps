import { t } from 'openland-mobile/text/useText';
import { is24HourFormat } from 'openland-mobile/text/utils';
import { createDateTimeFormatter } from 'openland-y-utils/createDateTimeFormatter';

const DateTimeFormatter = createDateTimeFormatter({
    is24HourFormat: is24HourFormat(),
    today: t('dateTime.today'),
    yesterday: t('dateTime.yesterday'),
    nowStr: t('dateTime.now'),
    at: t('dateTime.at'),
    shortMinute: t('dateTime.shortMinute'),
    shortHour: t('dateTime.shortHour'),
    shortDay: t('dateTime.shortDay'),
    justNow: t('dateTime.justNow'),
    lastSeenYesterday: t('dateTime.lastSeenYesterday'),
    lastSeenTwoDays: t('dateTime.lastSeenTwoDays'),
    lastSeenLongTime: t('dateTime.lastSeenLongTime'),
    lastSeenDefault: t('dateTime.lastSeenDefault'),
    yearsOldShort: t('dateTime.yearsOldShort'),
});

export default DateTimeFormatter;