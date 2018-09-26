import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { stopLoader, startLoader } from '../../../components/ZGlobalLoader';
import { Keyboard } from 'react-native';
import { PageProps } from '../../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';
// import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';

class TextEditModalComponent extends React.PureComponent<PageProps, { value: string }> {

    constructor(props: PageProps) {
        super(props);
        this.state = {
            value: this.props.router.params.value || ''
        };
    }

    handleSave = async () => {
        if (this.state.value === (this.props.router.params.value || '')) {
            this.props.router.back();
            return;
        }
        let action = this.props.router.params.action as (value: string) => any;
        try {
            Keyboard.dismiss();
            startLoader();
            let res = await action(this.state.value);
            this.props.router.back();
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
                {/* <FastHeader title="Edit group name" />
                <FastHeaderButton title="Save" onPress={this.handleSave} /> */}
                <SHeader />
                <SHeaderButton title="Save" onPress={this.handleSave} />
                <SScrollView>
                    <ZListItemGroup header={null}>
                        <ZListItemEdit title="Group name" value={this.state.value} onChange={this.handleChange} autoFocus={true} />
                    </ZListItemGroup>
                </SScrollView>
            </>
        );
    }
}

export const TextEditModal = withApp(TextEditModalComponent, { navigationAppearance: 'small' });