import * as React from 'react';
import UUID from 'uuid/v4';
import { HeaderContextProvider, HeaderContext } from './HeaderContext';
import { HeaderConfig, isConfigEquals, mergeConfigs } from './HeaderConfig';
import { PageHeader } from './PageHeader';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';

interface HeaderComponentProps {
    visible: boolean;
}

interface HeaderComponentState {
    config: HeaderConfig;
}

export class HeaderComponent extends React.PureComponent<HeaderComponentProps, HeaderComponentState>
    implements HeaderContextProvider {
    private configs = new Map<string, HeaderConfig>();
    private lastConfig: HeaderConfig = {};
    private unmounting = false;

    constructor(props: HeaderComponentProps) {
        super(props);
        this.state = { config: {} };
    }

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
        this.setState({ config: merged });
    }

    componentWillUnmount() {
        this.unmounting = true;
    }

    render() {
        const { title, documentTitle } = this.state.config;
        return (
            <>
                {this.props.visible && <XDocumentHead title={documentTitle ? documentTitle : title} />}
                <PageHeader config={this.state.config} />
                <HeaderContext.Provider value={this}>{this.props.children}</HeaderContext.Provider>
            </>
        );
    }
}
