// import * as React from 'react';
import { useTranslation as useTranslationLib, Trans, } from 'react-i18next';
import i18next, { TFunction } from 'i18next';
// import { LocalizedResources, LocalizedPluralsResources } from './schema.ts';

export type TFn = TFunction;

export const useText = () => {
    const { t: tLib, i18n, } = useTranslationLib();

    return {
        t: tLib,
        Trans,
        lang: i18n.language,
        changeLanguage: async (lng: string) => {
            return await i18n.changeLanguage(lng);
        }
    };
};

export const t = i18next.t.bind(i18next);

export const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);

export const lowercase = (s: string) => s.toLowerCase();
// export function t(source: any, options?: any): string {
//     return i18n.t(source, options);
// }

// export function tStyled(source: any, options?: any): any {
//     return (
//         <Trans
//             i18nKey={source}
//             t={t}
//             values={options}
//         />
//     );
// }

// export function p(source: any, count: number, options?: any): string {
//     return i18n.t(source, { ...options, count });
// }

// export function pStyled(source: any, count: number, options?: any): any {
//     return (
//         <Trans
//             i18nKey={source}
//             t={t}
//             values={{ ...options, count }}
//             components={{ strong }}
//         />
//     )
// }