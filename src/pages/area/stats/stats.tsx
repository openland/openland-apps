import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XContainer } from '../../../components/X/XContainer';
import { Header, Segment } from 'semantic-ui-react';
import { XBarChart } from '../../../components/X/XBarChart';
import { withLoader } from '../../../components/withLoader';
import { XHead } from '../../../components/X/XHead';
import { withInternalStats } from '../../../api';

export default withPage(withInternalStats(withLoader((props) => {
    return (
        <>
        <XHead title="Statecraft Stats" />
        <div className="x-in">
            <XContainer wide={true}>
                <Header attached="top">
                    Approval Times Distribution (2007+, new_construction)
                </Header>
                <Segment attached="bottom">
                    <XBarChart data={props.data.permitsApprovalStats} stacked={true} />
                </Segment>

                <Header attached="top">
                    Approved Units by Year
                </Header>
                <Segment attached="bottom">
                    <XBarChart data={props.data.permitsApprovalUnits} stacked={true} />
                </Segment>

                <Header attached="top">
                    Issued Units by Year
                </Header>
                <Segment attached="bottom">
                    <XBarChart data={props.data.permitsUnitsIssuedStats} stacked={true} />
                </Segment>

                <Header attached="top">
                    Filed Units by Year
                </Header>
                <Segment attached="bottom">
                    <XBarChart data={props.data.permitsUnitsFiledStats} stacked={true} />
                </Segment>

                <Header attached="top">
                    Completed Units by Year
                </Header>
                <Segment attached="bottom">
                    <XBarChart data={props.data.permitsUnitsCompletedStats} stacked={true} />
                </Segment>
            </XContainer>
        </div>
        </>
    );
})));