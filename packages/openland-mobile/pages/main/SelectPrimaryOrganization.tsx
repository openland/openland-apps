import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SScrollView } from 'react-native-s/SScrollView';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Platform, View } from 'react-native';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';

const SelectPrimaryOrganizationComponent = (props: PageProps) => {
    let organizations = getClient().useMyOrganizations({ fetchPolicy: 'network-only' }).myOrganizations;

    return (
        <>
            <SHeader title="Primary organization" />
            <SScrollView>
                <View marginTop={Platform.OS === 'ios' ? 5 : undefined} />

                <ZListGroup footer="Choose organization that people will see in your profile.">
                    {organizations.map(org => (
                        <ZListItem
                            text={org.name}
                            leftAvatar={{
                                photo: org.photo,
                                id: org.id,
                                title: org.name
                            }}
                            checkmark={org.isPrimary}
                            onPress={org.isPrimary ? undefined : async () => {
                                startLoader();

                                await getClient().mutateProfileUpdate({
                                    input: {
                                        primaryOrganization: org.id
                                    }
                                });

                                await getClient().refetchMyOrganizations();
                                await getClient().refetchAccount();

                                stopLoader();

                                props.router.back();
                            }}
                        />
                    ))}
                </ZListGroup>
            </SScrollView>
        </>
    );
};

export const SelectPrimaryOrganization = withApp(SelectPrimaryOrganizationComponent, { navigationAppearance: 'small' });
