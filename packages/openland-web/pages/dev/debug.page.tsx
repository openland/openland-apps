import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import * as React from 'react';
import { XCheckbox } from 'openland-x/XCheckbox';
import { HeadTitle } from '../main/settings/components/SettingComponents';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { XSelect } from 'openland-x/XSelect';
import { useClient } from '../../utils/useClient';
import { GraphqlActiveSubscription } from 'openland-graphql/GraphqlClient';
import * as Types from 'openland-api/Types';
import { foreverBreakable } from 'openland-engines/utils/forever';

class DebugEventsInner extends React.Component<
    { run: (randomDelay: boolean, count: number) => void },
    { randomDelay: boolean; count: number }
> {
    state = {
        randomDelay: false,
        count: 100,
    };

    render() {
        let { randomDelay, count } = this.state;

        return (
            <XView marginTop={10}>
                <XCheckbox
                    label="random delay"
                    checked={randomDelay}
                    onChange={v => this.setState({ randomDelay: v.checked })}
                />
                <XView marginTop={10}>
                    <XSelect
                        title="Events count"
                        searchable={false}
                        clearable={false}
                        options={[
                            { value: 100, label: '100' },
                            { value: 200, label: '200' },
                            { value: 300, label: '300' },
                            { value: 400, label: '400' },
                            { value: 500, label: '500' },
                        ]}
                        onChange={(v: any) => this.setState({ count: v.value })}
                        value={count}
                    />
                </XView>
                <XView marginTop={10}>
                    <XButton
                        alignSelf="flex-start"
                        text={'run'}
                        style={'primary'}
                        action={async () => {
                            this.props.run(randomDelay, count);
                        }}
                    />
                </XView>
            </XView>
        );
    }
}

let sub:
    | GraphqlActiveSubscription<Types.DebugEventsWatch, Types.DebugEventsWatchVariables>
    | undefined;
let breakLoop: () => void | undefined;

const DebugEvents = () => {
    const client = useClient();
    let [gotEvents, setGotEvents] = React.useState<number | null>(null);
    let [eventsCount, setEventsCount] = React.useState<number | null>(null);

    const run = (random: boolean, count: number) => {
        setEventsCount(count);
        setGotEvents(0);
        if (sub) {
            sub.destroy();
            breakLoop();
        }

        let seed = (Math.random() * Math.pow(2, 55)).toString(16);
        sub = client.subscribeDebugEventsWatch({ eventsCount: count, randomDelays: random, seed });
        let i = 1;
        breakLoop = foreverBreakable(async () => {
            let event = await sub!.get();
            if (event.debugEvents.key.startsWith(seed)) {
                setGotEvents(i);
                i++;
            }
            console.log(event);
        }).break;
    };

    return (
        <>
            <DebugEventsInner run={run} />
            <XView>{`got ${gotEvents || 0}/${eventsCount || 0} events`}</XView>
        </>
    );
};

export default withApp('Super Debug', ['super-admin', 'software-developer'], props => (
    <DevToolsScaffold title="Mails">
        <XHeader text="Debug" />
        <XContent>
            <XVertical2>
                <HeadTitle>Debug events</HeadTitle>
                <DebugEvents />
            </XVertical2>
        </XContent>
    </DevToolsScaffold>
));
