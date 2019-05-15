import React from 'react';
import { MessageStateProviderComponent } from 'openland-web/components/messenger/MessagesStateContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XShortcutsRoot } from 'openland-x/XShortcuts';
// import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { CommentsModalInnerNoRouter } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';

const TestWrapper = ({ children }: { children: any }) => {
    const router = React.useContext(XRouterContext) as XRouter;
    return (
        <React.Suspense fallback={<div />}>
            <XShortcutsRoot>
                <MessageStateProviderComponent router={router} cid="">
                    {children}
                </MessageStateProviderComponent>
            </XShortcutsRoot>
        </React.Suspense>
    );
};

export const TestCommentsComponent = () => {
    return (
        <TestWrapper>
            <CommentsModalInnerNoRouter
                messageId="0DkElrP40mfJe1JbL0aXCWKa30"
                roomId="1pm4Xrl3BpiDaQgayqAbuK1gDj"
            />
        </TestWrapper>
    );
};

// export const TestMessengerComponent = () => {
//     return (
//         <TestWrapper>
//             <IsActiveContext.Provider value={true}>
//                 <MessengerFragment id={'1pm4Xrl3BpiDaQgayqAbuK1gDj'} isActive />
//             </IsActiveContext.Provider>
//         </TestWrapper>
//     );
// };
