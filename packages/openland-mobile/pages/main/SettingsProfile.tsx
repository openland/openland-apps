import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Button, ScrollView } from 'react-native';
import { ZSafeAreaView } from '../../components/ZSaveAreaView';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemEdit } from '../../components/ZListItemEdit';
import { AppStyles } from '../../styles/AppStyles';
import { ZQuery } from '../../components/ZQuery';
import { ProfileQuery } from 'openland-api/ProfileQuery';
import { ZForm } from '../../components/ZForm';

class SettingsProfileComponent extends React.Component<NavigationInjectedProps, { firstName: string, lastName: string, loaded: boolean }> {
    static navigationOptions = (args: any) => ({
        title: 'Edit profile',
        headerRight: (
            <View style={{ marginRight: 10 }}>
                <Button
                    onPress={args.navigation.getParam('handleSave')}
                    title="Save"
                    color="#fff"
                />
            </View>
        ),
    })

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            loaded: false,
            firstName: '',
            lastName: ''
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.handleSave });
    }

    handleSave = () => {
        // TODO: Handle save
    }

    render() {
        return (
            <ZQuery query={ProfileQuery} >
                {(resp) => (
                    <ZForm>
                        <ZListItemGroup header="Profile">
                            <ZListItemEdit title="First name" value={resp.data.profile!!.firstName!!} onChange={(v) => this.setState({ firstName: v })} />
                            <ZListItemEdit title="Last name" value={resp.data.profile!!.lastName!!} onChange={(v) => this.setState({ lastName: v })} />
                            <ZListItemEdit title="Role" value={resp.data.profile!!.role!!} />
                        </ZListItemGroup>
                        <ZListItemGroup header="Contacts">
                            <ZListItemEdit title="Phone number" value="" />
                            <ZListItemEdit title="Email" value="" />
                            <ZListItemEdit title="Web Site" value="" />
                            <ZListItemEdit title="Linkedin" value="" />
                        </ZListItemGroup>
                    </ZForm>
                )}
            </ZQuery>
        );
    }
}

export const SettingsProfile = withApp(SettingsProfileComponent);