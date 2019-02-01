import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { withProfile } from '../../../api/withProfile';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { sanitizeImageRef } from '../../../utils/sanitizer';
import { XFormError } from 'openland-x-forms/XFormError';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XSelect } from 'openland-x/XSelect';
import { XTextArea } from 'openland-x/XTextArea';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Query } from '../../../../../node_modules/react-apollo';
import { MyOrganizationsQuery } from 'openland-api';
import { XInput } from 'openland-x/XInput';
import { XDate } from 'openland-x/XDate';
import { SettingsNavigation } from './components/SettingsNavigation';
import { Content, HeadTitle } from './components/SettingComponents';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';

const CardsWrapper = React.memo<{ children: any }>(props => {
    const { isMobile } = React.useContext(MobileSidebarContext);

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

export default withApp(
    'Profile',
    'viewer',
    withProfile(
        withQueryLoader(props => {
            return (
                <SettingsNavigation title="Profile">
                    <Content>
                        <XVertical separator={21}>
                            <Query query={MyOrganizationsQuery.document}>
                                {orgsData => (
                                    <XVertical separator={25}>
                                        <XForm
                                            defaultData={{
                                                input: {
                                                    firstName: props.data.profile!!.firstName,
                                                    lastName: props.data.profile!!.lastName,
                                                    primaryOrganizationId:
                                                        props.data.profile!!.primaryOrganization &&
                                                        props.data.profile!!.primaryOrganization!!
                                                            .id,
                                                    role: props.data.profile!!.role,
                                                    about: props.data.profile!!.about,
                                                    photoRef: sanitizeImageRef(
                                                        props.data.profile!!.photoRef,
                                                    ),
                                                },
                                            }}
                                            defaultAction={async data => {
                                                await props.updateProfile({
                                                    variables: {
                                                        input: {
                                                            firstName: data.input.firstName,
                                                            lastName: data.input.lastName,
                                                            alphaPrimaryOrganizationId:
                                                                data.input.primaryOrganizationId,
                                                            alphaRole: data.input.role,
                                                            about: data.input.about,
                                                            photoRef: sanitizeImageRef(
                                                                data.input.photoRef,
                                                            ),
                                                        },
                                                    },
                                                });
                                            }}
                                            defaultLayout={false}
                                        >
                                            <XVertical separator={12} maxWidth={660}>
                                                <HeadTitle>Profile</HeadTitle>
                                                <XFormError onlyGeneralErrors={true} />
                                                <XVertical separator={12}>
                                                    <XFormLoadingContent>
                                                        <XHorizontal separator={13}>
                                                            <XVertical
                                                                flexGrow={1}
                                                                maxWidth={480}
                                                                separator={10}
                                                            >
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
                                                                <XSelect
                                                                    title="Primary organization"
                                                                    field="input.primaryOrganizationId"
                                                                    searchable={false}
                                                                    clearable={false}
                                                                    options={(
                                                                        (orgsData.data &&
                                                                            orgsData.data
                                                                                .myOrganizations) ||
                                                                        []
                                                                    ).map((org: any) => ({
                                                                        value: org.id,
                                                                        label: org.name,
                                                                    }))}
                                                                />
                                                                <XView position="relative">
                                                                    <TextAreaTitle>
                                                                        About
                                                                    </TextAreaTitle>
                                                                    <XTextArea
                                                                        valueStoreKey="fields.input.about"
                                                                        resize={false}
                                                                        minHeight={85}
                                                                    />
                                                                </XView>
                                                            </XVertical>
                                                            <XAvatarUpload field="input.photoRef" />
                                                        </XHorizontal>
                                                    </XFormLoadingContent>
                                                    <XFormSubmit
                                                        text="Save changes"
                                                        alignSelf="flex-start"
                                                        style="primary"
                                                        succesText="Changes saved!"
                                                    />
                                                </XVertical>
                                            </XVertical>
                                        </XForm>
                                        <XForm
                                            defaultData={{
                                                shortname: props.data.user!.shortname,
                                            }}
                                            defaultAction={async data => {
                                                await props.setShortname({
                                                    variables: { shortname: data.shortname },
                                                });
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
                                                        succesText="Changes saved!"
                                                    />
                                                </XVertical>
                                            </XVertical>
                                        </XForm>
                                        <XForm
                                            defaultData={{
                                                input: {
                                                    phone: props.data.profile!!.phone,
                                                    email: props.data.profile!!.email,
                                                    website: props.data.profile!!.website,
                                                    linkedin: props.data.profile!!.linkedin,
                                                    // locations: props.data.profile!!.locations
                                                },
                                            }}
                                            defaultAction={async data => {
                                                await props.updateProfile({
                                                    variables: {
                                                        input: {
                                                            phone: data.input.phone,
                                                            email: data.input.email,
                                                            website: data.input.website,
                                                            alphaLinkedin: data.input.linkedin,
                                                            // alphaLocations: data.input.locations
                                                        },
                                                    },
                                                });
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
                                                        </XVertical>
                                                    </XFormLoadingContent>
                                                    <XFormSubmit
                                                        text="Save changes"
                                                        alignSelf="flex-start"
                                                        style="primary"
                                                        succesText="Changes saved!"
                                                    />
                                                </XVertical>
                                            </XVertical>
                                        </XForm>
                                    </XVertical>
                                )}
                            </Query>
                            <XVertical separator={12}>
                                <XWithRole role="super-admin">
                                    <HeadTitle>Super admin</HeadTitle>
                                    <CardsWrapper>
                                        {props.data.profile &&
                                            props.data.profile.joinedAt && (
                                                <CardText>
                                                    Joined
                                                    <XView fontWeight="600" paddingLeft={4}>
                                                        {
                                                            <XDate
                                                                value={String(
                                                                    props.data.profile.joinedAt,
                                                                )}
                                                                format="humanize"
                                                            />
                                                        }
                                                    </XView>
                                                </CardText>
                                            )}
                                        {props.data.profile &&
                                            !props.data.profile.invitedBy && (
                                                <CardText>Self-registered</CardText>
                                            )}
                                        {props.data.profile &&
                                            props.data.profile.invitedBy && (
                                                <CardText>
                                                    Invited by
                                                    <XView
                                                        fontWeight="600"
                                                        paddingLeft={4}
                                                        color="#1790ff"
                                                    >
                                                        {props.data.profile.invitedBy.name ||
                                                            'First name Last name'}
                                                    </XView>
                                                </CardText>
                                            )}
                                    </CardsWrapper>
                                </XWithRole>
                            </XVertical>
                        </XVertical>
                    </Content>
                </SettingsNavigation>
            );
        }),
    ),
);
