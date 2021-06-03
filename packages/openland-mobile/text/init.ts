import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import * as Localization from 'expo-localization';
import en from 'openland-mobile/text/extractedLangs/en.json';
// import ru from 'openland-mobile/text/extractedLangs/ru.json';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: __DEV__,
        interpolation: {
            escapeValue: false,
        },
        // lng: Localization.locale.startsWith('ru') ? 'ru' : 'en',
        lng: 'en',
        resources: {
            en: {
                translation: en
            },
            // ru: {
            //     translation: ru
            // }
        }
    });
