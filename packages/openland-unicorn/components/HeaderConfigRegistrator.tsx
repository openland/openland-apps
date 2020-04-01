import * as React from 'react';
import { HeaderConfig } from './HeaderConfig';
import { HeaderContextProvider, HeaderContext } from './HeaderContext';

class HeaderConfigRegistratorComponent extends React.PureComponent<{ config: HeaderConfig, provider: HeaderContextProvider }> {
    private registrationId: string | undefined;

    componentDidMount() {
        this.registrationId = this.props.provider.registerConfig(this.props.config);
    }

    componentDidUpdate(prevProps: { config: HeaderConfig, provider: HeaderContextProvider }) {
        if (this.registrationId) {
            this.props.provider.updateConfig(this.registrationId, this.props.config);
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