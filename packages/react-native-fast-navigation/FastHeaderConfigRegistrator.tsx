import * as React from 'react';
import { FastHeaderConfig } from './FastHeaderConfig';
import { FastHeaderContextProvider, FastHeaderContext } from './FastHeaderContext';

class FastHeaderConfigRegistratorComponent extends React.PureComponent<{ config: FastHeaderConfig, provider: FastHeaderContextProvider }> {
    private registrationId: string | undefined;

    componentWillMount() {
        this.registrationId = this.props.provider.registerConfig(this.props.config);
    }
    componentWillReceiveProps(nextProps: { config: FastHeaderConfig, provider: FastHeaderContextProvider }) {
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

export const FastHeaderConfigRegistrator = (props: { config: FastHeaderConfig }) => {
    return (
        <FastHeaderContext.Consumer>
            {ctx => <FastHeaderConfigRegistratorComponent config={props.config} provider={ctx!!} />}
        </FastHeaderContext.Consumer>
    );
};