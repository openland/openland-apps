import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XModal } from 'openland-x-modal/XModal2';
import { XButton } from 'openland-x/XButton';
import Lorem from 'react-lorem-component';

class ControlledModal extends React.Component<{}, { show: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { show: false };
    }
    render() {
        return (
            <>
                <XButton text="Show Modal" onClick={() => this.setState({ show: true })} />
                <XModal isOpen={this.state.show} onClosed={() => this.setState({ show: false })}>
                    Hey!
                </XModal>
            </>
        );
    }
}

export default withApp('UI Framework - Modals', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Modals">
            <XContent>
                <XVertical>
                    <XTitle>Modals</XTitle>
                    <XModal target={<XButton text="Show Modal" />}>
                        <Lorem count={2} />
                    </XModal>
                    <XTitle>Controlled</XTitle>
                    <ControlledModal />
                    <XTitle>Routed</XTitle>
                    <XButton query={{ field: 'modal', value: 'true' }} text="Show Modal" />
                    <XModal targetQuery="modal">
                        Hey!
                    </XModal>
                    <XTitle>Sizes</XTitle>
                    <XModal target={<XButton text="X-Large" />} size="x-large">
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Large" />} size="large">
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Default" />}>
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Small" />} size="small">
                        Hey!
                    </XModal>
                    <XTitle>Large Content</XTitle>
                    <XModal target={<XButton text="Show Modal" />}>
                        <Lorem count={40} />
                    </XModal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});