import Glamorous from 'glamorous';
import XStyles from 'openland-x/XStyles';

export let XTitle =  Glamorous.div<{ marginBottom?: number, marginTop?: number  }>((props) => ({
    marginTop: props.marginTop !== undefined ? props.marginTop : 16,
    marginBottom: props.marginBottom !== undefined ? props.marginBottom : 16,
    ...XStyles.text.h600
}));

(XTitle.defaultProps as any) = { _isVerticalPaddingIncluded: true };