import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ZScrollView } from '../../../components/ZScrollView';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { ZHeaderButton } from '../../../components/ZHeaderButton';

class TextEditModalComponent extends React.PureComponent<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Edit group name',
        headerAppearance: 'small'
    };
    render() {
        return (
            <>
                <ZHeaderButton navigation={this.props.navigation} title="Save" />
                <ZScrollView>
                    <ZListItemGroup header={null}>
                        <ZListItemEdit title="Group name" value={this.props.navigation.getParam('value')} autoFocus={true} />
                    </ZListItemGroup>
                </ZScrollView>
            </>
        );
    }
}

export const TextEditModal = withApp(TextEditModalComponent, { navigationStyle: 'small' });