import * as React from 'react';
import { XModal, showModal, XModalController } from './showModal';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XLoader } from './XLoader';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import ResizeObserver from 'resize-observer-polyfill';
import IcClose from 'openland-icons/s/ic-close-16.svg';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

const boxStyle = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 3px 14px 4px #82777747;
    max-height: calc(100vh - 48px);
    max-width: calc(100vw - 20px);
    overflow: hidden;
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

const darkOverlayStyle = css`
    background-color: var(--overlayHeavy);
`;

const transparentBoxStyle = css`
    background-color: transparent;
    box-shadow: none;
`;

const overlayFullScreenStyle = css`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Loader = (
    <XView height="100px" alignItems="center" justifyContent="center">
        <XLoader loading={true} />
    </XView>
);

const ModalBoxComponent = React.memo<{
    ctx: XModalController;
    modal: XModal;
    config: XModalBoxConfig;
}>(props => {
    const { hideOnEsc = true } = props.config;

    const [state, setState] = React.useState<'showing' | 'visible' | 'hiding'>('showing');
    const [top, setTop] = React.useState(0);
    const [left, setLeft] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const boxRef = React.useRef<HTMLDivElement | null>(null);

    const tryHide = React.useCallback(() => {
        if (state !== 'hiding') {
            if (props.config.onCancel) {
                props.config.onCancel();
            }

            setState('hiding');
            setTimeout(() => {
                props.ctx.hide();
            }, 200);
        }
    }, []);

    React.useEffect(() => {
        if (hideOnEsc) {
            props.ctx.setOnEscPressed(() => {
                tryHide();
            });
        }
    }, []);

    if (hideOnEsc) {
        useShortcuts({
            keys: ['Escape'],
            callback: () => {
                tryHide();
            },
        });
    }

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
        // containerRef.current!!.addEventListener('touchmove', e => e.preventDefault(), {
        //     passive: false,
        // });
        // boxRef.current!!.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
        observer.observe(boxRef.current!);
        observer.observe(containerRef.current!);
        return () => observer.disconnect();
    }, []);

    let layout = useLayout();

    let isFullscreen =
        props.config.fullScreen === 'on-mobile' ? layout === 'mobile' : !!props.config.fullScreen;

    const boxInlineStyle = isFullscreen
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
        : {
              top,
              left,
              width: props.config.flowing ? 'auto' : props.config.width ? props.config.width : 440,
          };

    return (
        <XModalBoxContext.Provider
            value={{
                close: tryHide,
            }}
        >
            <div
                ref={containerRef}
                className={cx(
                    // overlayStyle,
                    isFullscreen
                        ? overlayFullScreenStyle
                        : cx(overlayStyle, props.config.darkOverlay && darkOverlayStyle),
                    state === 'showing' && overlayShowing,
                    state === 'visible' && overlayVisible,
                    state === 'hiding' && overlayHiding,
                )}
                onClick={handleContainerClick}
            >
                <div
                    ref={boxRef}
                    className={cx(
                        boxStyle,
                        props.config.darkOverlay && darkOverlayStyle,
                        props.config.transparentBox && transparentBoxStyle,
                        state === 'showing' && boxShowing,
                        state === 'visible' && boxVisible,
                        state === 'hiding' && boxHiding,
                    )}
                    style={boxInlineStyle}
                >
                    {isFullscreen && props.config.useTopCloser !== false && (
                        <XView position="absolute" right={23} top={23} zIndex={1000}>
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
                                <UIcon icon={<IcClose />} />
                            </XView>
                        </XView>
                    )}
                    {props.config.title && (
                        <XView paddingTop={24} paddingBottom={8}>
                            <XView
                                paddingLeft={24}
                                paddingRight={14}
                                flexDirection="row"
                                alignItems="center"
                                {...TextStyles.Title1}
                            >
                                {props.config.title}
                                {!isFullscreen && props.config.useTopCloser && (
                                    <UIconButton
                                        onClick={tryHide}
                                        icon={<UIcon icon={<IcClose />} size={16} />}
                                        size="small"
                                        position="absolute"
                                        right={16}
                                        top={0}
                                    />
                                )}
                            </XView>
                        </XView>
                    )}

                    <React.Suspense fallback={Loader}>{contents}</React.Suspense>
                </div>
            </div>
        </XModalBoxContext.Provider>
    );
});

export interface XModalBoxConfig {
    title?: string;
    width?: number;
    fullScreen?: boolean | 'on-mobile';
    flowing?: boolean;
    useTopCloser?: boolean;
    darkOverlay?: boolean;
    transparentBox?: boolean;
    onCancel?: () => void;
    hideOnEsc?: boolean;
}

export function showModalBox(config: XModalBoxConfig, modal: XModal) {
    const { hideOnEsc = true } = config;
    showModal(ctx => {
        if (hideOnEsc) {
            ctx.setOnEscPressed(ctx.hide);
        }
        return <ModalBoxComponent modal={modal} ctx={ctx} config={config} />;
    });
}
