import * as React from 'react';
import { HeaderConfig } from './HeaderConfig';
import { HeaderContextProvider, HeaderContext } from './HeaderContext';

class HeaderConfigRegistratorComponent extends React.PureComponent<{ config: HeaderConfig, provider: HeaderContextProvider }> {
    private registrationId: string | undefined;

    componentWillMount() {
        this.registrationId = this.props.provider.registerConfig(this.props.config);
    }
    componentWillReceiveProps(nextProps: { config: HeaderConfig, provider: HeaderContextProvider }) {
        if (this.registrationId) {
            this.props.provider.updateConfig(this.registrationId, nextProps.config);
        }
    }

    componentWillUnmount() {
        if (this.registrationId) {
            this.props.provider.removeConfig(this.registrationId);
        }
    }
    render() {
        return null;
    }
}

export const HeaderConfigRegistrator = (props: { config: HeaderConfig }) => {
    return (
        <HeaderContext.Consumer>
            {ctx => <HeaderConfigRegistratorComponent config={props.config} provider={ctx!!} />}
        </HeaderContext.Consumer>
    );
};