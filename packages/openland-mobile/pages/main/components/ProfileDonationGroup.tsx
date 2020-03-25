import * as React from 'react';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZButton } from 'openland-mobile/components/ZButton';
import { View } from 'react-native';
import { SRouterContext } from 'react-native-s/SRouterContext';

interface ProfileDonationGroupProps {
    user: {name: string, id: string};
}

export const ProfileDonationGroup = (props: ProfileDonationGroupProps) => {
    let router = React.useContext(SRouterContext)!;
    let showDonation = null;

    return showDonation && (
        <ZListGroup header="Make donation">
            <View paddingHorizontal={16} marginTop={8} flexDirection="row">
                {[1, 3, 5].map(price => (
                    <View marginRight={8}>
                        <ZButton 
                            title={`$${price}`} 
                            style="secondary" 
                            onPress={() => router.push('Donation', {initialPrice: price, user: props.user})}
                        />
                    </View>
                ))}
                <ZButton title="Other" style="secondary" onPress={() => router.push('Donation', {user: props.user})} />
            </View>
        </ZListGroup>
    );
};
