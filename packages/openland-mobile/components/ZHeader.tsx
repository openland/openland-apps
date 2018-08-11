import * as React from 'react';
import { ZHeaderContextProvider, ZHeaderContext } from './navigation/ZHeaderContext';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';

interface ZHeaderComponentProps {
    title?: string;
    provider: ZHeaderContextProvider;
}

class ZHeaderComponent extends React.PureComponent<ZHeaderComponentProps> {
    private registrationId: string | undefined;

    componentWillMount() {
        this.registrationId = this.props.provider.registerConfig(new ZHeaderConfig({ title: this.props.title }));
    }
    componentWillReceiveProps(nextProps: ZHeaderComponentProps) {
        if (this.registrationId) {
            this.props.provider.updateConfig(this.registrationId, new ZHeaderConfig({ title: nextProps.title }));
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

export const ZHeader = (props: { title?: string }) => {
    return (
        <ZHeaderContext.Consumer>
            {ctx => (<ZHeaderComponent provider={ctx!!} {...props} />)}
        </ZHeaderContext.Consumer>
    );
};