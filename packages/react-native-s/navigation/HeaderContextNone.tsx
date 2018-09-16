import { HeaderContextProvider, HeaderContext } from './HeaderContext';
import * as React from 'react';
import { HeaderConfig } from './HeaderConfig';
import UUID from 'uuid/v4';

export class HeaderContextNone extends React.PureComponent implements HeaderContextProvider {
    registerConfig = (config: HeaderConfig, animated?: boolean) => {
        return UUID();
    }
    updateConfig = (key: string, config: HeaderConfig, animated?: boolean) => {
        //
    }
    removeConfig = (key: string, animated?: boolean) => {
        //
    }

    render() {
        return (
            <HeaderContext.Provider value={this}>
                {this.props.children}
            </HeaderContext.Provider>
        );
    }
}