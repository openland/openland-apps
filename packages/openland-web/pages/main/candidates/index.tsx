import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';

export default withApp('People', 'viewer', () => {
    return (
        <>
            <XHead title="People" />
            <AppContent>
                <XTab>
                    <XTab.Item path="/candidates">Inbox</XTab.Item>
                    <XTab.Item path="/candidates/review?type=fit">Basic Fit</XTab.Item>
                    <XTab.Item path="/candidates/review?type=setbacks">Setback Review</XTab.Item>
                    <XTab.Item path="/candidates/review?type=staircase">Staircase Review</XTab.Item>
                    <XTab.Item path="/candidates/approved">Approved</XTab.Item>
                    <XTab.Item path="/candidates/rejected">Rejected</XTab.Item>
                    <XTab.Item path="/candidates/snoozed">Snoozed</XTab.Item>
                </XTab>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="People" description="Place for your all contacts"><XButton>Add</XButton></XCard.Header>
                    <XCard.Content>
                        Yay!
                    </XCard.Content>
                </XCard>
            </AppContent>
        </>
    );
});