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
            <Insights title="Summary">
                <InsightItem
                    title="Measuring housing is critical for informed urban planning decisions"
                    text="To make evidence-based decisions on major policies such as density bonus programs, by-right and streamlined approvals, and district-level master plans, the city needs to know how the current housing production does compare to Mayor’s annual goal and long-term state targets (RHNA goals).                    "
                />
                <InsightItem
                    title="Accuracy is a work in progress"
                    text="Unit counts and expected completion times change frequently. This site makes it easy for all stakeholders to add, correct, and expand individual records. As a result, we hope to develop the most accurate and transparent assessment of housing production in the city."
                />
                <InsightItem
                    title="Housing production is facing a severe downturn"
                    text="Based on the current data, housing production in 2017-2018 will represent a significant drop from record-high 2016 level of 5000+ units. The extend of this downturn will be more clear as verification process progresses forward."
                />
            </Insights>
            <Pipeline />
            <ContributersInvite />
            <Insights title="About Us" dark={true}>
                <InsightItem
                    title="Housing Forecast is an initiative by Statecraft"
                    text="This is [Statecraft](https://statecraft.one/)’s second project for San Francisco, following [housing production report](https://sfhousing.statecraft.one/) for 2014-2017 Q1 period."
                />
                <InsightItem
                    title="Initial data comes from DataSF"
                    text="The initial list of in-construction buildings was created using open datasets published by [DataSF](https://datasf.org/), most notably quarterly development pipelines and building permits database."
                />
                <InsightItem
                    title="Information verification is done by a community of contributors"
                    text="The project list was expanded and corrected by a community of volunteers using information from developer sites, press coverage, DAHLIA listings, Google Street View and Satellite Maps. When a conflicting information is discovered, it is recorded in the comment field and the building stays marked unverified pending direct information from developer."
                />
                <InsightItem
                    title="This is just a start"
                    text="Housing production counts is only a small slice of data needed for making informed urban planning decisions. In the near future, we hope to expand Statecraft platform to cover affordable housing, zoning capacity, approval timelines, and property taxes."
                />
                <InsightItem
                    title="Let’s explore how we can collaborate"
                    text="Statecraft is actively looking for partners, both within and outside of government, to create a shared data ecosystem to drive informed and fair urban planning decisions. Drop us a line at [yury@statecraft.one](mailto:yury@statecraft.one) to start a conversation."
                />
            </Insights>
            <Footer>
                <HeaderLargeSocial />
            </Footer>
        </Page>
    );
}));