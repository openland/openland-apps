import React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContent } from 'openland-web/components/XModalContent';
import { TextBody } from 'openland-web/utils/TextStyles';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';

import { RadioButtonsSelect } from '../../settings/components/RadioButtonsSelect';

const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
`;

export const ReportSpamModal = ({ userId, hide }: { userId: string; hide: () => void }) => {
    const client = useClient();
    const form = useForm();
    const toastHandlers = useToast();

    const reasonField = useField('reason.input', 'Spam', form);
    const isOther = reasonField.value === 'Other';
    const otherTextField = useField('otherText.input', '', form, [
        {
            checkIsValid: (value) => !isOther || !!value.trim(),
            text: 'Please add description of your problem',
        },
        {
            checkIsValid: (value) => value?.length < 120,
            text: 'Your description should be less than 120 characters'
        }
    ]);

    const onSend = async () => {
        await form.doAction(async () => {
            await client.mutateReportContent({
                contentId: userId,
                type: reasonField.value,
                message: isOther ? otherTextField.value : undefined
            });
            toastHandlers.show({
                type: 'success',
                text: 'Your report has been sent',
            });
            hide();
        });
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        Please tell us the reason for your complaint about this user
                    </div>
                    <XView marginBottom={16} marginHorizontal={-24}>
                        <RadioButtonsSelect
                            selectOptions={[
                                { label: 'Spam', value: 'Spam' },
                                { label: 'Offensive behaviour', value: 'Offensive behaviour' },
                                { label: 'Harmful content', value: 'Harmful content' },
                                { label: 'Clone of my profile', value: 'Clone' },
                                { label: 'Other', value: 'Other' },
                            ]}
                            {...reasonField.input}
                            disableHorizontalPadding={true}
                            paddingHorizontal={24}
                            withCorners={true}
                        />
                    </XView>
                    {isOther && (
                        <UInputField label="Describe your problem" field={otherTextField} hasPlaceholder={true}/>
                    )}
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={hide}
                />
                <UButton
                    text="Send"
                    style="primary"
                    size="large"
                    disable={isOther && !otherTextField.value}
                    onClick={onSend}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
};