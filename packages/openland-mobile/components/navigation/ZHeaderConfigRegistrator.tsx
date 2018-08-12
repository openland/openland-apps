import * as React from 'react';
import { ZHeaderConfig } from './ZHeaderConfig';
import { ZHeaderContext, ZHeaderContextProvider } from './ZHeaderContext';

class ZHeaderConfigRegistratorComponent extends React.PureComponent<{ config: ZHeaderConfig, provider: ZHeaderContextProvider }> {
    private registrationId: string | undefined;

    componentWillMount() {
        this.registrationId = this.props.provider.registerConfig(this.props.config);
    }
    componentWillReceiveProps(nextProps: { config: ZHeaderConfig, provider: ZHeaderContextProvider }) {
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

export const ZHeaderConfigRegistrator = (props: { config: ZHeaderConfig }) => {
    return (
        <ZHeaderContext.Consumer>
            {ctx => <ZHeaderConfigRegistratorComponent config={props.config} provider={ctx!!} />}
        </ZHeaderContext.Consumer>
    );
};