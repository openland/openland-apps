import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import LinearGradient from 'react-native-linear-gradient';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { GroupPriceSettings, DistributionType } from '../compose/CreateGroupAttrs';

const EditGroupPriceComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const group = client.useRoomChat(
        { id: props.router.params.id },
        { fetchPolicy: 'network-only' },
    ).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const form = useForm();

    const distributionField = useField<DistributionType>(
        'distribution',
        DistributionType.FREE,
        form,
    );
    const priceField = useField<string>('price', '1', form, [
        {
            checkIsValid: (x) => {
                return /^[0-9]*$/.test(x);
            },
            text: 'Numbers only',
        },
        {
            checkIsValid: (x) => {
                return Number(x) <= 1000;
            },
            text: '$1000 maximum',
        },
        {
            checkIsValid: (x) => {
                return Number(x) >= 1;
            },
            text: '$1 minimum',
        },
    ]);
    const intervalField = useField<WalletSubscriptionInterval | null>('interval', null, form);

    return (
        <>
            <SHeaderButton title="Save" onPress={() => props.router.back()} />
            <SScrollView>
                <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]}>
                    <View
                        alignItems="center"
                        justifyContent="center"
                        paddingTop={16}
                        paddingBottom={32}
                    >
                        <View
                            width={80}
                            height={80}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={80}
                            backgroundColor={theme.tintPurple}
                        >
                            <Image
                                source={require('assets/ic-wallet-glyph-48.png')}
                                style={{
                                    width: 48,
                                    height: 48,
                                    tintColor: theme.foregroundContrast,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                ...TextStyles.Title2,
                                color: theme.foregroundPrimary,
                                textAlign: 'center',
                                marginTop: 16,
                            }}
                            allowFontScaling={false}
                        >
                            Payments
                        </Text>
                        <Text
                            style={{
                                ...TextStyles.Body,
                                color: theme.foregroundTertiary,
                                textAlign: 'center',
                                maxWidth: 300,
                                marginTop: 4,
                            }}
                            allowFontScaling={false}
                        >
                            Set up monetization of your group. All changes will affect only new
                            members
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null}>
                    <GroupPriceSettings
                        distributionField={distributionField}
                        intervalField={intervalField}
                        priceField={priceField}
                    />
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const EditGroupPrice = withApp(EditGroupPriceComponent, { navigationAppearance: 'small' });
