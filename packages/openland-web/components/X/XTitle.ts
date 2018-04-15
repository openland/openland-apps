import Glamorous from 'glamorous';
import XStyles from './XStyles';

export let XTitle = Glamorous.div({
    marginBottom: 16,
    marginTop: 16,
    ...XStyles.text.h600
});

(XTitle.defaultProps as any) = { _isVerticalPaddingIncluded: true };