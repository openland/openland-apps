import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { sanitizeImageRef } from '../../../utils/sanitizer';
import { XFormError } from 'openland-x-forms/XFormError';
import { XSelect } from 'openland-x/XSelect';
import { XTextArea } from 'openland-x/XTextArea';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { MyOrganizationsQuery } from 'openland-api';
import { XInput } from 'openland-x/XInput';
import { XDate } from 'openland-x/XDate';
import { SettingsNavigation } from './components/SettingsNavigation';
import { Content, HeadTitle } from './components/SettingComponents';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XCheckbox } from 'openland-x/XCheckbox';
import { EmojiFlags } from 'openland-y-utils/emoji';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';

const CardsWrapper = XMemo<{ children: any }>(props => {
    const isMobile = React.useContext(IsMobileContext);

    return isMobile ? (
        <XVertical separator={8}>{props.children}</XVertical>
    ) : (
            <XHorizontal separator={8}>{props.children}</XHorizontal>
        );
});

const CardText = (props: { children?: any }) => (
    <XView
        flexDirection="row"
        alignItems="center"
        alignSelf="flex-start"
        borderRadius={10}
        borderWidth={1}
        borderColor="rgba(220, 222, 228, 0.45)"
        paddingLeft={16}
        paddingRight={16}
        paddingTop={16}
        paddingBottom={16}
        fontSize={14}
        lineHeight={1.43}
        color="#334562"
    >
        {props.children}
    </XView>
);

const TextAreaTitle = (props: { children?: any }) => (
    <XView
        top={-10}
        left={13}
        height={20}
        fontSize={12}
        lineHeight="20px"
        position="absolute"
        paddingLeft={3}
        paddingRight={3}
        backgroundColor="white"
        color="rgba(0, 0, 0, 0.4)"
        zIndex={2}
    >
        {props.children}
    </XView>
);

class MakeWebFastCheckbox extends React.PureComponent<{}, { fast: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { fast: canUseDOM && localStorage.getItem('meke_web_great_again') === 'true' };
    }

    onChange = (checked: { label: string; checked: boolean }) => {
        localStorage.setItem('meke_web_great_again', checked.checked ? 'true' : 'false');
        this.setState({ fast: checked.checked });
        EmojiFlags.ignoreEmojione = checked.checked;
    };

    render() {
        return (
            <XCheckbox
                label="Make web great again"
                checked={this.state.fast}
                onChange={this.onChange}
            />
        );
    }
}

export default withApp('Profile', 'viewer', () => {
    const client = useClient();
    const profile = client.useProfile().profile!;
    const user = client.useProfile().user!;
    const organizations = client.useMyOrganizations();
    return (
        <SettingsNavigation title="Profile">
            <Content>
                <XVertical separator={21}>
                    <XVertical separator={25}>
                        <XForm
                            defaultData={{
                                input: {
                                    firstName: profile.firstName,
                                    lastName: profile.lastName,
                                    primaryOrganizationId:
                                        profile.primaryOrganization &&
                                        profile.primaryOrganization!!.id,
                                    role: profile.role,
                                    about: profile.about,
                                    photoRef: sanitizeImageRef(profile.photoRef),
                                },
                            }}
                            defaultAction={async data => {
                                await client.mutateProfileUpdate({
                                    input: {
                                        firstName: data.input.firstName,
                                        lastName: data.input.lastName,
                                        alphaPrimaryOrganizationId:
                                            data.input.primaryOrganizationId,
                                        alphaRole: data.input.role,
                                        about: data.input.about,
                                        photoRef: sanitizeImageRef(data.input.photoRef),
                                    },
                                });
                                await client.refetchAccount();
                                await client.refetchMyOrganizations();
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={12} maxWidth={660}>
                                <HeadTitle>Profile</HeadTitle>
                                <XFormError onlyGeneralErrors={true} />
                                <XVertical separator={12}>
                                    <XFormLoadingContent>
                                        <XVertical
                                            flexGrow={1}
                                            maxWidth={480}
                                            separator={10}
                                        >
                                            <XHorizontal separator={13}>
                                                <XVertical flexGrow={1} separator={10}>
                                                    <XInput
                                                        title="First name"
                                                        field="input.firstName"
                                                        size="large"
                                                    />
                                                    <XInput
                                                        title="Last name"
                                                        field="input.lastName"
                                                        size="large"
                                                    />
                                                </XVertical>
                                                <XAvatarUpload
                                                    field="input.photoRef"
                                                    size="xSmall"
                                                />
                                            </XHorizontal>
                                            <XVertical flexGrow={1} separator={10}>
                                                <XSelect
                                                    title="Primary organization"
                                                    field="input.primaryOrganizationId"
                                                    searchable={false}
                                                    clearable={false}
                                                    options={organizations.myOrganizations.map((org: any) => ({
                                                        value: org.id,
                                                        label: org.name,
                                                    }))}
                                                />
                                                <XView position="relative">
                                                    <TextAreaTitle>About</TextAreaTitle>
                                                    <XTextArea
                                                        valueStoreKey="fields.input.about"
                                                        resize={false}
                                                        minHeight={85}
                                                    />
                                                </XView>
                                            </XVertical>
                                        </XVertical>
                                    </XFormLoadingContent>
                                    <XFormSubmit
                                        text="Save changes"
                                        alignSelf="flex-start"
                                        style="primary"
                                        successText="Changes saved!"
                                    />
                                </XVertical>
                            </XVertical>
                        </XForm>
                        <XForm
                            defaultData={{
                                shortname: user.shortname,
                            }}
                            defaultAction={async data => {
                                await client.mutateSetUserShortname({
                                    shortname: data.shortname,
                                });
                                await client.refetchAccount();
                            }}
                        >
                            <XVertical separator={12}>
                                <HeadTitle>Username</HeadTitle>
                                <XFormError onlyGeneralErrors={true} />
                                <XVertical maxWidth={480} separator={12}>
                                    <XFormLoadingContent>
                                        <XVertical separator={10}>
                                            <XInput
                                                field="shortname"
                                                size="large"
                                                title="Username"
                                            />
                                        </XVertical>
                                    </XFormLoadingContent>
                                    <XFormSubmit
                                        text="Save changes"
                                        alignSelf="flex-start"
                                        style="primary"
                                        successText="Changes saved!"
                                    />
                                </XVertical>
                            </XVertical>
                        </XForm>
                        <XForm
                            defaultData={{
                                input: {
                                    phone: profile.phone,
                                    email: profile.email,
                                    website: profile.website,
                                    linkedin: profile.linkedin,
                                    location: profile.location,
                                },
                            }}
                            defaultAction={async data => {
                                await client.mutateProfileUpdate({
                                    input: {
                                        phone: data.input.phone,
                                        email: data.input.email,
                                        website: data.input.website,
                                        alphaLinkedin: data.input.linkedin,
                                        location: data.input.location,
                                    },
                                });
                                await client.refetchAccount();
                                await client.refetchMyOrganizations();
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={12}>
                                <HeadTitle>Contacts</HeadTitle>
                                <XFormError onlyGeneralErrors={true} />
                                <XVertical maxWidth={480} separator={12}>
                                    <XFormLoadingContent>
                                        <XVertical separator={10}>
                                            <XInput
                                                field="input.phone"
                                                size="large"
                                                title="Phone number"
                                            />
                                            <XInput
                                                field="input.email"
                                                size="large"
                                                title="Email"
                                            />
                                            <XInput
                                                field="input.website"
                                                size="large"
                                                title="Website"
                                            />
                                            <XInput
                                                field="input.linkedin"
                                                size="large"
                                                title="LinkedIn"
                                            />
                                            <XInput
                                                field="input.location"
                                                size="large"
                                                title="Location"
                                            />
                                        </XVertical>
                                    </XFormLoadingContent>
                                    <XFormSubmit
                                        text="Save changes"
                                        alignSelf="flex-start"
                                        style="primary"
                                        successText="Changes saved!"
                                    />
                                </XVertical>
                            </XVertical>
                        </XForm>
                    </XVertical>
                    <XVertical separator={12}>
                        <XWithRole role="super-admin">
                            <HeadTitle>Super admin</HeadTitle>
                            <CardsWrapper>
                                {profile && profile.joinedAt && (
                                    <CardText>
                                        Joined
                                        <XView fontWeight="600" paddingLeft={4}>
                                            {
                                                <XDate
                                                    value={String(profile.joinedAt)}
                                                    format="humanize"
                                                />
                                            }
                                        </XView>
                                    </CardText>
                                )}
                                {!profile.invitedBy && <CardText>Self-registered</CardText>}
                                {profile.invitedBy && (
                                    <CardText>
                                        Invited by
                                        <XView fontWeight="600" paddingLeft={4} color="#1790ff">
                                            {profile.invitedBy.name || 'First name Last name'}
                                        </XView>
                                    </CardText>
                                )}
                                <XVertical separator={2}>
                                    <MakeWebFastCheckbox />
                                </XVertical>
                            </CardsWrapper>
                        </XWithRole>
                    </XVertical>
                </XVertical>
            </Content>
        </SettingsNavigation>
    );
});
