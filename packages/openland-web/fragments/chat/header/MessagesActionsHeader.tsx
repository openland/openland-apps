import * as React from 'react';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css, cx } from 'linaria';
import { XView, XViewRouterContext } from 'react-mental';
import { MessagesActionsStateEngine } from 'openland-engines/messenger/MessagesActionsState';
import { pluralForm } from 'openland-y-utils/plural';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import CloseIcon from 'openland-icons/s/ic-close-16.svg';
import { TextTitle2 } from 'openland-web/utils/TextStyles';
import { showDeleteMessageModal as showDeleteMessagesModal } from '../components/MessengerRootComponent';
import { useClient } from 'openland-web/utils/useClient';
import { showChatPicker } from '../showChatPicker';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

const containerClass = css`
    position: absolute;
    display: flex;
    transition: transform cubic-bezier(0, 0, 0.2, 1) 150ms, opacity cubic-bezier(0, 0, 0.2, 1) 150ms;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff; // ThemeDefault.backgroundPrimary
    transform: translateY(-56px);
    will-change: transform;
`;

const containerVisibleClass = css`
    transform: translateY(0);
    opacity: 1;
`;

// TODO: ref as PageLayout animations
const animateCenterDown = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    transform: translateY(20px);
    opacity: 0;
`;

const animateCenterUp = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    opacity: 0;
    transform: translateY(-20px);
`;

const animateDownCenter = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }
    transform: translateY(0);
`;

const animateUpCenter = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            transform: translateY(-20px);
        }
        to {
            transform: translateY(0);
        }
    }
    transform: translateY(0);
`;

const Counter = (props: { engine: MessagesActionsStateEngine }) => {
    let layout = useLayout();
    let countRef = React.useRef(0);

    let state = props.engine.useState();

    let count = state.messages.length;
    let old = countRef.current;
    let increment = count > (old);

    countRef.current = count;

    let width = (count.toString()).length * 12;
    return (
        <XView flexDirection="row" alignItems="center" justifyContent="flex-start" onClick={props.engine.clear} cursor="pointer">
            <span className={TextTitle2}>
                <span key={count + '_old'} className={increment ? animateCenterDown : animateCenterUp} style={{ width, display: 'inline-block', position: 'absolute' }}>{old}</span>
                <span key={count + '_new'} className={increment ? animateUpCenter : animateDownCenter} style={{ width, display: 'inline-block' }}>{count}</span>
                {layout === 'desktop' && ` ${pluralForm(count, ['message', 'messages'])} selected`}
            </span>
            <XView width={32} height={32} alignItems="center" justifyContent="center">
                <UIcon icon={<CloseIcon />} />
            </XView>
        </XView>
    );
};

const Buttons = (props: { engine: MessagesActionsStateEngine, chatId: string }) => {
    let client = useClient();
    let deleteCallback = React.useCallback(() => {
        let ids = props.engine.getState().messages.filter(m => !!m.id).map(m => m.id!);
        showDeleteMessagesModal(ids, async () => {
            await client.mutateRoomDeleteMessages({ mids: ids });
            props.engine.clear();
        });
    }, []);
    let layout = useLayout();
    const router = React.useContext(XViewRouterContext);
    let forwardCallback = React.useCallback(() => {
        showChatPicker((id: string) => {
            props.engine.forwardInit();
            router!.navigate('/mail/' + id);
        }, layout);
    }, []);
    let replyCallback = React.useCallback(() => {
        props.engine.reply();
    }, []);
    let state = props.engine.useState();
    let canDelete = !state.messages.filter(m => !m.sender.isYou).length; // || useRole('super-admin')
    return (
        <XView flexDirection="row">
            <div className={canDelete ? animateUpCenter : animateCenterUp}><UButton onClick={deleteCallback} text="Delete" style="secondary" /></div>
            <UButton onClick={replyCallback} text="Reply" marginLeft={8} />
            <UButton onClick={forwardCallback} text="Forward" marginLeft={8} />
        </XView>
    );
};

export const MessagesActionsHeader = (props: { chatId: string }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let engine = React.useContext(MessengerContext).getConversation(props.chatId).messagesActionsStateEngine;

    React.useEffect(() => {
        engine.listen(state => {
            if (containerRef.current) {
                containerRef.current.className = cx(containerClass, state.messages.length && !state.action && containerVisibleClass);
            }
        });
    }, []);

    return (
        <div ref={containerRef} className={containerClass} >
            <XView flexGrow={1} justifyContent="space-between" alignItems="center" flexDirection="row">
                <Counter engine={engine} />
                <Buttons engine={engine} chatId={props.chatId} />
            </XView>
        </div>
    );
    //
};