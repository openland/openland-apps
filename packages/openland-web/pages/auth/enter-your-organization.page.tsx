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
import { XInput } from 'openland-x/XInput';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { XFormField2 } from 'openland-x-forms/XFormField2';
import { XPopper } from 'openland-x/XPopper';
import IcInfo from 'openland-icons/ic-info.svg';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from 'openland-web/pages/init/_text';
import {
    ContentWrapper,
    Title,
    ButtonsWrapper,
    SubTitle,
} from 'openland-web/pages/init/components/SignComponents';
import { trackEvent } from 'openland-x-analytics';
import Glamorous from 'glamorous';

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

const ShowOrgError = () => {
    const [onceRender, setOnceRender] = React.useState(false);

    if (!onceRender) {
        trackEvent('signup_org_error');

        setOnceRender(true);
    }

    return (
        <div className={cx(organizationInputClassName, organizationInputErrorClassName)}>
            <XFormError field="input.organization" />
        </div>
    );
};

export class CreateOrganizationFormInner extends React.Component<
    {
        onPrefixChanges: (prefix: string) => void;
        roomView: boolean;
        defaultAction: (data: any) => any;
        organizations: any;
    },
    {
        inputValue: string;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    render() {
        const { roomView, defaultAction } = this.props;

        return (
            <XTrack event="signup_org_view">
                <ContentWrapper>
                    <Title roomView={roomView} className="title">
                        {InitTexts.create_organization.title}
                    </Title>
                    <SubTitle className="subtitle">
                        {InitTexts.create_organization.subTitle}
                    </SubTitle>
                    <XForm
                        defaultAction={(data: any) => {
                            defaultAction({
                                name: data.input.organization,
                            });
                        }}
                        defaultData={{
                            input: {
                                organization: '',
                            },
                        }}
                        validate={{
                            input: {
                                organization: [
                                    {
                                        rule: (value: string) => value !== '',
                                        errorMessage: InitTexts.auth.organizationIsEmptyError,
                                    },
                                ],
                            },
                        }}
                        defaultLayout={false}
                    >
                        <XVertical separator="large">
                            <XFormError width={472} />
                            <XFormLoadingContent>
                                <ButtonsWrapper marginBottom={84} marginTop={34}>
                                    <div>
                                        <XVertical alignItems="center" separator="none">
                                            <XFormField2 field="input.organization">
                                                {({ showError }: { showError: boolean }) => (
                                                    <XVertical separator="none" alignItems="center">
                                                        <>
                                                            <XHorizontal
                                                                alignItems="center"
                                                                separator="none"
                                                            >
                                                                <XInput
                                                                    invalid={showError}
                                                                    field="input.organization"
                                                                    size="large"
                                                                    title="Organization name"
                                                                    dataTestId="organization"
                                                                    flexGrow={1}
                                                                    className={
                                                                        organizationInputClassName
                                                                    }
                                                                />
                                                                <XPopper
                                                                    content={
                                                                        <InfoText>
                                                                            To register as an
                                                                            individual, simply enter
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
                                                            {showError && <ShowOrgError />}
                                                        </>
                                                    </XVertical>
                                                )}
                                            </XFormField2>
                                            <XView marginTop={50}>
                                                <XFormSubmit
                                                    dataTestId="continue-button"
                                                    style="primary"
                                                    text={InitTexts.create_organization.continue}
                                                    size="large"
                                                />
                                            </XView>
                                        </XVertical>
                                    </div>
                                </ButtonsWrapper>
                            </XFormLoadingContent>
                        </XVertical>
                    </XForm>
                </ContentWrapper>
            </XTrack>
        );
    }
}

export default withApp('Home', 'viewer', () => {
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(4)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo />
            </XView>

            <CreateOrganizationFormInner
                onPrefixChanges={() => {
                    //
                }}
                roomView={false}
                defaultAction={() => {
                    //
                }}
                organizations={null}
            />
        </div>
    );
});
