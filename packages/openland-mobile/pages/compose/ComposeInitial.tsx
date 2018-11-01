import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { ChatSearchForComposeMobileQuery } from 'openland-api';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { ZQuery } from '../../components/ZQuery';
import { ZLoader } from '../../components/ZLoader';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASView } from 'react-native-async-view/ASView';
import { UserShort } from 'openland-api/Types';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASAvatar } from '../../messenger/MobileMessenger';
import { XPStyles } from 'openland-xp/XPStyles';
import { ASText } from 'react-native-async-view/ASText';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

export class UserViewAsync extends React.PureComponent<{ item: UserShort, onPress: (id: string) => void, onLongPress?: () => void, disabled?: boolean }> {

    handlePress = () => {
        this.props.onPress(this.props.item.id);
    }

    render() {
        let item = this.props.item;
        console.warn(JSON.stringify(item));
        return (
            <ASView style={{ height: 60, opacity: this.props.disabled ? 0.5 : 1 }}>
                <ASFlex height={60} flexDirection="row" highlightColor={XPStyles.colors.selectedListItem} onPress={this.props.disabled ? undefined : this.handlePress} onLongPress={this.props.onLongPress}>
                    <ASFlex width={70} height={60} alignItems="center" justifyContent="center">
                        <ASAvatar
                            src={item.picture}
                            size={40}
                            placeholderKey={item.id}
                            placeholderTitle={item.name}
                        />
                    </ASFlex>
                    <ASFlex marginRight={10} marginTop={10} marginBottom={10} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                        <ASText fontSize={16} fontWeight="500" lineHeight={19} height={19} color="#181818" numberOfLines={1}>{item.name}</ASText>
                        {!!item.primaryOrganization && <ASText marginTop={5} fontSize={13} lineHeight={15} height={15} color="#8a8a8f" numberOfLines={1} opacity={0.8}>{item.primaryOrganization.name}</ASText>}
                    </ASFlex>
                    <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                        <ASFlex height={0.5} flexGrow={1} marginLeft={70} backgroundColor={XPStyles.colors.selectedListItem} />
                    </ASFlex>
                </ASFlex>
            </ASView>
        );
    }
}

class UserSearchComponent extends React.Component<PageProps & { query: string }> {
    render() {
        return this.props.query.trim().length > 0 ? (
            <SRouterContext.Consumer>
                {r => (
                    <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ query: this.props.query, organizations: false }}>
                        {resp => {

                            if (resp.loading) {
                                return <ZLoader />;
                            }

                            if (resp.data.items.length === 0) {
                                return (
                                    <KeyboardSafeAreaView><View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No people found' + randomEmptyPlaceholderEmoji()}</Text>
                                    </View></KeyboardSafeAreaView>
                                );

                            }
                            return (
                                <SScrollView keyboardDismissMode="on-drag">
                                    <View style={{ flexDirection: 'column', width: '100%' }}>
                                        {resp.data.items.map((item) => (
                                            <UserViewAsync item={item as UserShort} onPress={(id) => r!.pushAndRemove('Conversation', { flexibleId: id })} />
                                        ))}
                                    </View>

                                </SScrollView>

                            );
                        }}
                    </ZQuery>
                )}
            </SRouterContext.Consumer>
        ) : null;
    }
}
class ComposeInitialComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <SHeader title="New message" />
                <SSearchControler searchRender={(props) => (<UserSearchComponent query={props.query} router={this.props.router} />)}>
                    <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ query: '', organizations: false }}>
                        {resp => {

                            if (resp.loading) {
                                return <ZLoader />;
                            }

                            if (resp.data.items.length === 0) {
                                return (
                                    <KeyboardSafeAreaView><View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No people found' + randomEmptyPlaceholderEmoji()}</Text>
                                    </View></KeyboardSafeAreaView>
                                );

                            }
                            return (
                                <SScrollView keyboardDismissMode="on-drag">
                                    <ZListItemGroup>
                                        <ZListItem leftIcon={require('assets/ic-cell-group-ios.png')} title="Create group" compact={true} path="CreateGroupAttrs" pathRemove={true} />
                                        <ZListItem leftIcon={require('assets/ic-cell-channels-ios.png')} title="Create channel" compact={true} path="CreateChannel" pathRemove={true} />
                                    </ZListItemGroup>
                                    <ZListItemGroup divider={false} header="People">
                                        {resp.data.items.map((item) => (
                                            <UserViewAsync item={item as UserShort} onPress={(id) => this.props.router.pushAndRemove('Conversation', { flexibleId: id })} />
                                        ))}
                                    </ZListItemGroup>

                                </SScrollView>

                            );
                        }}
                    </ZQuery>
                </SSearchControler>
            </>
        );
    }
}

export const ComposeInitial = withApp(ComposeInitialComponent);