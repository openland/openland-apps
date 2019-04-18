import * as React from 'react';
import { XModal, showModal, XModalController } from './showModal';
import { css } from 'linaria';
import { randomKey } from 'openland-graphql/utils/randomKey';
import * as className from 'classnames';
import { XScrollView3 } from './XScrollView3';
import { XView } from 'react-mental';
import { XButton } from './XButton';
import { XLoader } from './XLoader';

const boxStyle = css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 3px 14px 4px #82777747;
    max-height: 100vh;
    max-width: 100vw;
    width: 575px;
`

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
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBoxComponent = React.memo<{ ctx: XModalController, modal: XModal, config: XModalBoxConfig }>((props) => {
    const key = React.useMemo(() => randomKey(), []);
    const [state, setState] = React.useState<'showing' | 'visible' | 'hiding'>('showing')
    const tryHide = React.useCallback(() => {
        if (state !== 'hiding') {
            setState('hiding');
            setTimeout(() => { props.ctx.hide() }, 75);
        }
    }, []);
    React.useEffect(() => {
        props.ctx.setOnEscPressed(() => {
            tryHide();
        });
        setState('visible');
    }, []);
    let handleContainerClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id === key) {
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
            }
        }
        return props.modal(ctx2);
    }, []);

    return (
        <div
            id={key}
            className={className(
                overlayStyle,
                (state === 'showing') && overlayShowing,
                (state === 'visible') && overlayVisible,
                (state === 'hiding') && overlayHiding,
            )}
            onClick={handleContainerClick}
        >
            <div className={boxStyle}>
                <XView height={64} lineHeight="64px" paddingLeft={24} paddingRight={14} fontSize={18} fontWeight="600" flexDirection="row" alignItems="center">
                    <XView flexGrow={1} flexShrink={1} minWidth={0}>
                        {props.config.title}
                    </XView>
                    <XButton style="flat" text="close" onClick={tryHide} />
                </XView>
                <XScrollView3 maxHeight="calc(100vh - 48px)">
                    <React.Suspense fallback={<XView height={64}><XLoader /></XView>}>
                        {contents}
                    </React.Suspense>
                </XScrollView3>
            </div>
        </div>
    )
});

export interface XModalBoxConfig {
    title?: string;
}

export function showModalBox(config: XModalBoxConfig, modal: XModal) {
    showModal((ctx) => {
        return (
            <ModalBoxComponent modal={modal} ctx={ctx} config={config} />
        )
    })
}