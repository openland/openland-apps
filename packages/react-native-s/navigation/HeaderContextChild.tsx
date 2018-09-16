import * as React from 'react';
import { HeaderContextProvider, HeaderContext } from './HeaderContext';
import { HeaderConfig, mergeConfigs, isConfigEquals } from './HeaderConfig';
import UUID from 'uuid/v4';

class HeaderContextChildComponent extends React.Component<{ enabled: boolean, provider: HeaderContextProvider }> implements HeaderContextProvider {
    private configs = new Map<string, HeaderConfig>();
    private lastConfig: HeaderConfig = {};
    private unmounting = false;
    private registrationId: string | undefined = undefined;

    registerConfig = (config: HeaderConfig, animated?: boolean) => {
        let key = UUID();
        this.configs.set(key, config);
        this.supplyConfig(animated);
        return key;
    }
    updateConfig = (key: string, config: HeaderConfig, animated?: boolean) => {
        if (this.configs.has(key)) {
            this.configs.set(key, config);
        } else {
            console.warn('Trying to update unknown config: ignoring');
        }
        this.supplyConfig(animated);
    }
    removeConfig = (key: string, animated?: boolean) => {
        if (this.configs.has(key)) {
            this.configs.delete(key);
        } else {
            console.warn('Trying to unregister unknown config: ignoring');
        }
        this.supplyConfig(animated);
    }

    supplyConfig = (animated?: boolean) => {
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

        if (this.props.enabled) {
            if (this.registrationId) {
                this.props.provider.updateConfig(this.registrationId, this.lastConfig, animated);
            } else {
                this.registrationId = this.props.provider.registerConfig(this.lastConfig, animated);
            }
        }
    }

    componentWillReceiveProps(nextProps: { enabled: boolean, provider: HeaderContextProvider }) {
        if (nextProps.enabled !== this.props.enabled) {
            if (nextProps.enabled) {
                if (this.registrationId) {
                    this.props.provider.updateConfig(this.registrationId, this.lastConfig, false);
                } else {
                    this.registrationId = this.props.provider.registerConfig(this.lastConfig, false);
                }
            } else {
                if (this.registrationId) {
                    this.props.provider.removeConfig(this.registrationId, false);
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
            <HeaderContext.Provider value={this}>
                {this.props.children}
            </HeaderContext.Provider>
        );
    }
}

export const HeaderContextChild = (props: { enabled: boolean, children?: any }) => {
    return (
        <HeaderContext.Consumer>
            {ctx => <HeaderContextChildComponent provider={ctx!!} enabled={props.enabled}>{props.children}</HeaderContextChildComponent>}
        </HeaderContext.Consumer>
    );
};