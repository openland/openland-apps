import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';
import { XLink } from '../../../components/X/XLink';

let Link = Glamorous(XLink)({
    color: '#3297d3',
});

export default withApp('People', 'viewer', () => {
    return (
        <>
            <XHead title="People" />
            <AppContent>
                <XTab>
                    <XTab.Item path="/sourcing" asArrow={true}>Incoming</XTab.Item>
                    <XTab.Item path="/sourcing/review?type=fit" asArrow={true}>Zoning Review</XTab.Item>
                    <XTab.Item path="/sourcing/review?type=setbacks" asArrow={true}>Unit Placement</XTab.Item>
                    <XTab.Item path="/sourcing/approved">Approved</XTab.Item>
                    <XTab.Item path="/sourcing/rejected">Rejected</XTab.Item>
                    <XTab.Item path="/sourcing/snoozed">Snoozed</XTab.Item>
                </XTab>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text="Incoming">
                        <XButton>Add</XButton>
                        <XButton style="dark">Start Review</XButton>
                    </XCard.Header>
                    <XCard.Empty text="You can find your first parcel at" icon="sort">
                        <Link path="/">
                            Explore page
                        </Link>
                    </XCard.Empty>
                    {/* <XCard.Content>
                        Yay!
                    </XCard.Content> */}
                </XCard>
            </AppContent>
        </>
    );
});