import * as React from 'react';
import { css, cx } from 'linaria';
import { Placement } from 'popper.js';
import { UPopperController, showPopper } from './UPopper';

const pickerBody = css`
    display: flex;
    padding-bottom: 16px;
    transition: opacity 150ms cubic-bezier(.29, .09, .24, .99);
`;

const pickerBodyInvisible = css`
    opacity: 0;
`;

const pickerInnerBody = css`
    display: flex;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const PopperBody = React.memo((props: {
    target: HTMLElement,
    ctx: UPopperController,
    onHide: () => void,
    children?: any;
    hideOnClick: boolean;
    hideOnLeave: boolean;
}) => {
    const [visible, setVisible] = React.useState(true);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let isOver = true;
        const mouseClickHandler = (e: MouseEvent) => {
            let overTarget = props.target.contains(e.target as HTMLElement);
            let overMenu = ref.current ? ref.current!.contains(e.target as HTMLElement) : false;
            let isNewOver = overTarget || overMenu;
            if (isOver !== isNewOver && !isNewOver) {
                setVisible(false);
                props.onHide();
            }
        };
        const mouseOverHandler = (e: MouseEvent) => {
            let overTarget = props.target.contains(e.target as HTMLElement);
            let overMenu = ref.current ? ref.current!.contains(e.target as HTMLElement) : false;
            let isNewOver = overTarget || overMenu;
            if (isOver !== isNewOver && !isNewOver) {
                isOver = isNewOver;
                setTimeout(() => {
                    setVisible(false);
                    props.onHide();
                }, 300);
            }
        };
        if (props.hideOnClick) {
            document.addEventListener('click', mouseClickHandler, { passive: true });
        }
        if (props.hideOnLeave) {
            document.addEventListener('mouseover', mouseOverHandler, { passive: true });
        }
        return () => {
            document.addEventListener('click', mouseClickHandler, { passive: true });
            document.removeEventListener('mouseover', mouseOverHandler);
        };
    }, []);
    return (
        <div className={cx(pickerBody, !visible && pickerBodyInvisible)} ref={ref}>
            <div className={pickerInnerBody}>
                {props.children}
            </div>
        </div>
    );
});

export const usePopper = (config: { placement: Placement, hideOnLeave?: boolean, hideOnClick?: boolean }, popper: (ctx: UPopperController) => React.ReactElement<{}>): [boolean, (element: HTMLElement | React.MouseEvent<unknown>) => void] => {
    const [isVisible, setVisible] = React.useState(false);
    const ctxRef = React.useRef<UPopperController | undefined>(undefined);
    const show = React.useMemo(() => {
        let lastVisible = false;
        return (arg: HTMLElement | React.MouseEvent<unknown>) => {
            if (lastVisible) {
                return;
            }
            lastVisible = true;
            setVisible(true);
            const target = (arg as any).target || arg;
            showPopper({
                target,
                placement: config.placement
            }, (ctx) => {
                ctxRef.current = ctx;
                return (
                    <PopperBody
                        target={target}
                        ctx={ctx}
                        onHide={() => {
                            lastVisible = false;
                            setVisible(false);
                        }}
                        hideOnClick={config.hideOnClick !== undefined ? config.hideOnClick : true}
                        hideOnLeave={config.hideOnLeave !== undefined ? config.hideOnLeave : false}
                    >
                        {popper(ctx)}
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