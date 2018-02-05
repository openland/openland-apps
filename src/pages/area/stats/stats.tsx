import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XBarChart } from '../../../components/X/XBarChart';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withInternalStats } from '../../../api';
import { XPageContent } from '../../../components/X/XPageContent';
import { XSection } from '../../../components/X/XSection';
import { XTitle } from '../../../components/X/XTitle';
import { XCard } from '../../../components/X/XCard';

export default withPage(withInternalStats(withLoader((props) => {
    return (
        <>
        <XHead title="Statecraft Stats" />
        <XPageContent>
            <XSection>
                <XTitle>Approval Times Distribution (2007+, new_construction)</XTitle>
                <XCard>
                    <XCard.Content>
                        <XBarChart data={props.data.permitsApprovalStats} stacked={true} />
                    </XCard.Content>
                </XCard>
            </XSection>
            <XSection>
                <XTitle> Approved Units by Year</XTitle>
                <XCard>
                    <XCard.Content>
                        <XBarChart data={props.data.permitsApprovalUnits} stacked={true} />
                    </XCard.Content>
                </XCard>
            </XSection>
            <XSection>
                <XTitle>Issued Units by Year</XTitle>
                <XCard>
                    <XCard.Content>
                        <XBarChart data={props.data.permitsUnitsIssuedStats} stacked={true} />
                    </XCard.Content>
                </XCard>
            </XSection>
            <XSection>
                <XTitle>Filed Units by Year</XTitle>
                <XCard>
                    <XCard.Content>
                        <XBarChart data={props.data.permitsUnitsFiledStats} stacked={true} />
                    </XCard.Content>
                </XCard>
            </XSection>
            <XSection>
                <XTitle>Completed Units by Year</XTitle>
                <XCard>
                    <XCard.Content>
                        <XBarChart data={props.data.permitsUnitsCompletedStats} stacked={true} />
                    </XCard.Content>
                </XCard>
            </XSection>
        </XPageContent>
        </>
    );
})));