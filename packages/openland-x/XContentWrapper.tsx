import React from 'react';
import Glamorous from 'glamorous';

export const XContentWrapper = Glamorous.div<{ withPaddingBottom?: boolean}>((props) => ({
    width: '100%',
    maxWidth: 832,
    margin: '0 auto',
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: props.withPaddingBottom ? 20 : 0,
    paddingLeft: 16
}));