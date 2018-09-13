import * as React from 'react';
import UUID from 'uuid/v4';
import { SRouter } from '../SRouter';
import { HeaderContextProvider, HeaderContext } from './HeaderContext';
import { HeaderConfig, isConfigEquals, mergeConfigs } from './HeaderConfig';

export class HeaderContextDirect extends React.PureComponent<{ router: SRouter }> implements HeaderContextProvider {

    private configs = new Map<string, HeaderConfig>();
    private lastConfig: HeaderConfig = {};
    private unmounting = false;

    registerConfig = (config: HeaderConfig) => {
        let key = UUID();
        this.configs.set(key, config);
        this.supplyConfig();
        return key;
    }
    updateConfig = (key: string, config: HeaderConfig) => {
        if (this.configs.has(key)) {
            this.configs.set(key, config);
        } else {
            console.warn('Trying to update unknown config: ignoring');
        }
        this.supplyConfig();
    }
    removeConfig = (key: string) => {
        if (this.configs.has(key)) {
            this.configs.delete(key);
        } else {
            console.warn('Trying to unregister unknown config: ignoring');
        }
        this.supplyConfig();
    }

    supplyConfig = () => {
        if (this.unmounting) {
            return;
        }

        // Merge configs
        let configs: HeaderConfig[] = [];
        for (let k of this.configs.keys()) {
            configs.push(this.configs.get(k)!!);
        }
        let merged = mergeConfigs(configs);

        // Check if changed
        if (isConfigEquals(merged, this.lastConfig)) {
            return;
        }

        // Update config
        this.lastConfig = merged;
        (this.props.router as any).updateConfig(this.lastConfig);
    }

    componentWillUnmount() {
        this.unmounting = true;
    }

    render() {
        return (
            <HeaderContext.Consumer>
                {ctx => {
                    if (ctx) {
                        return (
                            <HeaderContext.Provider value={ctx}>
                                {this.props.children}
                            </HeaderContext.Provider>
                        );
                    } else {
                        return (
                            <HeaderContext.Provider value={this}>
                                {this.props.children}
                            </HeaderContext.Provider>
                        );
                    }
                }}
            </HeaderContext.Consumer>
        );
    }
}