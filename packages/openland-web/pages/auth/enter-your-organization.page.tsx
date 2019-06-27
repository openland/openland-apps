import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XButton } from 'openland-x/XButton';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XInput } from 'openland-x/XInput';
import { XPopper } from 'openland-x/XPopper';
import IcInfo from 'openland-icons/ic-info.svg';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from 'openland-web/pages/init/_text';
import { switchOrganization } from 'openland-web/utils/switchOrganization';
import {
    ContentWrapper,
    Title,
    ButtonsWrapper,
    SubTitle,
} from 'openland-web/pages/init/components/SignComponents';
import { trackEvent } from 'openland-x-analytics';
import Glamorous from 'glamorous';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';

const XIconWrapper = Glamorous.span({
    fontSize: 20,
    marginLeft: 11,

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

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

const InfoText = Glamorous.span({
    fontSize: 14,
});

const organizationInputClassName = css`
    width: 300px;
    @media (max-width: 450px) {
        width: 250px;
    }
`;

const organizationInputErrorClassName = css`
    display: flex;
    align-self: flex-start;
`;

const ShowOrgError = ({ message }: { message: string }) => {
    const [onceRender, setOnceRender] = React.useState(false);

    if (!onceRender) {
        trackEvent('signup_org_error');

        setOnceRender(true);
    }

    return (
        <div className={cx(organizationInputClassName, organizationInputErrorClassName)}>
            <XErrorMessage message={message} />
        </div>
    );
};

const CreateOrganizationFormInner = (props: { roomView: boolean }) => {
    let router = React.useContext(XRouterContext)!;
    const client = useClient();
    const form = useForm();
    const { roomView } = props;

    let organizationField = useField('input.organization', '', form, [
        {
            checkIsValid: (value: string) => value !== '',
            text: InitTexts.auth.organizationIsEmptyError,
        },
    ]);
    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            let result = await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: organizationField.value,
                    // id: data.id,
                },
            });
            trackEvent('registration_complete');
            switchOrganization(result.organization.id, router.query.redirect);
            router.push('/onboarding/discover');
        });
    }, []);

    return (
        <XTrack event="signup_org_view">
            <ContentWrapper>
                <Title roomView={roomView} className="title">
                    {InitTexts.create_organization.title}
                </Title>
                <SubTitle className="subtitle">{InitTexts.create_organization.subTitle}</SubTitle>

                <XVertical separator="large">
                    <ButtonsWrapper marginBottom={84} marginTop={34}>
                        <div>
                            <XVertical alignItems="center" separator="none">
                                <XVertical separator="none" alignItems="center">
                                    <>
                                        <XHorizontal alignItems="center" separator="none">
                                            <XInput
                                                invalid={!!form.error}
                                                size="large"
                                                title="Organization name"
                                                dataTestId="organization"
                                                flexGrow={1}
                                                className={organizationInputClassName}
                                                {...organizationField.input}
                                            />
                                            <XPopper
                                                content={
                                                    <InfoText>
                                                        To register as an individual, simply enter
                                                        your name
                                                    </InfoText>
                                                }
                                                showOnHover={true}
                                                placement="top"
                                                style="dark"
                                            >
                                                <XIconWrapper>
                                                    <IcInfo />
                                                </XIconWrapper>
                                            </XPopper>
                                        </XHorizontal>
                                        {form.error && <ShowOrgError message={form.error} />}
                                    </>
                                </XVertical>

                                <XView marginTop={50}>
                                    <XButton
                                        dataTestId="continue-button"
                                        style="primary"
                                        text={InitTexts.create_organization.continue}
                                        size="large"
                                        onClick={doConfirm}
                                    />
                                </XView>
                            </XVertical>
                        </div>
                    </ButtonsWrapper>
                </XVertical>
            </ContentWrapper>
        </XTrack>
    );
};

export const EnterYourOrganizationPage = () => {
    let router = React.useContext(XRouterContext)!;

    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(4)} />
            <XView marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        router.replace('/auth2/introduce-yourself');
                    }}
                    onSkip={() => {
                        router.push('/onboarding/discover');
                    }}
                />
            </XView>

            <CreateOrganizationFormInner roomView={false} />
        </div>
    );
};

export default withApp('Home', 'viewer', EnterYourOrganizationPage);
