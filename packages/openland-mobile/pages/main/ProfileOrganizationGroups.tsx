import * as React from 'react';
import { Organization_organization_rooms } from 'openland-api/Types';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASAvatar } from '../../messenger/MobileMessenger';
import { ASText } from 'react-native-async-view/ASText';
import { View, Image, Platform } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { SRouter } from 'react-native-s/SRouter';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

export class ArrowWrapper extends React.PureComponent {
    render() {
        return (
            <View flexDirection="row">
                <View flexGrow={1}>
                    {this.props.children}
                </View>
                {Platform.OS !== 'android' && (
                    <View position="absolute" pointerEvents="none" alignSelf="center" right={16} >
                        <Image source={require('assets/ic-arrow-cell.png')} alignSelf="center" />
                    </View>
                )}
            </View>
        );
    }
}

export class ChannelViewAsync extends React.PureComponent<{ item: Organization_organization_rooms, onPress: (id: string) => void, onLongPress?: () => void, disabled?: boolean }> {

    handlePress = () => {
        this.props.onPress(this.props.item.id);
    }

    render() {
        let item = this.props.item;
        let membersCount = item.membersCount || 0;
        return (
            <ASView style={{ height: 60, opacity: this.props.disabled ? 0.5 : 1 }}>
                <ASFlex height={60} flexDirection="row" highlightColor={ZStyles.selectedListItem} onPress={this.props.disabled ? undefined : this.handlePress} onLongPress={this.props.onLongPress}>
                    <ASFlex width={70} height={60} alignItems="center" justifyContent="center">
                        <ASAvatar
                            src={item.photo}
                            size={40}
                            placeholderKey={item.id}
                            placeholderTitle={item.title}
                        />
                    </ASFlex>
                    <ASFlex marginRight={10} marginTop={10} marginBottom={10} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                        <ASText fontSize={16} fontWeight="500" lineHeight={19} height={19} color="#181818" numberOfLines={1}>{item.title}</ASText>
                        <ASText marginTop={5} fontSize={13} lineHeight={15} height={15} color="#8a8a8f" numberOfLines={1} opacity={0.8}>{membersCount + (membersCount > 1 ? ' members' : ' member')}</ASText>
                    </ASFlex>
                    {/* <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                        <ASFlex height={0.5} flexGrow={1} marginLeft={60} backgroundColor={XPStyles.colors.separator} />
                    </ASFlex> */}
                </ASFlex>
            </ASView>
        );
    }
}

class ChannelsList extends React.PureComponent<{ channels: (Organization_organization_rooms | null)[], router: SRouter }> {
    render() {
        return (
            <SScrollView>
                <ZListItemGroup divider={false}>
                    {this.props.channels
                        .sort((a, b) => (b!.membersCount || 0) - (a!.membersCount || 0))
                        .map((v) => (
                            <ArrowWrapper>
                                <ChannelViewAsync
                                    key={v!!.id}
                                    item={v!}
                                    onPress={() => this.props.router.push('Conversation', { flexibleId: v!!.id })}
                                />

                            </ArrowWrapper>
                        ))}
                </ZListItemGroup>
            </SScrollView>
        );
    }
}

const ProfileOrganizationGroupsComponent = XMemo<PageProps>((props) => {
    let org = getClient().useOrganization({ organizationId: props.router.params.organizationId });
    return (
        <>
            <SHeader title={props.router.params.title || 'Groups'} />
            <ChannelsList router={props.router} channels={org.organization.rooms} />
        </>
    )
});

export const ProfileOrganizationGroups = withApp(ProfileOrganizationGroupsComponent, { navigationAppearance: 'small-hidden' });
