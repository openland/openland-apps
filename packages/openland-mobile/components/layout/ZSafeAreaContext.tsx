import * as React from 'react';

export interface ZSafeArea {
    top: number;
    bottom: number;
}

export const ZSafeAreaContext = React.createContext<ZSafeArea>({ top: 0, bottom: 0 });

export const ZSafeAreaProvider = (props: { top?: number, bottom?: number, children?: any }) => {
    return (
        <ZSafeAreaContext.Consumer>
            {area => (
                <ZSafeAreaContext.Provider value={{ top: (props.top ? props.top : 0) + area.top, bottom: (props.bottom ? props.bottom : 0) + area.bottom }}>
                    {props.children}
                </ZSafeAreaContext.Provider>
            )}
        </ZSafeAreaContext.Consumer>
    );
};