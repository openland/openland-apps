import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './XCard';
import { XButton } from './XButton';

export const XDialogContainer = Glamorous(XCard)({
    minWidth: '600px',
    marginLeft: 64,
    marginRight: 64,
    marginTop: 64,
    marginBottom: 64,
    pointerEvents: 'auto'
});

export const XDialogFullScreenContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '1020px',
    width: '100%',
    height: '100vh',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
    position: 'relative',
    pointerEvents: 'auto',
});

export const XDialogFullScreenContainerInner = Glamorous.div<{width?: number}>((props) => ({
    display: 'block',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: props.width ? props.width : 960,
    paddingTop: 88,
    paddingBottom: 70
}));

export const XDialogFullScreenContainerHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // height: '64px',
    color: '#182642',
    fontSize: '32px',
    fontWeight: 800,
    justifyContent: 'space-between',
    marginBottom: 24
});

export function XDialog(props: { style?: 'full-screen' | 'normal', title: string, onClose?: () => void, children: any, width?: number }) {
    if (props.style === 'full-screen') {
        return (
            <XDialogFullScreenContainer>
                <XDialogFullScreenContainerInner width={props.width}>
                    <XDialogFullScreenContainerHeader>
                        <span>{props.title}</span>
                        <div>
                            <XButton borderless={true} size="large" icon={'clear'} onClick={(e: any) => { e.preventDefault(); props.onClose!!(); }} />
                        </div>
                    </XDialogFullScreenContainerHeader>
                    {props.children}
                </XDialogFullScreenContainerInner>
            </XDialogFullScreenContainer>
        );
    } else {
        return (
            <XDialogContainer shadow="medium">
                <XCard.Header text={props.title}>
                    <XButton borderless={true} icon={'clear'} onClick={(e: any) => { e.preventDefault(); props.onClose!!(); }} />
                </XCard.Header>
                {props.children}
            </XDialogContainer>
        );
    }
}