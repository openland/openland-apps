import Glamorous from 'glamorous';

type Align = 'center' | 'start' | 'end' | 'stretch' | 'baseline';
type Direction = 'column' | 'row';
type Justify = 'center' | 'start' | 'end' | 'space-between';

type ForAlignConvertFunc = 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch' | undefined
type ForJustifyConvertFunc = 'center' | 'flex-start' | 'flex-end' | 'space-between' | undefined

interface XViewProps {
    alignSelf?: Align | null;
    alignItems?: Align | null;
    justifyContent?: Justify | null;
    direction?: Direction | null;
    childWhiteSpace?: boolean;
    grow?: number | null;
    shrink?: number | null;
}

function convertAlign(own: boolean, align?: Align | null): ForAlignConvertFunc {
    switch (align) {
        case 'center': {
            return 'center';
        }
        case 'start': {
            return 'flex-start';
        }
        case 'end': {
            return 'flex-end';
        }
        case 'baseline': {
            return 'baseline';
        }
        case 'stretch': {
            return 'stretch';
        }
        default: {
            if (own) {
                return undefined
            } else {
                return 'stretch';
            }
        }
    }
}

function convertJustify(justify?: Justify | null): ForJustifyConvertFunc {
    switch (justify) {
        case 'center': {
            return 'center';
        }
        case 'start': {
            return 'flex-start';
        }
        case 'end': {
            return 'flex-end';
        }
        case 'space-between': {
            return 'space-between';
        }
        default: {
            return undefined
        }
    }
}

export const XView = Glamorous.div<XViewProps>((props) => {
    return {
        display: 'flex',
        alignItems: convertAlign(false, props.alignItems),
        alignSelf: convertAlign(true, props.alignSelf),
        justifyContent: convertJustify(props.justifyContent),
        flexDirection: props.direction ? props.direction : 'column',
        flexGrow: props.grow !== null && props.grow !== undefined ? props.grow : undefined,
        flexShrink: props.shrink !== null && props.shrink !== undefined ? props.shrink : undefined,
        '> *': {
            margin: props.childWhiteSpace ? '0 7px' : undefined,
            '&:last-child': {
                marginRight: '0 !important'
            }
        }
    }
})