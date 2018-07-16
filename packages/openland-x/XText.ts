import Glamorous from 'glamorous';
import XStyles from './XStyles';

export let XText = Glamorous.div<{
    textStyle?: 'h900' |
    'h800' |
    'h700' |
    'h600' |
    'h500' |
    'h400' |
    'h300' |
    'h200' |
    'h100' |
    'm500',
    opacity?: number,
    fontWeight?: number,
    letterSpacing?: number,
    color?: string,
    fontSize?: number,
    lineHeight?: number,
}>((props) => ({
    ...(props.textStyle === 'h900' ? XStyles.text.h900 :
        props.textStyle === 'h800' ? XStyles.text.h800 :
            props.textStyle === 'h700' ? XStyles.text.h700 :
                props.textStyle === 'h600' ? XStyles.text.h600 :
                    props.textStyle === 'h500' ? XStyles.text.h500 :
                        props.textStyle === 'h400' ? XStyles.text.h400 :
                            props.textStyle === 'h300' ? XStyles.text.h300 :
                                props.textStyle === 'h200' ? XStyles.text.h200 :
                                    props.textStyle === 'h100' ? XStyles.text.h100 :
                                        props.textStyle === 'm500' ? XStyles.text.m500 : XStyles.text.h400),
    opacity: props.opacity,
    fontWeight: props.fontWeight as any,
    letterSpacing: props.letterSpacing,
    color: props.color,
    lineHeight: props.lineHeight,
    fontSize: props.fontSize,
}));