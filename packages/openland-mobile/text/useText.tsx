// import * as React from 'react';
import { useTranslation as useTranslationLib } from 'react-i18next';
// import { LocalizedResources, LocalizedPluralsResources } from './schema.ts';

export const useText = () => {
    const { t, i18n } = useTranslationLib();

    return {
        t,
        changeLanguage: async (lng: string) => {
            return await i18n.changeLanguage(lng);
        }
    };
};

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
