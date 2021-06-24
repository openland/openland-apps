import { useTranslation as useTranslationLib, Trans, } from 'react-i18next';
import i18next from 'i18next';
import { LocalizedResources, LocalizedPluralsResources } from './schema';

export type TFn = (key: LocalizedResources | LocalizedPluralsResources, ops?: any) => string;

export const useText = () => {
    const { t: tLib, i18n, } = useTranslationLib();

    return {
        t: (tLib as TFn),
        Trans,
        lang: i18n.language,
        changeLanguage: async (lng: string) => {
            return await i18n.changeLanguage(lng);
        }
    };
};

export const t = (i18next.t.bind(i18next) as TFn);

export const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);
