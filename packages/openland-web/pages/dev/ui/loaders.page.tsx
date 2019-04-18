import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XStore } from 'openland-y-store/XStore';
import { XTitle } from 'openland-x/XTitle';
import { XButton } from 'openland-x/XButton';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { XVertical2 } from 'openland-x/XVertical2';

class Toggler extends React.Component<{}, { visible: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { visible: true };
    }
    render() {
        console.warn(this.state.visible);
        return (
            <XVertical2>
                <XButton
                    text="Toggle"
                    onClick={() => this.setState({ visible: !this.state.visible })}
                />
            </XVertical2>
        );
    }
}

export default withApp('UI Framework - Loaders', 'viewer', props => {
    return (
        <DevDocsScaffold title="Loaders">
            <XContent>
                <XVertical2>
                    <XStore
                        onChanged={data => console.warn(data)}
                        defaultData={{ stage: 'Hello!' }}
                    >
                        <XVertical2>
                            <XTitle>Loading Bar</XTitle>
                            <Toggler />
                            <XTitle>Circular Bar</XTitle>
                            <XLoadingCircular color="#000000" />
                        </XVertical2>
                    </XStore>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
