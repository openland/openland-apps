import * as React from 'react';
import { ZHeaderContextProvider, ZHeaderContext } from './ZHeaderContext';
import { isConfigEquals, mergeConfigs, ZHeaderConfig } from './ZHeaderConfig';
import { randomKey } from '../../utils/randomKey';

class ZHeaderContextChildComponent extends React.Component<{ enabled: boolean, provider: ZHeaderContextProvider }> implements ZHeaderContextProvider {
    private configs = new Map<string, ZHeaderConfig>();
    private lastConfig = new ZHeaderConfig({});
    private unmounting = false;
    private registrationId: string | undefined = undefined;

    registerConfig = (config: ZHeaderConfig) => {
        let key = randomKey();
        this.configs.set(key, config);
        this.supplyConfig();
        return key;
    }
    updateConfig = (key: string, config: ZHeaderConfig) => {
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
        let configs: ZHeaderConfig[] = [];
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
        // this.props.navigation.setParams({ '_z_header_config': this.lastConfig });
    }

    componentWillReceiveProps(nextProps: { enabled: boolean, provider: ZHeaderContextProvider }) {
        // console.log(nextProps);
        if (nextProps.enabled !== this.props.enabled) {
            if (nextProps.enabled) {
                if (this.registrationId) {
                    console.log('updateConfig');
                    this.props.provider.updateConfig(this.registrationId, this.lastConfig);
                } else {
                    console.log('registerConfig');
                    this.registrationId = this.props.provider.registerConfig(this.lastConfig);
                }
            } else {
                if (this.registrationId) {
                    console.log('removeConfig');
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
            <ZHeaderContext.Provider value={this}>
                {this.props.children}
            </ZHeaderContext.Provider>
        );
    }
}

export const ZHeaderContextChild = (props: { enabled: boolean, children?: any }) => {
    return (
        <ZHeaderContext.Consumer>
            {ctx => <ZHeaderContextChildComponent provider={ctx!!} enabled={props.enabled}>{props.children}</ZHeaderContextChildComponent>}
        </ZHeaderContext.Consumer>
    );
};