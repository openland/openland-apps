import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZButton } from 'openland-mobile/components/ZButton';
import { View } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';

interface ProfileDonationGroupProps {
    name: string;
    userId?: string;
    chatId?: string;
}

export const ProfileDonationGroup = (props: ProfileDonationGroupProps) => {
    let router = React.useContext(SRouterContext)!;

    return (
        <ZListGroup header="Make donation">
            <View paddingHorizontal={16} marginTop={8} flexDirection="row">
                {[1, 3, 5].map(price => (
                    <View marginRight={8}>
                        <ZButton 
                            title={`$${price}`} 
                            style="secondary" 
                            onPress={() => router.push('Donation', {initialPrice: price, name: props.name, chatId: props.chatId, userId: props.userId})}
                        />
                    </View>
                ))}
                <ZButton title="Other" style="secondary" onPress={() => router.push('Donation', {name: props.name, chatId: props.chatId, userId: props.userId})} />
            </View>
        </ZListGroup>
    );
};
