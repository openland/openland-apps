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

    // Preprocessor
    let patchStyles = (src: any) => {
        if (src && !src.fontFamily && src.fontWeight) {
            if (src.fontWeight in robotoFamilies) {
                return {
                    ...src,
                    fontFamily: robotoFamilies[src.fontWeight],
                    fontWeight: 'normal'
                };
            }
            // if (src.fontWeight in latoFamilies) {
            //     return {
            //         ...src,
            //         fontFamily: latoFamilies[src.fontWeight],
            //         fontWeight: 'normal'
            //     };
            // }
            // return {
            //     ...src,
            //     fontFamily: 'American-Typewriter'
            // };
        }
        return src;
    };
    let recursivePatch: (src: any) => any = (src: any) => {
        if (!src) {
            return src;
        }
        if (Array.isArray(src)) {
            return src.map((v) => recursivePatch(v));
        }
        return patchStyles(src);
    };

    // Mangling

    let sourceRender = (Text as any).render;
    (Text as any).render = function render(props: any, ref: any) {
        return sourceRender.apply(this, [{ ...props, style: recursivePatch(props.style) }, ref]);
    };
}