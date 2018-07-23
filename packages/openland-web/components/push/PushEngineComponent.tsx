import * as React from 'react';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { initPushEngine } from './PushEngine';

class PushEngineComponentMounted extends React.PureComponent<{ client: OpenApolloClient, enabled: boolean }> {
    componentDidMount() {
        initPushEngine(this.props.enabled, this.props.client);
    }
    render() {
        return null;
    }
}

export const PushEngineComponent = (props: { enable: boolean }) => {
    if (canUseDOM) {
        return (
            <YApolloContext.Consumer>
                {(client) => {
                    return (<PushEngineComponentMounted enabled={props.enable} client={client!!} />);
                }}
            </YApolloContext.Consumer>
        );
    } else {
        return null;
    }
};