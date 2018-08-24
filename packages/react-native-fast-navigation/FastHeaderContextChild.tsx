import * as React from 'react';
import { FastHeaderContextProvider, FastHeaderContext } from './FastHeaderContext';
import { FastHeaderConfig, mergeConfigs, isConfigEquals } from './FastHeaderConfig';
import UUID from 'uuid/v4';

class FastHeaderContextChildComponent extends React.Component<{ enabled: boolean, provider: FastHeaderContextProvider }> implements FastHeaderContextProvider {
    private configs = new Map<string, FastHeaderConfig>();
    private lastConfig = new FastHeaderConfig({});
    private unmounting = false;
    private registrationId: string | undefined = undefined;

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

        if (this.props.enabled) {
            if (this.registrationId) {
                this.props.provider.updateConfig(this.registrationId, this.lastConfig);
            } else {
                this.registrationId = this.props.provider.registerConfig(this.lastConfig);
            }
        }
    }

    componentWillReceiveProps(nextProps: { enabled: boolean, provider: FastHeaderContextProvider }) {
        if (nextProps.enabled !== this.props.enabled) {
            if (nextProps.enabled) {
                if (this.registrationId) {
                    this.props.provider.updateConfig(this.registrationId, this.lastConfig);
                } else {
                    this.registrationId = this.props.provider.registerConfig(this.lastConfig);
                }
            } else {
                if (this.registrationId) {
                    this.props.provider.removeConfig(this.registrationId);
                    this.registrationId = undefined;
                }
            }
        }
    }

    componentWillUnmount() {
        this.unmounting = true;
    }

    render() {
        return (
            <FastHeaderContext.Provider value={this}>
                {this.props.children}
            </FastHeaderContext.Provider>
        );
    }
}

export const FastHeaderContextChild = (props: { enabled: boolean, children?: any }) => {
    return (
        <FastHeaderContext.Consumer>
            {ctx => <FastHeaderContextChildComponent provider={ctx!!} enabled={props.enabled}>{props.children}</FastHeaderContextChildComponent>}
        </FastHeaderContext.Consumer>
    );
};