import * as React from 'react';
import { XModal, showModal, XModalController } from './showModal';
import { css } from 'linaria';
import * as className from 'classnames';
import { XScrollView3 } from './XScrollView3';
import { XView } from 'react-mental';
import CloseIcon from 'openland-x-modal/ic-close.svg';
import { XLoader } from './XLoader';
import ResizeObserver from 'resize-observer-polyfill';

const closeIconStyle = css`
    cursor: pointer;
    display: flex;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    border-radius: 50px;
    border: 1px solid transparent;
    > svg > g > path:last-child {
        loaderfill: rgba(0, 0, 0, 0.3);
    }
    :hover {
        & > svg > g > path:last-child {
            fill: rgba(0, 0, 0, 0.4);
        }
    }
`;

export const CloseButton = (props: { onClick: () => void }) => (
    <div className={closeIconStyle} onClick={props.onClick}>
        <CloseIcon />
    </div>
);

const boxStyle = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 3px 14px 4px #82777747;
    max-height: calc(100vh - 48px);
    max-width: 100vw;
    width: 575px;
`;

const boxVisible = css`
    transition: top 150ms, left 150ms;
`;

const overlayHiding = css`
    opacity: 0;
    transition: opacity 75ms;
`;

const overlayVisible = css`
    opacity: 1;
    transition: opacity 150ms;
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

export const Loader = (
    <XView height={64} alignItems="center" justifyContent="center">
        <XLoader loading={true} />
    </XView>
);

export const ModalBoxComponent = React.memo<{
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
            }, 75);
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
        observer.observe(boxRef.current!);
        observer.observe(containerRef.current!);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={className(
                overlayStyle,
                state === 'showing' && overlayShowing,
                state === 'visible' && overlayVisible,
                state === 'hiding' && overlayHiding,
            )}
            onClick={handleContainerClick}
        >
            <div
                ref={boxRef}
                className={className(boxStyle, state === 'visible' && boxVisible)}
                style={{ top, left, width: props.config.width }}
            >
                <XView
                    height={64}
                    lineHeight="64px"
                    paddingLeft={24}
                    paddingRight={14}
                    fontSize={18}
                    fontWeight="600"
                    flexDirection="row"
                    alignItems="center"
                >
                    <XView flexGrow={1} flexShrink={1} minWidth={0} paddingRight={8}>
                        {props.config.title}
                    </XView>
                    <CloseButton onClick={tryHide} />
                </XView>
                <XScrollView3 flexShrink={1}>
                    <React.Suspense fallback={Loader}>{contents}</React.Suspense>
                </XScrollView3>
            </div>
        </div>
    );
});

export interface XModalBoxConfig {
    title?: string;
    width?: number;
}

export function showModalBox(config: XModalBoxConfig, modal: XModal) {
    showModal(ctx => {
        return <ModalBoxComponent modal={modal} ctx={ctx} config={config} />;
    });
}
