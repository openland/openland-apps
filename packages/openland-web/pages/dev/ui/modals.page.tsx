import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XModal } from 'openland-x-modal/XModal';
import { XButton } from 'openland-x/XButton';
import { XVertical2 } from 'openland-x/XVertical2';
import { showModal } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';

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

export default withApp('UI Framework - Modals', 'viewer', props => {
    return (
        <DevDocsScaffold title="Modals">
            <XContent>
                <XVertical2>
                    <XTitle>for rooms</XTitle>
                    <XTitle>Modals</XTitle>
                    <XButton
                        text="Show Modal"
                        onClick={() => showModalBox((ctx) => (
                            <XView paddingHorizontal={20} paddingVertical={24}>
                                <XButton text="close" onClick={() => ctx.hide()} />
                            </XView>
                        ))}
                    />
                    {/* <XModal target={<XButton text="Show Modal" />}>
                        <Lorem count={2} />
                    </XModal>
                    <XTitle>Controlled</XTitle>
                    <ControlledModal />
                    <XTitle>Routed</XTitle>
                    <XButton query={{ field: 'modal', value: 'true' }} text="Show Modal" />
                    <XModal targetQuery="modal">Hey!</XModal>
                    <XTitle>With Title</XTitle>
                    <XModal title="Modal Dialog" target={<XButton text="Show Modal" />}>
                        <Lorem count={2} />
                    </XModal>
                    <XTitle>Sizes</XTitle>
                    <XModal target={<XButton text="X-Large" />} size="x-large">
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Large" />} size="large">
                        Hey!
                    </XModal>
                    <XModal target={<XButton text="Default" />}>Hey!</XModal>
                    <XModal target={<XButton text="Small" />} size="small">
                        Hey!
                    </XModal>
                    <XTitle>Large Content</XTitle>
                    <XModal target={<XButton text="Show Modal" />}>
                        <Lorem count={40} />
                    </XModal> */}
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
