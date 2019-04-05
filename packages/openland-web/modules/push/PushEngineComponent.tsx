import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { initPushEngine } from './PushEngine';
import { useClient } from 'openland-web/utils/useClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';

class PushEngineComponentMounted extends React.PureComponent<{
    client: OpenlandClient;
    enabled: boolean;
}> {
    componentDidMount() {
        initPushEngine(this.props.enabled, this.props.client);
    }
    render() {
        return null;
    }
}

export const PushEngineComponent = (props: { enable: boolean }) => {
    if (canUseDOM) {
        let client = useClient();
        return (<PushEngineComponentMounted enabled={props.enable} client={client} />)
    } else {
        return null;
    }
};
