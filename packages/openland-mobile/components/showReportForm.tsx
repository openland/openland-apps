import { ActionSheetBuilder } from './ActionSheet';
import { useClient } from 'openland-api/useClient';
import Toast from 'openland-mobile/components/Toast';

const report = async (id: string, type: 'SPAM' | 'INAPPROPRIATE') => {
    const loader = Toast.loader();
    loader.show();
    try {
        await useClient().mutateReportContent({ contentId: id, type });

        Toast.success({ text: 'Thank you for report', duration: 1000 }).show();
    } catch (e) {
        Toast.failure({ text: 'Something went wrong', duration: 1000 }).show();
    } finally {
        loader.hide();
    }
};

export const showReportForm = (id: string) => {
    const builder = new ActionSheetBuilder();

    builder.action('It\'s spam', () => {
        report(id, 'SPAM');
    });

    builder.action('It\'s inappropriate', () => {
        report(id, 'INAPPROPRIATE');
    });

    builder.show();
};