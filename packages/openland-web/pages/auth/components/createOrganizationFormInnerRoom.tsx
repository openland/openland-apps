import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XButton } from 'openland-x/XButton';
import { InitTexts } from 'openland-web/pages/init/_text';
import {
    ContentWrapper,
    Title,
    ButtonsWrapper,
    SubTitle,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import IcInfo from 'openland-icons/ic-info.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XPopper } from 'openland-x/XPopper';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { processCreateOrganizationT } from '../enter-your-organization.page';
import { RoomContainerParams } from '../root.page';

const InfoText = Glamorous.span({
    fontSize: 14,
});
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

export const CreateOrganizationFormInnerRoom = ({
    processCreateOrganization,
    initialOrganizationName,
    onSkip,
    sending,
    skiping,
    roomContainerParams,
}: {
    skiping: boolean;
    sending: boolean;
    initialOrganizationName?: string;
    inviteKey?: string | null;
    processCreateOrganization: processCreateOrganizationT;
    roomContainerParams: RoomContainerParams;
    onSkip?: (event: React.MouseEvent<any, MouseEvent>) => void;
}) => {
    const form = useForm();

    let organizationField = useField('input.organization', initialOrganizationName || '', form, [
        {
            checkIsValid: (value: string) => !!value.trim(),
            text: 'Please enter your organization name',
        },
    ]);
    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                await processCreateOrganization({
                    organizationFieldValue: organizationField.value,
                });
            });
        },
        [organizationField.value],
    );

    const subtitle = 'Give others context about your work';

    const onEnter = () => {
        doConfirm();
    };

    const errorText = organizationField.input.errorText;
    const isInvalid = !!errorText && organizationField.input.invalid;

    return (
        <XShortcuts
            handlerMap={{
                ENTER: onEnter,
            }}
            keymap={{
                ENTER: {
                    osx: ['enter'],
                    windows: ['enter'],
                },
            }}
        >
            <RoomSignupContainer pageMode="CreateOrganization" {...roomContainerParams!!}>
                <XView alignItems="center" flexGrow={1} justifyContent="center">
                    <ContentWrapper>
                        <Title roomView={true} className="title">
                            {InitTexts.create_organization.title}
                        </Title>
                        <SubTitle className="subtitle">{subtitle}</SubTitle>
                        <ButtonsWrapper marginBottom={84} marginTop={34} width={350}>
                            <XVertical alignItems="center" separator="none">
                                <XView width={330}>
                                    <XHorizontal alignItems="center" separator="none">
                                        <XInput
                                            title="Organization name"
                                            dataTestId="organization"
                                            flexGrow={1}
                                            invalid={!!form.error}
                                            size="large"
                                            {...organizationField.input}
                                        />
                                        <XPopper
                                            content={
                                                <InfoText>
                                                    To register as an individual, simply enter your
                                                    name
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
                                    {isInvalid && <XErrorMessage2 message={errorText} />}
                                </XView>

                                <XView
                                    flexDirection="row"
                                    marginTop={
                                        organizationField.input.invalid &&
                                        organizationField.input.errorText
                                            ? 50 - 26
                                            : 50
                                    }
                                >
                                    {onSkip && (
                                        <XView marginRight={16}>
                                            <XButton
                                                loading={skiping}
                                                onClick={onSkip}
                                                size="large"
                                                style="ghost"
                                                alignSelf="center"
                                                text={'Skip'}
                                            />
                                        </XView>
                                    )}
                                    <XButton
                                        loading={sending}
                                        dataTestId="continue-button"
                                        style="primary"
                                        text={InitTexts.create_organization.continue}
                                        size="large"
                                        onClick={doConfirm}
                                    />
                                </XView>
                            </XVertical>
                        </ButtonsWrapper>
                    </ContentWrapper>
                </XView>
            </RoomSignupContainer>
        </XShortcuts>
    );
};
