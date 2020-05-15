import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XViewRouterContext, XView } from 'react-mental';
import { useDonationModal } from 'openland-web/fragments/chat/components/showDonation';

interface ProfileDonationButtonsProps {
    name: string;
    userId?: string;
    chatId?: string;
    chatTitle?: string;
    shouldHide: boolean;
}

const PriceButton = (props: { price?: number, name: string, userId?: string, chatId?: string, chatTitle?: string, onDonate: () => void }) => {
    let showDonation = useDonationModal({
        name: props.name,
        chatId: props.chatId,
        chatTitle: props.chatTitle,
        userId: props.userId,
        initialPrice: props.price,
        onDonate: props.onDonate,
    });
    return (
        <UButton
            text={props.price ? `$${props.price}` : 'Other'}
            style="secondary"
            onClick={showDonation}
        />
    );
};

export const ProfileDonationButtons = (props: ProfileDonationButtonsProps) => {
    let router = React.useContext(XViewRouterContext)!;
    let onDonate = () => {
        let id = props.chatId || props.userId;
        router.navigate(`/mail/${id}`);
    };

    return !props.shouldHide ? (
        <UListGroup header="Make donation">
            <XView paddingHorizontal={16} flexDirection="row">
                {[1, 3, 5].map(price => (
                    <XView marginRight={8}>
                        <PriceButton
                            price={price}
                            name={props.name}
                            userId={props.userId}
                            chatId={props.chatId}
                            chatTitle={props.chatTitle}
                            onDonate={onDonate}
                        />
                    </XView>
                ))}
                <PriceButton
                    name={props.name}
                    userId={props.userId}
                    chatId={props.chatId}
                    chatTitle={props.chatTitle}
                    onDonate={onDonate}
                />
            </XView>
        </UListGroup>
    ) : null;
};
