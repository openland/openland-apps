import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { withApp } from '../../components/withApp';
import { withCreateOrganization } from '../../api/withCreateOrganization';
import {
    RootContainer,
    SubTitle,
    Logo,
    Title,
    ContentWrapper,
    FooterText,
    Footer,
} from './components/CreateProfileComponents';
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

const CreateProfileForm = withCreateOrganization(
    withRouter(
        withUserInfo(props => {
            return (
                <RootContainer>
                    <Logo />
                    <ContentWrapper>
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
                            defaultAction={async data => {
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
                            }}
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
                                            text={
                                                InitTexts.create_organization
                                                    .continue
                                            }
                                            size="large"
                                        />
                                    </XVertical>
                                </XFormLoadingContent>
                            </XVertical>
                        </XForm>
                    </ContentWrapper>
                    <Footer>
                        <FooterText>
                            © {new Date().getFullYear()} Openland
                        </FooterText>
                    </Footer>
                </RootContainer>
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
            <CreateProfileForm />
        </>
    );
});
