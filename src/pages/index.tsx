import * as React from 'react';
import { withLandingPage } from '../components/withPage';
import { HeaderLarge, HeaderLargeTitle, HeaderLargeText, HeaderLargeBox, HeaderLargeForm } from '../components/Header';
import { withBuildingProjectsStats } from '../api/BuildingProjects';
import { withLoader } from '../components/withLoader';
import { Counters, CounterList, CounterItem } from '../components/Landing/Counters';
import { About, AboutItem } from '../components/Landing/About';
import { Footer } from '../components/Footer';
import { ExploreData, ExploreDataItem } from '../components/Landing/ExploreData';

export default withLandingPage(withBuildingProjectsStats(withLoader((props) => {
    return (
        <>
        <HeaderLarge>
            <HeaderLargeTitle>
                San Francisco<br /> Housing Analytics
            </HeaderLargeTitle>
            <HeaderLargeText>
                Explore development pipeline and approval times in the city
            </HeaderLargeText>
            <HeaderLargeBox>
                <HeaderLargeForm />
            </HeaderLargeBox>
        </HeaderLarge>
        <Counters title="Housing Forecast 2017-2018" insights={<HousingInsights />} methodology={<HousingMethodology />}>
            <CounterList>
                <CounterItem counter={props.data.stats.year2017NewUnits} name="2017 net new units" path="/" />
                <CounterItem counter={props.data.stats.year2018NewUnits} name="2018 net new units" path="/" />
                <CounterItem counter={5000} name="Mayor’s annual target" path="/" />
            </CounterList>
        </Counters>
        <Counters title="Building Permit Approval Times" times={true} insights={<ApprovalInsights />} methodology={<ApprovalMethodology />}>
            <CounterList>
                <CounterItem counter={377} label="days" name="Median approval time" path="/" />
                <CounterItem counter={9} label="years" name="The longest approval" photo="//placehold.it/310x181" address="1601 Larkin St" path="/" />
                <CounterItem counter={2} label="months" name="The shortest approval" photo="//placehold.it/310x181" address="1450 Franklin St" path="/" />
            </CounterList>
        </Counters>
        <ExploreData title="Explore Our Data">
            <ExploreDataItem counter={3153} name="Construction projects" photo="//placehold.it/496x120" path="/" />
            <ExploreDataItem counter={132} name="Developers" photo="//placehold.it/496x120" path="/" />
            <ExploreDataItem counter={218} name="Contractors" photo="//placehold.it/496x120" path="/" />
            <ExploreDataItem counter={1512153} name="Permits" photo="//placehold.it/496x120" path="/" />
        </ExploreData>
        <About title="About San Francisco Housing Analytics" mail="hello@statecraft.one">
            <AboutItem
                title="Objective"
                text="Create the most accurate and transparent forecast for housing production in the city."
            />
            <AboutItem
                title="Data"
                text="The initial list of construction projects is created using open data published by [DataSF](https://datasf.org/) (development pipeline and building permits). Further details are sources from our community of contributors."
            />
            <AboutItem
                title="Team"
                text="This project is an initiative of Statecraft, a San-Francisco-based government analytics company."
            />
        </About>
        <Footer>
            <HeaderLargeForm />
        </Footer>
        </>
    );
})));

const HousingInsights = () => {
    return (
        <>
            <p>
                <strong>Measuring housing is critical for informed urban planning decisions</strong>
                <br />
                This site makes it easy to compare current and future levels of housing production with the Mayor’s annual goal and the long-term RHNA goals set by the state.
            </p>

            <p>
                <strong>Accuracy is a work in progress</strong>
                <br />
                Unit counts and expected completion times change frequently. Our pipeline editing tools allow all stakeholders to add, correct, and expand individual records.
            </p>
        </>
    );
};

const HousingMethodology = () => {
    return (
        <>
            <p>
                <strong>Housing production is facing a severe downturn</strong>
                <br />
                Based on the current data, housing production in 2017-2018 will represent a significant drop from record-high 2016 level of 5000+ units. The extent of this downturn will be more clear as verification process progresses forward.
            </p>
        </>
    );
};

const ApprovalInsights = () => {
    return (
        <>
            <p>
                <strong>Measuring housing is critical for informed urban planning decisions</strong>
                <br />
                This site makes it easy to compare current and future levels of housing production with the Mayor’s annual goal and the long-term RHNA goals set by the state.
            </p>

            <p>
                <strong>Accuracy is a work in progress</strong>
                <br />
                Unit counts and expected completion times change frequently. Our pipeline editing tools allow all stakeholders to add, correct, and expand individual records.
            </p>
        </>
    );
};

const ApprovalMethodology = () => {
    return (
        <>
            <p>
                <strong>Housing production is facing a severe downturn</strong>
                <br />
                Based on the current data, housing production in 2017-2018 will represent a significant drop from record-high 2016 level of 5000+ units. The extent of this downturn will be more clear as verification process progresses forward.
            </p>
        </>
    );
};