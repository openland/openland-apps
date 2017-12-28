import * as React from 'react';
import { withLandingPage } from '../components/withPage';
import { HeaderLarge, HeaderLargeTitle, HeaderLargeSocial } from '../components/Header';
import { withBuildingProjectsStats } from '../api/BuildingProjects';
import { withLoader } from '../components/withLoader';
import { Counters, CounterItem } from '../components/Landing/Counters';
import { Insights, InsightItem } from '../components/Landing/Insight';
import { Footer } from '../components/Footer';
import { PipelineIntro } from '../components/Landing/PipelineIntro';
import { ContributersInvite } from '../components/Landing/ContributersInvite';

export default withLandingPage(withBuildingProjectsStats(withLoader((props) => {
    return (
        <>
        <HeaderLarge>
            <HeaderLargeTitle>
                San Francisco<br /> Housing Forecast<br /> 2017-18
                </HeaderLargeTitle>
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
                text="This site makes it easy to compare current and future levels of housing production with the Mayor’s annual goal and the long-term [RHNA goals](https://abag.ca.gov/planning/housingneeds/) set by the state."
            />
            <InsightItem
                title="Accuracy is a work in progress"
                text="Unit counts and expected completion times change frequently. Our pipeline editing tools allow all stakeholders to add, correct, and expand individual records."
            />
            <InsightItem
                title="Housing production is facing a severe downturn"
                text="Based on the current data, housing production in 2017-2018 will represent a significant drop from record-high 2016 level of 5000+ units. The extend of this downturn will be more clear as verification process progresses forward."
            />
        </Insights>
        <PipelineIntro />
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
                text="Our database is expanded and corrected using sources like developer websites, local press, DAHLIA listings, and Google Maps. Records that are double checked without surfacing conflicting information are marked as verified."
            />
            <InsightItem
                title="This is just a start"
                text="In the near future, we hope to expand Statecraft platform to cover affordable housing, zoning capacity, approval timelines, parking requirements, and property taxes."
            />
            <InsightItem
                title="Let’s explore how we can collaborate"
                text="Statecraft is actively looking for partners, both within and outside of government, to create a shared data ecosystem to drive informed and fair urban planning decisions. Drop us a line at [yury@statecraft.one](mailto:yury@statecraft.one) to start a conversation."
            />
        </Insights>
        <Footer>
            <HeaderLargeSocial />
        </Footer>
        </>
    );
})));