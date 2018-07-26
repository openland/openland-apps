import { isAndroid } from './isAndroid';
import { Text } from 'react-native';

let robotoFamilies = {
    '100': 'Roboto-Thin',
    '300': 'Roboto-Light',
    '400': 'Roboto-Regular',
    '500': 'Roboto-Medium',
    '700': 'Roboto-Bold',
    '900': 'Roboto-Black'
};

// let latoFamilies = {
//     '100': 'Lato-Hairline',
//     '400': 'Lato-Regular',
// };

if (isAndroid) {
    let findFonts: (src: any) => any = (src: any) => {
        if (Array.isArray(src)) {
            let ex = undefined;
            for (let s of src) {
                let f = findFonts(s);
                if (f) {
                    if (ex) {
                        ex = {
                            ...ex as any,
                            ...f
                        };
                    } else {
                        ex = f;
                    }
                }
            }
            return ex;
        }
        if (src && (src.fontFamily || src.fontWeight)) {
            return {
                fontFamily: src.fontFamily,
                fontWeight: src.fontWeight
            };
        }
        return undefined;
    };
    let patchStyles: (src: any) => any = (src: any) => {

        // Resolving current font
        let fonts = findFonts(src);
        let weight: string = '400';
        if (fonts) {
            if (fonts.fontFamily === 'sans-serif') {
                weight = '400';
            } else if (fonts.fontFamily) {
                return src;
            } else {
                if (fonts.fontWeight === 'normal') {
                    weight = '400';
                }
                if (fonts.fontWeight in robotoFamilies) {
                    weight = fonts.fontWeight;
                }
            }
        }

        // Building a patch
        let patchedStyle = {
            fontWeight: 'normal',
            fontFamily: robotoFamilies[weight],
            // color: 'magenta'
        };

        if (src) {
            return [src, patchedStyle];
        } else {
            return patchedStyle;
        }
    };

    // Mangling

    let sourceRender = (Text as any).render;
    (Text as any).render = function render(props: any, ref: any) {
        return sourceRender.apply(this, [{ ...props, style: patchStyles(props.style) }, ref]);
    };
}