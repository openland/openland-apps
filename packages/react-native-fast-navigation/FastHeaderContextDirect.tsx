import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import UUID from 'uuid/v4';
import { FastHeaderContext, FastHeaderContextProvider } from './FastHeaderContext';
import { FastHeaderConfig, mergeConfigs, isConfigEquals } from './FastHeaderConfig';
import { FastRouter } from './FastRouter';

export class FastHeaderContextDirect extends React.PureComponent<{ router: FastRouter }> implements FastHeaderContextProvider {

    private configs = new Map<string, FastHeaderConfig>();
    private lastConfig = new FastHeaderConfig({});
    private unmounting = false;

    registerConfig = (config: FastHeaderConfig) => {
        let key = UUID();
        this.configs.set(key, config);
        this.supplyConfig();
        return key;
    }
    updateConfig = (key: string, config: FastHeaderConfig) => {
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
        let configs: FastHeaderConfig[] = [];
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
        this.props.router.updateConfig(this.lastConfig);
    }

    componentWillUnmount() {
        this.unmounting = true;
    }

    render() {
        return (
            <FastHeaderContext.Consumer>
                {ctx => {
                    if (ctx) {
                        return (
                            <FastHeaderContext.Provider value={ctx}>
                                {this.props.children}
                            </FastHeaderContext.Provider>
                        );
                    } else {
                        return (
                            <FastHeaderContext.Provider value={this}>
                                {this.props.children}
                            </FastHeaderContext.Provider>
                        );
                    }
                }}
            </FastHeaderContext.Consumer>
        );
    }
}