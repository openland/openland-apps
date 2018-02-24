import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './XCard';
import { XButton } from './XButton';

export const XDialogContainer = Glamorous(XCard)({
    minWidth: '600px',
    marginLeft: 64,
    marginRight: 64,
    marginTop: 64,
    marginBottom: 64
});

export const XDialogFullScreenContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '1020px',
    width: '100%',
    height: '100vh',
    backgroundColor: '#ffffff',
    overflowY: 'auto'
});

export const XDialogFullScreenContainerInner = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '960px',
    paddingTop: '88px'
});

export const XDialogFullScreenContainerHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '64px',
    color: '#182642',
    fontSize: '32px',
    fontWeight: 800,
    justifyContent: 'space-between'
})

export function XDialog(props: { style?: 'full-screen' | 'normal', title: string, onClose?: () => void, children: any }) {
    if (props.style === 'full-screen') {
        return (
            <XDialogFullScreenContainer>
                <XDialogFullScreenContainerInner>
                    <XDialogFullScreenContainerHeader>
                        <span>{props.title}</span>
                        <div>
                            <XButton onClick={(e: any) => { e.preventDefault(); props.onClose!!(); }}>Close</XButton>
                        </div>
                    </XDialogFullScreenContainerHeader>
                    {props.children}
                </XDialogFullScreenContainerInner>
            </XDialogFullScreenContainer>
        )
    } else {
        return (
            <XDialogContainer shadow="medium">
                <XCard.Header text={props.title}>
                    <XButton onClick={(e: any) => { e.preventDefault(); props.onClose!!(); }}>Close</XButton>
                </XCard.Header>
                {props.children}
            </XDialogContainer>
        );
    }
}