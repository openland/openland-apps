import * as React from 'react';

export interface ASSafeArea {
    top: number;
    bottom: number;
    keyboardHeight: number;
    openKeyboardHeight: number;
}

export const ASSafeAreaContext = React.createContext<ASSafeArea>({ top: 0, bottom: 0, keyboardHeight: 0, openKeyboardHeight: 0 });

export const ASSafeAreaProvider = (props: { top?: number, bottom?: number, children?: any, keyboardHeight?: number, openKeyboardHeight?: number }) => {
    return (
        <ASSafeAreaContext.Consumer>
            {area => (<ASSafeAreaContext.Provider value={{ top: (props.top !== undefined ? props.top : 0) + area.top, bottom: (props.bottom !== undefined ? props.bottom : 0) + area.bottom, keyboardHeight: props.keyboardHeight || area.keyboardHeight, openKeyboardHeight: props.openKeyboardHeight || area.openKeyboardHeight }}>
                {props.children}
            </ASSafeAreaContext.Provider>
            )}
        </ASSafeAreaContext.Consumer>
    );
};