import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/ru';
import { en } from 'openland-mobile/text/extractedLangs/en';
import { ru } from 'openland-mobile/text/extractedLangs/ru';
import { getLocale } from './utils';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: __DEV__,
        interpolation: {
            escapeValue: false,
        },
        lng: getLocale(),
        // lng: 'en',
        resources: {
            en: {
                translation: en
            },
            ru: {
                translation: ru
            }
        },
        react: {
            transSupportBasicHtmlNodes: true,
        }
    });

moment.locale(getLocale());
i18n.on('languageChanged', lng => moment.locale(lng));
