import Glamorous from 'glamorous';

type Align = 'center' | 'start' | 'end' | 'stretch' | 'baseline';
type Direction = 'column' | 'row';
type Justify = 'center' | 'start' | 'end' | 'space-between';

interface XViewProps {
    alignSelf?: Align | null;
    alignItems?: Align | null;
    justifyContent?: Justify | null;
    direction?: Direction | null;
}

function convertAlign(own: boolean, align?: Align | null): 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch' | undefined {
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

function convertJustify(justify?: Justify | null): 'center' | 'flex-start' | 'flex-end' | 'space-between' | undefined {
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
        flexDirection: props.direction ? props.direction : 'column'
    }
})