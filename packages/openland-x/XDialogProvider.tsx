import * as React from 'react';
import { XModalProvider, XModal, registerModalProvider, XModalController } from './showModal';
import { randomKey } from 'openland-graphql/utils/randomKey';
import * as ReactModal from 'react-modal';
import { UPopperProvider, UPopper, registerPopupProvider } from 'openland-web/components/unicorn/UPopper';
import * as ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { css } from 'linaria';

const style = css`
    z-index: 2;
`;

export class XDialogProviderComponent extends React.Component<{}, { modals: { component: React.ReactElement<{}>; key: string; }[] }>
    implements XModalProvider, UPopperProvider {

    constructor(props: {}) {
        super(props);
        this.state = { modals: [] };
    }

    showPopper = (popper: UPopper) => {
        setTimeout(() => {
            let key = randomKey();
            // let escHandler: (() => void) | undefined;
            let cont: XModalController = {
                hide: () => {
                    this.setState(state => ({ modals: state.modals.filter(v => v.key !== key) }));
                },
                setOnEscPressed: handler => {
                    // escHandler = handler;
                },
            };
            // let esc = () => {
            //     if (escHandler) {
            //         escHandler();
            //     }
            // };
            let res = popper(cont);

            const Body = () => {

                const target = res.target;
                const ref = React.useRef<HTMLDivElement>(null);

                React.useLayoutEffect(() => {
                    let pjs = new Popper(target, ref.current!, {
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: true,
                            },
                            preventOverflow: {
                                order: 99,
                                boundariesElement: 'viewport',
                                padding: 12,
                            },
                        },
                        eventsEnabled: true,
                        placement: res.placement || 'auto'
                    });
                    return () => {
                        pjs.destroy();
                    };
                }, []);

                return (
                    <div
                        className={style}
                        ref={ref}
                    >
                        {res.content}
                    </div>
                );
            };

            const component = ReactDOM.createPortal(<Body />, document.body, key);
            this.setState(state => ({
                modals: [...state.modals, { key, component }],
            }));
        }, 1);
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
        registerPopupProvider(this);
    }
    render() {
        return (
            <>
                {this.state.modals.map((v) => v.component)}
            </>
        );
    }
}
