import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XContainer } from '../../../components/X/XContainer';
import { Header, Segment } from 'semantic-ui-react';
import { withStatsQuery } from '../../../api/Stats';
import { XBarChart } from '../../../components/X/XBarChart';

export default withPage(withStatsQuery((props) => {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <Header attached="top">
                    Approval Times Distribution (2007+, new_construction)
                </Header>
                <Segment>
                    <XBarChart data={props.data.permitsApprovalStats} stacked={true}/>
                </Segment>

                <Header attached="top">
                    Approved Units by Year
                </Header>
                <Segment>
                    <XBarChart data={props.data.permitsApprovalUnits} stacked={true}/>
                </Segment>
            </XContainer>
        </div>
    );
}));