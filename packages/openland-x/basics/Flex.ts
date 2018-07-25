import { XStyledCSS } from './XStyled';

export interface XFlexStyles {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    // alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    justifyContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    width?: number | string;
    height?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    zIndex?: number;
    opacity?: number;
}

export const extractFlexProps = (props: XFlexStyles) => {
    return {
        justifyContent: props.justifyContent,
        alignSelf: props.alignSelf,
        flexGrow: props.flexGrow,
        flexShrink: props.flexShrink,
        flexBasis: props.flexBasis,
        width: props.width,
        height: props.height,
        minHeight: props.minHeight,
        minWidth: props.minWidth,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
        zIndex: props.zIndex,
        opacity: props.opacity
    } as XFlexStyles;
};

export const applyFlex = (props: XFlexStyles) => ({
    justifyContent: props.justifyContent,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    alignSelf: props.alignSelf,
    width: props.width,
    height: props.height,
    zIndex: props.zIndex,
    minWidth: props.minWidth,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    opacity: props.opacity
} as XStyledCSS);

// export function withLayout<TProps>(Wrapped: React.ComponentType<TProps>): React.ComponentType<TProps & XLayoutProps> {
//     let Converted = Glamorous<XLayoutProps & TProps>(
//         Wrapped,
//         {
//             filterProps: ['flexGrow', 'flexShrink', 'flexBasis', 'alignSelf'],
//             displayName: `WithLayout(${getComponentDisplayName(Wrapped)})`
//         })((props) => ({
//             flexGrow: props.flexGrow,
//             flexShrink: props.flexShrink,
//             flexBasis: props.flexBasis,
//             alignSelf: props.alignSelf,
//         })) as React.ComponentType<XLayoutProps & TProps>;
//     return function (props: TProps & XLayoutProps) {
//         return <Converted {...props} />;
//     };
// }