import * as React from 'react';
import { XModalProvider, XModal, registerModalProvider, XModalController } from './showModal';
import { randomKey } from 'openland-graphql/utils/randomKey';
import * as ReactModal from 'react-modal';

export class XDialogProviderComponent extends React.Component<{}, { modals: { component: React.ReactElement<{}>; key: string; }[] }> implements XModalProvider {
    constructor(props: {}) {
        super(props);
        this.state = { modals: [] };
    }

    showModal = (modal: XModal) => {
        setTimeout(() => {
            let key = randomKey();
            let escHandler: (() => void) | undefined;
            let cont: XModalController = {
                hide: () => {
                    this.setState(state => ({ modals: state.modals.filter(v => v.key !== key) }));
                },
                setOnEscPressed: handler => {
                    escHandler = handler;
                },
            };
            let esc = () => {
                if (escHandler) {
                    escHandler();
                }
            };
            let element = modal(cont);

            const component = (
                <ReactModal
                    key={key}
                    isOpen={true}
                    onRequestClose={esc}
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={true}
                    ariaHideApp={false}
                    style={{
                        overlay: {
                            zIndex: 2,
                            backgroundColor: 'transparent',
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
                    {element}
                </ReactModal>
            );

            this.setState(state => ({
                modals: [...state.modals, { key, component }],
            }));
        }, 1);
    }
    componentWillMount() {
        registerModalProvider(this);
    }
    render() {
        return (
            <>
                {this.state.modals.map((v) => v.component)}
            </>
        );
    }
}
