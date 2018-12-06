import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { withApp } from '../../components/withApp';
import { withCreateOrganization } from '../../api/withCreateOrganization';
import { SubTitle, Title } from './components/CreateProfileComponents';
import { withRouter } from 'next/router';
import { withUserInfo } from '../../components/UserInfo';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { XPopper } from 'openland-x/XPopper';
import { delayForewer } from 'openland-y-utils/timer';
import { XInput } from 'openland-x/XInput';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { sanitizeIamgeRef } from '../../utils/sanitizer';
import IcInfo from './components/icons/ic-info.svg';
import { SignContainer, RoomSignup } from './components/SignComponents';

const XInputWrapper = Glamorous(XInput)({
    minWidth: 330,
});

const InfoText = Glamorous.span({
    fontSize: 14,
});

const XIconWrapper = Glamorous.span({
    fontSize: 20,
    marginLeft: 5,

    '& svg': {
        marginBottom: -3,
    },

    '&:hover': {
        cursor: 'pointer',
        '& svg': {
            '& > g > path:last-child': {
                fill: '#1790ff',
                opacity: 1,
            },
        },
    },
});

export const CreateOrganizationFormInner = ({
    defaultAction,
}: {
    defaultAction: (data: any) => any;
}) => {
    return (
        <div>
            <Title>{InitTexts.create_organization.title}</Title>
            <SubTitle>
                {InitTexts.create_organization.subTitle}

                <XPopper
                    content={
                        <InfoText>
                            To register as an individual,
                            <br />
                            simply enter your name
                        </InfoText>
                    }
                    showOnHover={true}
                    placement="bottom"
                    style="dark"
                >
                    <XIconWrapper>
                        <IcInfo />
                    </XIconWrapper>
                </XPopper>
            </SubTitle>
            <XForm
                defaultAction={defaultAction}
                defaultData={{
                    input: {
                        name: '',
                        website: '',
                        photoRef: null,
                    },
                }}
                defaultLayout={false}
            >
                <XVertical separator="large">
                    <XFormError width={472} />
                    <XFormLoadingContent>
                        <XVertical alignItems="center">
                            <XInputWrapper
                                field="input.name"
                                size="large"
                                title={
                                    InitTexts.create_organization
                                        .namePlaceholder
                                }
                            />

                            <XFormSubmit
                                style="primary"
                                text={InitTexts.create_organization.continue}
                                size="large"
                            />
                        </XVertical>
                    </XFormLoadingContent>
                </XVertical>
            </XForm>
        </div>
    );
};

export const CreateOrganizationForm = withCreateOrganization(
    withRouter(
        withUserInfo((props: any) => {
            const Container = props.roomView ? RoomSignup : SignContainer;

            return (
                <Container>
                    <CreateOrganizationFormInner
                        {...{
                            defaultAction: async (data: any) => {
                                let res = await props.createOrganization({
                                    variables: {
                                        input: {
                                            personal: false,
                                            name: data.input.name,
                                            website: data.input.website,
                                            photoRef: sanitizeIamgeRef(
                                                data.input.photoRef,
                                            ),
                                        },
                                    },
                                });
                                switchOrganization(
                                    res.data.createOrganization.id,
                                    props.router.query.redirect,
                                );
                                await delayForewer();
                            },
                        }}
                    />
                </Container>
            );
        }),
    ),
);

export default withApp('Create Organization', 'viewer', props => {
    return (
        <>
            <XDocumentHead
                title={InitTexts.create_organization.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <CreateOrganizationForm />
        </>
    );
});
