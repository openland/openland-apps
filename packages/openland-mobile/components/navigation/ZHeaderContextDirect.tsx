import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { ZHeaderContextProvider, ZHeaderContext } from './ZHeaderContext';
import { ZHeaderConfig, mergeConfigs, isConfigEquals } from './ZHeaderConfig';
import { randomKey } from '../../utils/randomKey';

export class ZHeaderContextDirect extends React.PureComponent<{ navigation: NavigationScreenProp<NavigationParams> }> implements ZHeaderContextProvider {

    private configs = new Map<string, ZHeaderConfig>();
    private lastConfig = new ZHeaderConfig({});
    private unmounting = false;

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
        console.log('supply');
        console.log(merged);
        console.log(this.lastConfig);
        if (isConfigEquals(merged, this.lastConfig)) {
            return;
        }
        
        // Update config
        this.lastConfig = merged;
        console.log(this.lastConfig);
        this.props.navigation.setParams({ '_z_header_config': this.lastConfig });
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