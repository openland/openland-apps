import * as React from 'react';
import { css, cx } from 'linaria';
import { Placement } from 'popper.js';
import { UPopperController, showPopper } from './UPopper';

const pickerBody = css`
    display: flex;
    padding-bottom: 8px;
    transition: opacity 150ms cubic-bezier(.29, .09, .24, .99);
`;

const pickerBodyInvisible = css`
    opacity: 0;
`;

const pickerInnerBody = css`
    display: flex;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

interface PopperBodyRef {
    hide: () => void;
}

const PopperBody = React.memo(React.forwardRef((props: {
    target: HTMLElement,
    ctx: UPopperController,
    onHide: () => void,
    children?: any;
    hideOnClick: boolean;
    hideOnLeave: boolean;
}, ref: React.Ref<PopperBodyRef>) => {
    const [visible, setVisible] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const hide = React.useCallback(() => {
        setVisible(false);
        props.onHide();
        setTimeout(() => {
            props.ctx.hide();
        }, 300);
    }, []);

    React.useImperativeHandle(ref, () => ({ hide }));

    React.useEffect(() => {
        let isOver = true;
        let hideTimeout: any = undefined;
        const mouseClickHandler = (e: MouseEvent) => {
            let overTarget = props.target.contains(e.target as HTMLElement);
            let overMenu = containerRef.current ? containerRef.current!.contains(e.target as HTMLElement) : false;
            let isNewOver = overTarget || overMenu;
            if (isOver !== isNewOver && !isNewOver) {
                hide();
            }
        };
        const mouseOverHandler = (e: MouseEvent) => {
            let overTarget = props.target.contains(e.target as HTMLElement);
            let overMenu = containerRef.current ? containerRef.current!.contains(e.target as HTMLElement) : false;
            let isNewOver = overTarget || overMenu;
            if (isOver !== isNewOver) {
                isOver = isNewOver;
                if (!isOver) {
                    hideTimeout = setTimeout(() => {
                        hide();
                    }, 300);
                } else if (isOver) {
                    clearTimeout(hideTimeout);
                }
            }
        };
        if (props.hideOnClick) {
            document.addEventListener('click', mouseClickHandler, { passive: true });
        }
        if (props.hideOnLeave) {
            document.addEventListener('mouseover', mouseOverHandler, { passive: true });
        }
        return () => {
            document.removeEventListener('click', mouseClickHandler);
            document.removeEventListener('mouseover', mouseOverHandler);
        };
    }, []);
    return (
        <div className={cx(pickerBody, !visible && pickerBodyInvisible)} ref={containerRef}>
            <div className={pickerInnerBody}>
                {props.children}
            </div>
        </div>
    );
}));

export const usePopper = (config: { placement: Placement, hideOnLeave?: boolean, hideOnClick?: boolean }, popper: (ctx: UPopperController) => React.ReactElement<{}>): [boolean, (element: HTMLElement | React.MouseEvent<unknown>) => void] => {
    const [isVisible, setVisible] = React.useState(false);
    const ctxRef = React.useRef<UPopperController | undefined>(undefined);
    const popperBodyRef = React.useRef<PopperBodyRef>(null);
    const show = React.useMemo(() => {
        let lastVisible = false;
        return (arg: HTMLElement | React.MouseEvent<unknown>) => {
            if (lastVisible) {
                if (popperBodyRef.current) {
                    popperBodyRef.current.hide();
                }
                return;
            }
            lastVisible = true;
            setVisible(true);
            const target = (arg as any).target || arg;
            showPopper({
                target,
                placement: config.placement
            }, (ctx) => {

                let fakeCtx = {
                    hide: () => {
                        if (popperBodyRef.current) {
                            popperBodyRef.current.hide();
                        }
                    }
                };
                return (
                    <PopperBody
                        ref={popperBodyRef}
                        target={target}
                        ctx={ctx}
                        onHide={() => {
                            lastVisible = false;
                            setVisible(false);
                        }}
                        hideOnClick={config.hideOnClick !== undefined ? config.hideOnClick : true}
                        hideOnLeave={config.hideOnLeave !== undefined ? config.hideOnLeave : false}
                    >
                        {popper(fakeCtx)}
                    </PopperBody>
                );
            });
        };
    }, []);
    React.useEffect(() => {
        return () => {
            let r = ctxRef.current;
            if (r) {
                r.hide();
            }
        };
    }, []);
    return [isVisible, show];
};