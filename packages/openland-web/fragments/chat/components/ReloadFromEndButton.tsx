import * as React from 'react';
import { css, cx } from 'linaria';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import ArrowIcon from 'openland-icons/s/ic-back-24.svg';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XLoader } from 'openland-x/XLoader';

const outerContainer = css` 
    position: relative;
    display: flex;
    align-self: stretch;
    justify-content: center;
    flex-direction: row;
`;

const inputPlacehodler = css`
    margin-bottom: 16px;
`;

const reloadButtonContainer = css` 
    position: relative;
    display: flex;
    max-width: 824px;
    flex-grow: 1;
`;

const hideClass = css`
    transform: translateY(176px);
    transition: transform 0.2s ease-out;
`;

const showClass = css`
    transform: translateY(0px);
    transition: transform 0.15s ease-in;
`;

const reloadButtonClass = css`
    z-index: 100;
    display: flex;
    bottom: 0;
    right: 16px;
    position: absolute;

    box-shadow:  0px 8px 24px rgba(23, 26, 31, 0.08), 0px 2px 8px rgba(23, 26, 31, 0.02);
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: var(--backgroundPrimary);

    cursor: pointer;
    transition: color 0.08s ease-in, all 0.15s ease;

    &:hover {
    background-color: var(--backgroundPrimaryHover);
    }
    &:active {
    background-color: var(--backgroundPrimaryActive);
    }
    display: flex;
    justify-content: 'center';
    align-items: 'center';
`;

const iconRotation = css`
    transform: rotate(-90deg);
`;
export const ReloadFromEndButton = React.memo((props: { conversation: ConversationEngine, showInput: boolean }) => {
    const [show, setShow] = React.useState(!props.conversation.dataSource.isCompletedForward());
    const [loading, setLoading] = React.useState();
    React.useEffect(() => {
        setShow(!props.conversation.dataSource.isCompletedForward());
        let sub = props.conversation.dataSource.dumbWatch(() => {
            setShow(!props.conversation.dataSource.isCompletedForward());
        });
        return () => {
            sub();
            setLoading(false);
        };
    }, [props.conversation]);

    const onClick = React.useCallback(async () => {
        setLoading(true);
        await props.conversation.restart('end');
        setLoading(false);
    }, []);

    return <div className={outerContainer}>
        <div className={reloadButtonContainer}>
            <div className={cx(reloadButtonClass, show ? showClass : hideClass, !props.showInput && inputPlacehodler)} onClick={onClick} >
                {loading ? <XLoader size="small" transparentBackground={true} /> : <UIcon icon={<ArrowIcon />} className={iconRotation} />}
            </div>
        </div>
    </div>;
});
