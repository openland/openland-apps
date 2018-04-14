import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './XCard';
import { XButton } from './XButton';
import { XHeader } from './XHeader';

export const XDialogContainer = Glamorous(XCard)<{ width?: number | string }>((props) => ({
    display: 'block',
    minWidth: props.width ? undefined : 600,
    maxWidth: props.width ? undefined : 600,
    width: props.width ? props.width : undefined,
    margin: 'auto',
    marginLeft: 64,
    marginRight: 64,
    marginTop: 64,
    marginBottom: 64,
    pointerEvents: 'auto',
    border: 'none',
    boxShadow: 'none'
}));

export const XDialogFullScreenContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '1020px',
    width: '100%',
    height: '100vh',
    backgroundColor: '#fff',
    overflowY: 'scroll',
    position: 'relative',
    pointerEvents: 'auto',
});

export const XDialogFullScreenContainerInner = Glamorous.div<{ width?: number | string }>((props) => ({
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

export function XDialog(props: { style?: 'full-screen' | 'normal', title: string, onClose?: () => void, children: any, width?: number | string }) {
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
            <XDialogContainer shadow="medium" width={props.width}>
                <XHeader text={props.title}>
                    <XButton borderless={true} icon={'clear'} onClick={(e: any) => { e.preventDefault(); props.onClose!!(); }} />
                </XHeader>
                {props.children}
            </XDialogContainer>
        );
    }
}