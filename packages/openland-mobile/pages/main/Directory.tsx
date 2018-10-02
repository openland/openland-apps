import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ExploreOrganizationsQuery } from 'openland-api';
import { PageProps } from '../../components/PageProps';
import { ZAsyncRoutedList } from '../../components/ZAsyncRoutedList';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { OrganizationSearch } from 'openland-api/Types';
import { XPStyles } from 'openland-xp/XPStyles';
import { AsyncAvatar } from '../../messenger/components/AsyncAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

export class DirectoryItemComponent extends React.PureComponent<{ item: OrganizationSearch, router: SRouter }> {
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

class OrganizationSearchComponent extends React.Component<PageProps & { query: string }> {
    render() {
        return this.props.query ? (
            <ZAsyncRoutedList
                key={this.props.query}
                style={{ flexGrow: 1 }}
                query={ExploreOrganizationsQuery}
                variables={{ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]), prefix: this.props.query }}
                renderItem={(item) => {
                    return (
                        <DirectoryItemComponent item={item} router={this.props.router} />
                    );
                }}
            />
        ) : null;
    }
}
class DirectoryComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Organizations" />
                <SHeaderButton title="+ New" onPress={() => this.props.router.push('NewOrganization')}/>
                <SSearchControler searchRender={<OrganizationSearchComponent query="" router={this.props.router} />}>
                    <ZAsyncRoutedList
                        style={{ flexGrow: 1 }}
                        query={ExploreOrganizationsQuery}
                        variables={{ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]) }}
                        renderItem={(item) => {
                            return (
                                <DirectoryItemComponent item={item} router={this.props.router} />
                            );
                        }}
                    />
                </SSearchControler>

            </>
        );
    }
}

export const Directory = withApp(DirectoryComponent);