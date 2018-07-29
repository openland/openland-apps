import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Button, ScrollView } from 'react-native';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemEdit } from '../../components/ZListItemEdit';
import { ZQuery } from '../../components/ZQuery';
import { ProfileQuery } from 'openland-api/ProfileQuery';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ProfileUpdateMutation, AccountQuery } from 'openland-api';

class SettingsProfileComponent extends React.Component<NavigationInjectedProps, { firstName: string, lastName: string, loaded: boolean }> {
    private ref = React.createRef<ZForm>();

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
        if (this.ref.current) {
            this.ref.current!!.submitForm();
        }
    }

    performSave = (mutation: any, data: any) => {
        console.log(data);
    }

    render() {
        return (
            <YMutation mutation={ProfileUpdateMutation} refetchQueries={[AccountQuery]}>
                {(save) => (
                    <ZQuery query={ProfileQuery}>
                        {(resp) => (
                            <ZForm
                                action={async (args) => {
                                    await save({ variables: args });
                                }}
                                ref={this.ref}
                                defaultData={{
                                    input: {
                                        firstName: resp.data.profile!!.firstName,
                                        lastName: resp.data.profile!!.lastName,
                                    }
                                }}
                            >
                                <ZListItemGroup header="Profile">
                                    <ZListItemEdit title="First name" field="input.firstName" />
                                    <ZListItemEdit title="Last name" field="input.lastName" />
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
                )}
            </YMutation>
        );
    }
}

export const SettingsProfile = withApp(SettingsProfileComponent);