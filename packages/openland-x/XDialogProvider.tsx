import * as React from 'react';
import { XModalProvider, XModal, registerModalProvider, XModalController } from './showModal';
import { randomKey } from 'openland-y-utils/randomKey';
import * as ReactModal from 'react-modal';
import {
    UPopperProvider,
    UPopper,
    registerPopupProvider,
    UPopperController,
} from 'openland-web/components/unicorn/UPopper';
import * as ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { css } from 'linaria';

const style = css`
    z-index: 2;
    pointer-events: none;
    &[x-placement^='top'] {
        & .popper-arrow {
            bottom: 4px;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
    &[x-placement^='bottom'] {
        & .popper-arrow {
            top: 4px;
            left: 0;
            right: 0;
            margin: auto;
        }
    }
    &[x-placement^='left'] {
        & .popper-arrow {
            right: 4px;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
    &[x-placement^='right'] {
        & .popper-arrow {
            left: 4px;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
`;

interface XDialogProviderComponentState {
    modals: { component: React.ReactElement<{}>; key: string }[];
}

export class XDialogProviderComponent extends React.Component<{}, XDialogProviderComponentState>
    implements XModalProvider, UPopperProvider {
    constructor(props: {}) {
        super(props);
        this.state = { modals: [] };
    }

    showPopper = (popper: UPopper) => {
        setTimeout(() => {
            let key = randomKey();

            let cont: UPopperController = {
                hide: () => {
                    this.setState(state => ({ modals: state.modals.filter(v => v.key !== key) }));
                },
            };

            let res = popper(cont);

            const Body = () => {
                const target = res.target;
                const ref = React.useRef<HTMLDivElement>(null);

                React.useLayoutEffect(() => {
                    const pjs = new Popper(target, ref.current!, {
                        placement: res.placement || 'auto',
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: true,
                            },
                            preventOverflow: {
                                order: 99,
                                boundariesElement: 'viewport',
                                padding: 12,
                                priority: ['top', 'bottom', 'left', 'right'],
                            },
                            flip: {
                                flipVariations: true,
                                flipVariationsByContent: true,
                            },
                        },
                    });
                    return () => {
                        pjs.destroy();
                    };
                }, []);

                return (
                    <div className={style} ref={ref}>
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
                    shouldCloseOnEsc={false}
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

    componentDidMount() {
        registerModalProvider(this);
        registerPopupProvider(this);
    }

    render() {
        return <>{this.state.modals.map(v => v.component)}</>;
    }
}
