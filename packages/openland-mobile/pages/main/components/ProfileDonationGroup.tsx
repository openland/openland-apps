import * as React from 'react';
import { ZListGroup, ZListGroupProps } from 'openland-mobile/components/ZListGroup';
import { ZButton } from 'openland-mobile/components/ZButton';
import { View } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';

interface ProfileDonationGroupProps extends ZListGroupProps {
    name: string;
    userId?: string;
    chatId?: string;
    shouldHide: boolean;
}

export const ProfileDonationGroup = (props: ProfileDonationGroupProps) => {
    let router = React.useContext(SRouterContext)!;
    let {name, userId, chatId, shouldHide} = props;

    return !shouldHide ? (
        <ZListGroup header={chatId ? 'Support creator' : 'Make a transfer'}>
            <View paddingHorizontal={16} marginTop={8} flexDirection="row">
                {[1, 3, 5].map(price => (
                    <View marginRight={8}>
                        <ZButton 
                            title={`$${price}`} 
                            style="secondary" 
                            onPress={() => router.push('Donation', {initialPrice: price, name, chatId, userId})}
                        />
                    </View>
                ))}
                <ZButton title="Other" style="secondary" onPress={() => router.push('Donation', {name, chatId, userId})} />
            </View>
        </ZListGroup>
    ) : null;
};
