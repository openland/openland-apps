import * as React from 'react';
import { HeaderLarge } from '../XComponents/HeaderLarge';
import { HeaderLargeTitle } from '../XComponents/HeaderLargeTitle';
import { HeaderLargeSocial } from '../XComponents/HeaderLargeSocial';
import { Counters, CounterItem } from '../XComponents/Counters';
import { Insights, InsightItem } from '../XComponents/Insights';
import { Pipeline } from '../XComponents/Pipeline';
import { Footer } from '../XComponents/Footer';
import { ContributersInvite } from '../XComponents/ContributersInvite';
import { Page } from '../XComponents/Page';
import { withBuildingProjectsStats } from '../../api/BuildingProjects';
import { withLoader } from '../Components/withLoader';

export const Dashboard = withBuildingProjectsStats(withLoader(props => {
    return (
        <Page>
            <HeaderLarge key="header">
                <HeaderLargeTitle title="San Francisco Housing Forecast 2017-18" />
                <HeaderLargeSocial />
            </HeaderLarge>
            <Counters>
                <CounterItem counter={props.data.stats.projectsTracked} name="Projects tracked" verified={props.data.stats.projectsVerified} />
                <CounterItem counter={props.data.stats.year2017NewUnits} name="2017 net new units" verified={props.data.stats.year2017NewUnitsVerified} />
                <CounterItem counter={props.data.stats.year2018NewUnits} name="2018 net new units" verified={props.data.stats.year2018NewUnitsVerified} />
                <CounterItem counter={5000} name="Mayor's goal" label="Annual target" />
            </Counters>
            <Insights title="Insights">
                <InsightItem
                    title="Accuracy"
                    text="City doesn’t have accurate info for expected completion. Collaboration with developer community is necessary."
                />
                <InsightItem
                    title="Below target"
                    text="Judging from the current data, the city is well behind mayor’s goal. However, major changes are possible after new inputs from developers."
                />
                <InsightItem
                    title="Affordable"
                    text="Similar collaborative pipeline review is required to develop accurate projections for affordable production."
                />
            </Insights>
            <Pipeline />
            <ContributersInvite />
            <Insights title="About SF Housing Forecast" dark={true}>
                <InsightItem
                    title="Objective"
                    text="Create the most accurate and transparent forecast for housing production in the city."
                />
                <InsightItem
                    title="Team"
                    text="This project is an initiative of Statecraft, a San-Francisco-based government analytics company."
                />
                <InsightItem
                    title="Data"
                    text="The initial list of construction projects is created using open data published by DataSF (development pipeline and building permits). Further details are sources from our community of contributors."
                />
            </Insights>
            <Footer />
        </Page>
    );
}));