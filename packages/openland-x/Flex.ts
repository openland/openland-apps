import { XStyledCSS } from './XStyled';

export interface XFlexStyles {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    width?: number;
    height?: number;
    minHeight?: number;
    minWidth?: number;
    zIndex?: number;
}

export const applyFlex = (props: XFlexStyles) => ({
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    alignSelf: props.alignSelf,
    width: props.width,
    height: props.height,
    zIndex: props.zIndex,
    minWidth: props.minWidth,
    minHeight: props.minHeight
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