import * as React from 'react';
import { supportsAsyncRendering } from '../platform/config';
import { processColor } from 'react-native';

export function declareView<T>(name: string, fallback: React.ComponentType<T>, preprocessor?: (src: T) => any): React.ComponentType<T> {

    const realName = 'AS' + name.substring(0, 1).toUpperCase + name.substring(1);
    const Fallaback = fallback;

    // class ASView extends React.PureComponent<T> {
    //     static displayName = realName;
    //     render() {
    //         let { children, ...other } = this.props as any;
    //         if (supportsAsyncRendering) {
    //             let realProps = other;
    //             if (preprocessor) {
    //                 realProps = preprocessor(other);
    //             }
    //             if (name === 'text') {
    //                 return <asynctext {...realProps}>{children}</asynctext>;
    //             }

    //             realProps = {
    //                 ...realProps,
    //                 backgroundColor: realProps.backgroundColor ? processColor(realProps.backgroundColor) : undefined,
    //                 backgroundGradient: realProps.backgroundGradient ? {
    //                     start: processColor(realProps.backgroundGradient.start),
    //                     end: processColor(realProps.backgroundGradient.end)
    //                 } : undefined
    //             };

    //             return <asyncview asyncViewName={name} {...realProps}>{children}</asyncview>;
    //         } else {
    //             return (<Fallaback {...other}>{children}</Fallaback>);
    //         }
    //     }
    // }

    return (props: T) => {
        let { children, ...other } = props as any;
        if (supportsAsyncRendering) {
            let realProps = other;
            if (preprocessor) {
                realProps = preprocessor(other);
            }
            if (name === 'text') {
                return <asynctext {...realProps}>{children}</asynctext>;
            }

            realProps = {
                ...realProps,
                backgroundColor: realProps.backgroundColor ? processColor(realProps.backgroundColor) : undefined,
                backgroundGradient: realProps.backgroundGradient ? {
                    start: processColor(realProps.backgroundGradient.start),
                    end: processColor(realProps.backgroundGradient.end)
                } : undefined
            };

            return <asyncview asyncViewName={name} {...realProps}>{children}</asyncview>;
        } else {
            return (<Fallaback {...other}>{children}</Fallaback>);
        }
    };
}