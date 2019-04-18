import * as React from 'react';
import { XModalProvider, XModal, registerModalProvider, XModalController } from './showModal';
import { randomKey } from 'openland-graphql/utils/randomKey';
import * as ReactModal from 'react-modal';

export class XDialogProviderComponent extends React.Component<{}, { modals: { element: React.ReactElement<{}>, key: string }[] }> implements XModalProvider {
    constructor(props: {}) {
        super(props);
        this.state = { modals: [] };
    }
    showModal = (modal: XModal) => {
        setTimeout(() => {
            let key = randomKey();
            let cont: XModalController = {
                hide: () => {
                    this.setState((state) => ({ modals: state.modals.filter((v) => v.key !== key) }));
                }
            }
            let element = modal(cont);
            this.setState((state) => ({ modals: [...state.modals, { key, element }] }));
        }, 1);
    }
    componentWillMount() {
        registerModalProvider(this);
    }
    render() {
        return (
            <>
                {this.state.modals.map((v) => (
                    <ReactModal
                        key={v.key}
                        isOpen={true}
                        onRequestClose={() => this.setState((state) => ({ modals: state.modals.filter((v2) => v.key !== v2.key) }))}
                        shouldCloseOnOverlayClick={true}
                        shouldCloseOnEsc={true}
                        ariaHideApp={false}
                        style={{
                            overlay: {
                                zIndex: 100,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            content: {
                                display: 'block',
                                // background: props.transparent ? 'transparent' : '#ffffff',
                                background: 'transparent',
                                margin: 'auto',
                                padding: 0,
                                overflow: 'visible',

                                // Border/shadow
                                border: 'none',
                                boxShadow: 'none',
                                borderRadius: 0,

                                // Sizes
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            },
                        }}
                    >
                        {v.element}
                    </ReactModal>
                ))}
            </>
        );
    }
}