import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';
import { ZQuery } from '../../../components/ZQuery';
import { UsersQuery } from 'openland-api';
import { ZListItem } from '../../../components/ZListItem';

class UserPickerComponent extends React.PureComponent<NavigationInjectedProps> {

    static navigationOptions = {
        title: 'Add Member',
        headerAppearance: 'small'
    };

    render() {
        return (
            <ZQuery query={UsersQuery} variables={{query: ''}}>
                {(reponse) => (
                    <ZScrollView>
                        {reponse.data.items.map((v) => (
                            <ZListItem text={v.title} />
                        ))}
                    </ZScrollView>
                )}
            </ZQuery>
        );
    }
}

export const UserPicker = withApp(UserPickerComponent, { navigationStyle: 'small' });