import React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import Toast from 'openland-mobile/components/Toast';
import { useField } from 'openland-form/useField';
import { ZInput } from 'openland-mobile/components/ZInput';
import { CheckListBoxWraper } from '../modals/UserMultiplePicker';

const ReportSpamOptions = ['Spam', 'Offensive behaviour', 'Harmful content', 'Clone of my profile', 'Other'];

const ReportSpamComponent = React.memo((props: PageProps) => {
    const client = getClient();
    const form = useForm();
    const [selected, setSelected] = React.useState('Spam');
    const isOther = selected === 'Other';
    const userId = props.router.params.userId;

    const otherMessageField = useField('otherMessage', '', form, [
        {
            text: 'Please add description of your problem',
            checkIsValid: (value) => {
                if (isOther) {
                    return !!value.trim();
                } else {
                    return true;
                }
            },
        },
        {
            text: 'Your description should be less than 120 characters',
            checkIsValid: (value) => {
                if (isOther) {
                    return value?.length < 120;
                } else {
                    return true;
                }
            },
        },
    ]);

    const handleSend = async () => {
        const haveMessage = !!(otherMessageField.value.trim() && otherMessageField.value.length < 120);
        if (isOther && !haveMessage) {
            return;
        } else {
            await form.doAction(async () => {
                try {
                    await client.mutateReportContent({
                        contentId: userId,
                        type: selected,
                        message: isOther ? otherMessageField.value : undefined
                    });
                    Toast.success({ duration: 1000, text: 'Report sent' }).show();
                    props.router.back();
                } catch (e) {
                    Toast.failure({ text: 'Something went wrong', duration: 1000 });
                }
            });
        }
    };

    return (
        <>
            <SHeader title="Report" />
            <SHeaderButton title="Send" onPress={handleSend} />
            <KeyboardAvoidingScrollView>
                {ReportSpamOptions.map(option => (
                    <CheckListBoxWraper isRadio={true} checked={selected === option}>
                        <ZListItem
                            text={option}
                            onPress={() => setSelected(option)}
                        />
                    </CheckListBoxWraper>
                ))}
                {isOther && (
                    <ZInput
                        placeholder="Describe your problem"
                        field={otherMessageField}
                    />
                )}
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const ReportSpam = withApp(ReportSpamComponent, {
    navigationAppearance: 'small',
});
