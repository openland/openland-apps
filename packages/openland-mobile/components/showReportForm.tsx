import { ActionSheetBuilder } from './ActionSheet';
import { useClient } from 'openland-mobile/utils/useClient';

export const showReportForm = (id: string) => {
    const client = useClient();
    const builder = new ActionSheetBuilder();

    builder.action('It\'s Spam', () => {
        client.mutateReportContent({ contentId: id, type: 'SPAM' });
    });

    builder.action('It\'s Inappropriate', () => {
        client.mutateReportContent({ contentId: id, type: 'INAPPROPRIATE' });
    });

    builder.show();
};