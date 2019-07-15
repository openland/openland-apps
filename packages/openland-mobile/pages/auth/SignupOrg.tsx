import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { getMessenger } from 'openland-mobile/utils/messenger';

class SignupOrgComponent extends React.PureComponent<PageProps, { name: string }> {
    private ref = React.createRef<ZForm>();

    constructor(props: PageProps) {
        super(props);

        this.state = {
            name: ''
        };
    }

    handleNameChange = (text: string) => {
        this.setState({
            name: text
        });
    }

    render() {
        const { name } = this.state;
        const canSkip = name.length <= 0;

        return (
            <ZTrack event="signup_org_view">
                <SHeader title="New organization" />
                <SHeaderButton key={'btn-' + canSkip} title={canSkip ? 'Skip' : 'Next'} onPress={() => { this.ref.current!.submitForm(); }} />
                <ZForm
                    ref={this.ref}
                    action={async (src) => {
                        let client = getClient();

                        let res = await client.mutateCreateOrganization({
                            input: {
                                name: canSkip ? getMessenger().engine.user.name : name,
                                personal: false,
                                isCommunity: false,
                                ...src.input
                            },
                        });

                        await client.refetchAccount();
                        await client.refetchAccountSettings();

                        if (this.props.router.params.action) {
                            await this.props.router.params.action(this.props.router);
                        } else {
                            this.props.router.pushAndRemove('ProfileOrganization', { id: res.organization.id });
                        }
                    }}
                >
                    <ZListItemGroup header={null} alignItems="center">
                        <ZAvatarPicker field="input.photoRef" size="xx-large" />
                    </ZListItemGroup>

                    <ZListItemGroup header={null}>
                        <ZInput
                            placeholder="Organization name"
                            autoFocus={true}
                            description="Please, provide organization name and optional logo"
                            onChangeText={this.handleNameChange}
                        />
                    </ZListItemGroup>
                </ZForm>
            </ZTrack>
        );
    }
}

export const SignupOrg = withApp(SignupOrgComponent);