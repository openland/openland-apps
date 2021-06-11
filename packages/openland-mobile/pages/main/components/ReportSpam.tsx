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
import { useText } from 'openland-mobile/text/useText';

const ReportSpamComponent = React.memo((props: PageProps) => {
    const client = getClient();
    const form = useForm();
    const { t } = useText();
    const ReportSpamOptions = {
        'Spam': t('reportsSpam', 'Spam'),
        'Offensive behaviour': t('reportsOffensive', 'Offensive behaviour'),
        'Harmful content': t('reportsHarmful', 'Harmful content'),
        'Clone of my profile': t('reportsClone', 'Clone of my profile'),
        'Other': t('reportsOther', 'Other'),
    };
    const [selected, setSelected] = React.useState('Spam');
    const userId = props.router.params.userId;

    const otherMessageField = useField('otherMessage', '', form, [
        {
            text: t('validationDescriptionMaxChars', { num: 120, defaultValue: 'Your description should be less than {{num}} characters' }),
            checkIsValid: (value) => value?.length < 120
        },
    ]);

    const validMessage = otherMessageField.value.length < 120;

    const handleSend = async () => {
        await form.doAction(async () => {
            try {
                await client.mutateReportContent({
                    contentId: userId,
                    type: selected,
                    message: otherMessageField.value,
                });
                Toast.success({ duration: 1000, text: t('reportSent', 'Report sent') }).show();
                props.router.back();
            } catch (e) {
                Toast.failure({ text: t('errorAbstract', 'Something went wrong'), duration: 1000 });
            }
        });
    };

    return (
        <>
            <SHeader title={t('report', 'Report')} />
            <SHeaderButton
                title={t('send', 'Send')}
                onPress={handleSend}
                key={`report-${validMessage}`}
                disabled={!validMessage}
            />
            <KeyboardAvoidingScrollView>
                {Object.entries(ReportSpamOptions).map(([option, text]) => (
                    <CheckListBoxWraper isRadio={true} checked={selected === option}>
                        <ZListItem text={text} onPress={() => setSelected(option)} />
                    </CheckListBoxWraper>
                ))}
                <ZInput placeholder={t('addDetailsOptional', 'Add details (optional)')} field={otherMessageField} style={{ marginTop: 16 }} />
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const ReportSpam = withApp(ReportSpamComponent, {
    navigationAppearance: 'small',
});
