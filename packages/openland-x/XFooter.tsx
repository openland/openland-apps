import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import XStyles from 'openland-x/XStyles';

const FooterText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#6b7c93',
    fontSize: '13px',
    lineHeight: '1.6',
    whiteSpace: 'pre',
});

let FooterWrapper = Glamorous.div({
    minHeight: 50,
    paddingLeft: XStyles.paddings.xlarge,
    paddingRight: XStyles.paddings.xlarge,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.large,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
});

export function XFooter(props: { children?: any, text?: string | null }) {
    return (
        <FooterWrapper>
            <FooterText>
                {props.text}
            </FooterText>
            <XHorizontal separator="normal">
                {props.children}
            </XHorizontal>
        </FooterWrapper>
    );
}