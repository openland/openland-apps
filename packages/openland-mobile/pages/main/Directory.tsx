import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { ZQuery } from '../../components/ZQuery';
import { ExploreOrganizationsQuery } from 'openland-api';
import { ScrollView, View, Text } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZAvatar } from '../../components/ZAvatar';
import { ZHeaderSearch } from '../../components/ZHeaderSearch';

class DirectoryComponent extends React.PureComponent<NavigationInjectedProps> {
    render() {
        return (
            // <ZQuery query={ExploreOrganizationsQuery}>
            //     {resp => (
            //         <ScrollView>
            //             <ZListItemGroup>
            //                 {resp.data.items.edges.map((v) => (
            //                     <ZListItemBase separator={false} height={56} key={v.node.id} onPress={() => this.props.navigation.navigate('ProfileOrganization', { id: v.node.id })}>
            //                         <View paddingTop={12} paddingLeft={15} paddingRight={15}>
            //                             <ZAvatar size={32} src={v.node.photo} placeholderKey={v.node.id} placeholderTitle={v.node.name} />
            //                         </View>
            //                         <View flexGrow={1} flexBasis={0} alignItems="center" flexDirection="row">
            //                             <Text numberOfLines={1} style={{ fontSize: 16, color: '#181818' }}>{v.node.name}</Text>
            //                         </View>
            //                     </ZListItemBase>
            //                 ))}
            //             </ZListItemGroup>
            //         </ScrollView>
            //     )}
            // </ZQuery>
            <ZHeaderSearch useParent={true} navigation={this.props.navigation}>
                {}
            </ZHeaderSearch>
        );
    }
}

export const Directory = withApp(DirectoryComponent, { noSafeWrapper: true });