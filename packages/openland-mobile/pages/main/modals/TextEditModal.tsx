import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ZScrollView } from '../../../components/ZScrollView';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { ZHeaderButton } from '../../../components/ZHeaderButton';
import { stopLoader, startLoader } from '../../../components/ZGlobalLoader';
import { Keyboard } from 'react-native';
import { ZHeader } from '../../../components/ZHeader';

class TextEditModalComponent extends React.PureComponent<NavigationInjectedProps, { value: string }> {

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            value: this.props.navigation.getParam('value', '')
        };
    }

    handleSave = async () => {
        if (this.state.value === this.props.navigation.getParam('value', '')) {
            this.props.navigation.goBack();
            return;
        }
        let action = this.props.navigation.getParam('action') as (value: string) => any;
        try {
            Keyboard.dismiss();
            startLoader();
            let res = await action(this.state.value);
            this.props.navigation.goBack();
        } catch (e) {
            // 
        } finally {
            stopLoader();
        }
    }

    handleChange = (value: string) => {
        this.setState({ value });
    }

    render() {
        return (
            <>
                <ZHeader title="Edit group name" />
                <ZHeaderButton title="Save" onPress={this.handleSave} />
                <ZScrollView>
                    <ZListItemGroup header={null}>
                        <ZListItemEdit title="Group name" value={this.state.value} onChange={this.handleChange} autoFocus={true} />
                    </ZListItemGroup>
                </ZScrollView>
            </>
        );
    }
}

export const TextEditModal = withApp(TextEditModalComponent, { navigationAppearance: 'small' });