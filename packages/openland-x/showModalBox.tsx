import * as React from 'react';
import { XModal, showModal, XModalController } from './showModal';
import { css } from 'linaria';
import * as className from 'classnames';
import { XView } from 'react-mental';
import { XLoader } from './XLoader';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import ResizeObserver from 'resize-observer-polyfill';
import { XShortcuts } from 'openland-x/XShortcuts';
import CloseIcon from 'openland-icons/ic-close-post.svg';

const boxStyle = css`
    overflow: visible;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 3px 14px 4px #82777747;
    max-height: calc(100vh - 48px);
    max-width: calc(100vw - 20px);
    width: 575px;
`;

const boxShowing = css`
    transform: translate(0px, 64px);
`;

const boxVisible = css`
    transition: top 150ms cubic-bezier(0.4, 0, 0.2, 1), left 150ms cubic-bezier(0.4, 0, 0.2, 1),
        transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(0px, 0px);
`;

const boxHiding = css`
    transition: top 150ms cubic-bezier(0, 0, 0.2, 1), left 150ms cubic-bezier(0, 0, 0.2, 1),
        transform 150ms cubic-bezier(0, 0, 0.2, 1), opacity 150ms cubic-bezier(0, 0, 0.2, 1);
    opacity: 0;
    transform: translate(0px, 32px);
`;

const overlayHiding = css`
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0, 0, 0.2, 1);
`;

const overlayVisible = css`
    opacity: 1;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const overlayShowing = css`
    opacity: 0;
`;

const overlayStyle = css`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
`;

const overlayFullScreenStyle = css`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Loader = (
    <XView height="100%" alignItems="center" justifyContent="center">
        <XLoader loading={true} />
    </XView>
);

const ModalBoxComponent = React.memo<{
    ctx: XModalController;
    modal: XModal;
    config: XModalBoxConfig;
}>(props => {
    const [state, setState] = React.useState<'showing' | 'visible' | 'hiding'>('showing');
    const [top, setTop] = React.useState(0);
    const [left, setLeft] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const boxRef = React.useRef<HTMLDivElement | null>(null);

    const tryHide = React.useCallback(() => {
        if (state !== 'hiding') {
            setState('hiding');
            setTimeout(() => {
                props.ctx.hide();
            }, 200);
        }
    }, []);

    React.useEffect(() => {
        props.ctx.setOnEscPressed(() => {
            tryHide();
        });
    }, []);

    let handleContainerClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current) {
            tryHide();
        }
    }, []);

    const contents = React.useMemo(() => {
        let ctx2: XModalController = {
            hide: () => {
                tryHide();
            },
            setOnEscPressed: () => {
                // Ignore?
            },
        };
        return props.modal(ctx2);
    }, []);

    React.useLayoutEffect(() => {
        let inited = false;
        let windowHeight = 0;
        let windowWidth = 0;
        let contentHeight = 0;
        let contentWidth = 0;
        let observer = new ResizeObserver(src => {
            for (let s of src) {
                if (s.target === containerRef.current) {
                    windowHeight = s.contentRect.height;
                    windowWidth = s.contentRect.width;
                }
                if (s.target === boxRef.current) {
                    contentHeight = s.contentRect.height;
                    contentWidth = s.contentRect.width;
                }
            }

            setTop(Math.round(Math.min((windowHeight - contentHeight) / 2, 128)));
            setLeft(Math.round((windowWidth - contentWidth) / 2));

            if (!inited) {
                inited = true;
                setTimeout(() => {
                    setState('visible');
                }, 1);
            }
        });
        containerRef.current!!.addEventListener('touchmove', e => e.preventDefault(), {
            passive: false,
        });
        boxRef.current!!.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
        observer.observe(boxRef.current!);
        observer.observe(containerRef.current!);
        return () => observer.disconnect();
    }, []);

    const boxInlineStyle = props.config.fullScreen
        ? {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              maxWidth: 'initial',
              maxHeight: 'initial',
              borderRadius: 0,
              transition: 'none',
          }
        : { top, left, width: props.config.width };

    return (
        <XModalBoxContext.Provider
            value={{
                close: tryHide,
            }}
        >
            <div
                ref={containerRef}
                className={className(
                    // overlayStyle,
                    props.config.fullScreen ? overlayFullScreenStyle : overlayStyle,
                    state === 'showing' && overlayShowing,
                    state === 'visible' && overlayVisible,
                    state === 'hiding' && overlayHiding,
                )}
                onClick={handleContainerClick}
            >
                <div
                    ref={boxRef}
                    className={className(
                        boxStyle,
                        state === 'showing' && boxShowing,
                        state === 'visible' && boxVisible,
                        state === 'hiding' && boxHiding,
                    )}
                    style={boxInlineStyle}
                >
                    {props.config.fullScreen && (
                        <XView position="absolute" right={23} top={23} zIndex={100}>
                            <XView
                                onClick={tryHide}
                                cursor="pointer"
                                alignItems="center"
                                justifyContent="center"
                                padding={8}
                                width={36}
                                height={36}
                                borderRadius={50}
                                hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                            >
                                <CloseIcon width={14} height={14} />
                            </XView>
                        </XView>
                    )}
                    {props.config.title && (
                        <XView paddingTop={30} paddingBottom={20}>
                            <XView
                                height={36}
                                lineHeight="36px"
                                paddingLeft={40}
                                paddingRight={14}
                                fontSize={30}
                                fontWeight="600"
                                flexDirection="row"
                                alignItems="center"
                            >
                                <XView flexGrow={1} flexShrink={1} minWidth={0} paddingRight={8}>
                                    {props.config.title}
                                </XView>
                                {/* <CloseButton onClick={tryHide} /> */}
                            </XView>
                        </XView>
                    )}

                    <React.Suspense fallback={Loader}>{contents}</React.Suspense>
                </div>
            </div>
        </XModalBoxContext.Provider>
    );
});

export const XModalBoxStyles = {
    contentPadding: 40,
};

export interface XModalBoxConfig {
    title?: string;
    width?: number;
    fullScreen?: boolean;
}

export function showModalBox(config: XModalBoxConfig, modal: XModal) {
    showModal(ctx => {
        return (
            <XShortcuts
                supressOtherShortcuts
                handlerMap={{
                    ESC: () => {
                        ctx.hide();
                    },
                }}
                keymap={{
                    ESC: 'ESC',
                }}
            >
                <ModalBoxComponent modal={modal} ctx={ctx} config={config} />
            </XShortcuts>
        );
    });
}
