import React from 'react';
import { Room_room_SharedRoom } from 'openland-api/spacex.types';
import { showPayConfirm } from 'openland-web/fragments/wallet/modals/showPayConfirm';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XViewRouter } from 'react-mental';
import { OpenlandClient } from 'openland-api/spacex';

interface JoinButtonPremiumProps {
    group: Pick<
        Room_room_SharedRoom,
        'id' | 'isPremium' | 'premiumSettings' | 'title' | 'photo' | 'membership'
    >;
}

export const showPremiumPayConfirm = (
    props: JoinButtonPremiumProps,
    client: OpenlandClient,
    router: XViewRouter,
    onJoined?: () => void,
) => {
    const premiumSettings = props.group.premiumSettings!;
    showPayConfirm({
        amount: premiumSettings.price,
        ...(premiumSettings.interval
            ? { type: 'subscription', interval: premiumSettings.interval }
            : { type: 'payment' }),
        productTitle: props.group.title,
        productDescription: premiumSettings.interval ? 'Subscription' : 'Payment',
        productPicture: (
            <UAvatar title={props.group.title} id={props.group.id} photo={props.group.photo} />
        ),
        action: async () => {
            let passIsActive = false;
            if (premiumSettings.interval) {
                passIsActive = (await client.mutateBuyPremiumChatSubscription({
                    chatId: props.group.id,
                })).betaBuyPremiumChatSubscription.premiumPassIsActive;
            } else {
                passIsActive = (await client.mutateBuyPremiumChatPass({ chatId: props.group.id }))
                    .betaBuyPremiumChatPass.premiumPassIsActive;
            }
            if (passIsActive) {
                router.navigate('/mail/' + props.group.id);
                if (onJoined) {
                    onJoined();
                }
            }
        },
    });
};
