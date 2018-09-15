import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ExploreOrganizationsQuery } from 'openland-api';
import { PageProps } from '../../components/PageProps';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { ZAsyncRoutedList } from '../../components/ZAsyncRoutedList';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { OrganizationSearchFragment } from 'openland-api/Types';
import { XPStyles } from 'openland-xp/XPStyles';
// import { FastRouter } from 'react-native-fast-navigation/FastRouter';
import { AsyncAvatar } from '../../messenger/components/AsyncAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { SHeader } from 'react-native-s/SHeader';

class DirectoryItemComponent extends React.PureComponent<{ item: OrganizationSearchFragment, router: SRouter }> {
    render() {
        return (
            <ASFlex height={56} flexDirection="row" alignItems="center" highlightColor={XPStyles.colors.selectedListItem} onPress={() => this.props.router.push('ProfileOrganization', { id: this.props.item.id })}>
                <ASFlex marginLeft={15} marginRight={15}>
                    <AsyncAvatar size={32} placeholderKey={this.props.item.id} placeholderTitle={this.props.item.name} src={this.props.item.photo} />
                </ASFlex>
                <ASText fontSize={16} height={56} lineHeight={38} color="#181818" numberOfLines={1}>{this.props.item.name}</ASText>
                <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                    <ASFlex height={0.5} flexGrow={1} marginLeft={62} backgroundColor={XPStyles.colors.selectedListItem} />
                </ASFlex>
            </ASFlex>
        );
    }
}
class DirectoryComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Organizations" />
                <ZAsyncRoutedList
                    style={{ flexGrow: 1 }}
                    query={ExploreOrganizationsQuery}
                    renderItem={(item) => {
                        return (
                            <DirectoryItemComponent item={item} router={this.props.router} />
                        );
                    }}
                />
                {/* <ZQuery query={ExploreOrganizationsQuery} variables={{ sort: '[{"featured":{"order":"desc"}},{"createdAt":{"order":"desc"}}]' }}>
                    {resp => (
                        <ZScrollView backgroundColor="#fff">
                            <ZListItemGroup>
                                {resp.data.items.edges.map((v) => (
                                    <ZListItemBase separator={false} height={56} key={v.node.id} onPress={() => this.props.router.push('ProfileOrganization', { id: v.node.id })}>
                                        <View paddingTop={12} paddingLeft={15} paddingRight={15}>
                                            <XPAvatar size={32} src={v.node.photo} placeholderKey={v.node.id} placeholderTitle={v.node.name} />
                                        </View>
                                        <View flexGrow={1} flexBasis={0} alignItems="center" flexDirection="row">
                                            <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.node.name}</Text>
                                        </View>
                                    </ZListItemBase>
                                ))}
                            </ZListItemGroup>
                        </ZScrollView>
                    )}
                </ZQuery> */}
            </>
        );
    }
}

export const Directory = withApp(DirectoryComponent);