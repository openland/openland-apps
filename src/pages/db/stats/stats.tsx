import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XContainer } from '../../../components/X/XContainer';
import { Header } from 'semantic-ui-react';
import { withStatsQuery } from '../../../api/Stats';
import { XBarChart } from '../../../components/X/XBarChart';

export default withPage(withStatsQuery((props) => {
    return (
        <div className="x-in">
            <XContainer wide={true}>
                <Header attached="top">
                    Approval Times Distribution (2007+, new_construction)
                    <XBarChart data={props.data.permitsApprovalStats}/>
                    Approved Units by Year
                    <XBarChart data={props.data.permitsApprovalUnits} stacked={true}/>
                </Header>
            </XContainer>
        </div>
    );
}));