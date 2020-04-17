import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XViewRouterContext, XView } from 'react-mental';
import { showDonation } from 'openland-web/fragments/chat/components/showDonation';
import { useToast } from 'openland-web/components/unicorn/UToast';

interface ProfileDonationButtonsProps {
    name: string;
    userId?: string;
    chatId?: string;
    shouldHide: boolean;
}

export const ProfileDonationButtons = (props: ProfileDonationButtonsProps) => {
    let router = React.useContext(XViewRouterContext)!;
    let toastHandlers = useToast();
    let onDonate = (value: string) => {
        let id = props.chatId || props.userId;
        router.navigate(`/mail/${id}`);
        toastHandlers.show({
            type: 'success',
            text: `You’ve donated $${value}`,
        });
    };

    return !props.shouldHide ? (
        <UListGroup header="Make donation">
            <XView paddingHorizontal={16} flexDirection="row">
            {[1, 3, 5].map(price => (
                <XView marginRight={8}>
                    <UButton 
                        text={`$${price}`} 
                        style="secondary" 
                        onClick={() => showDonation({
                            name: props.name, 
                            userId: props.userId, 
                            chatId: props.chatId, 
                            initialPrice: price,
                            onDonate
                        })}
                    />
                </XView>
            ))}
            <UButton 
                text="Other" 
                style="secondary" 
                onClick={() => showDonation({
                    name: props.name, 
                    userId: props.userId, 
                    chatId: props.chatId,
                    onDonate
                })} 
            />
            </XView>
        </UListGroup>
    ) : null;
};
