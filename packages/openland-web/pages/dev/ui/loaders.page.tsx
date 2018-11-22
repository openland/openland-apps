import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XStore } from 'openland-y-store/XStore';
import { XTitle } from 'openland-x/XTitle';
import { XButton } from 'openland-x/XButton';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';

class Toggler extends React.Component<{}, { visible: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { visible: true };
    }
    render() {
        console.warn(this.state.visible);
        return (
            <XVertical>
                <XButton text="Toggle" onClick={() => this.setState({ visible: !this.state.visible })} />
            </XVertical>
        );
    }
}

export default withApp('UI Framework - Loaders', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Loaders">
            <XContent>
                <XVertical>
                    <XStore onChanged={(data) => console.warn(data)} defaultData={{ stage: 'Hello!' }}>
                        <XVertical>
                            <XTitle>Loading Bar</XTitle>
                            <Toggler />
                            <XTitle>Circular Bar</XTitle>
                            <XLoadingCircular color="#000000" />
                        </XVertical>
                    </XStore>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});