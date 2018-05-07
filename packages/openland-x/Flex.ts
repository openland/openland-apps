import  { CSSProperties } from 'glamorous';

export interface XFlexStyles {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
}

export const applyFlex = (props: XFlexStyles) => ({
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    flexBasis: props.flexBasis,
    alignSelf: props.alignSelf,
} as CSSProperties);

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