import * as React from 'react';
import { withLandingPage } from '../components/withPage';
import { HeaderLarge, HeaderLargeTitle, HeaderLargeText, HeaderLargeBox, HeaderLargeForm } from '../components/Header';
import { withBuildingProjectsStats } from '../api/BuildingProjects';
import { Counters, CounterList, CounterItem } from '../components/Landing/Counters';
import { About, AboutItem } from '../components/Landing/About';
import { Footer } from '../components/Footer';
import { ExploreData, ExploreDataItem } from '../components/Landing/ExploreData';
import { buildDuration } from '../utils/date';

export default withLandingPage(withBuildingProjectsStats((props) => {

    let fastest = props.data.stats.fastestApprovalProject!!;
    let slowest = props.data.stats.slowestApprovalProject!!;
    let fastestPermits = fastest.permits!!.filter((v) => v.approvalTime != null).map((v) => v.approvalTime!!);
    let fastestDuration = buildDuration(Math.max(...fastestPermits));

    let slowestPermits = slowest.permits!!.filter((v) => v.approvalTime != null).map((v) => v.approvalTime!!);
    let slowestDuration = buildDuration(Math.max(...slowestPermits));

    return (
        <>
            <HeaderLarge>
                <HeaderLargeTitle>
                    San Francisco<br/> Housing Analytics
                </HeaderLargeTitle>
                <HeaderLargeText>
                    Explore development pipeline and approval times in the city
                </HeaderLargeText>
                <HeaderLargeBox>
                    <HeaderLargeForm/>
                </HeaderLargeBox>
            </HeaderLarge>
            <Counters title="Housing Forecast 2017-2018">
                <CounterList>
                    <CounterItem counter={props.data.stats.year2017NewUnits} name="2017 net new units" path="/projects?year=2017"/>
                    <CounterItem counter={props.data.stats.year2018NewUnits} name="2018 net new units" path="/projects?year=2018"/>
                    <CounterItem counter={5000} name="Mayor’s annual target" url="https://medium.com/@mayoredlee/making-a-more-affordable-san-francisco-f1ff3bae0d86"/>
                </CounterList>
            </Counters>
            <Counters title="Building Permit Approval Times" times={true}>
                <CounterList>
                    <CounterItem counter={377} label="days" name="Median approval time" path="/"/>
                    <CounterItem counter={slowestDuration.value} label={slowestDuration.subtitle}
                                 name="The longest approval" photo={slowest.preview}
                                 address={slowest.name} path={'/projects/' + slowest.slug}/>
                    <CounterItem counter={fastestDuration.value} label={fastestDuration.subtitle}
                                 name="The shortest approval" photo={fastest.preview}
                                 address={fastest.name} path={'/projects/' + fastest.slug}/>
                </CounterList>
            </Counters>
            <ExploreData title="Explore Our Data">
                <ExploreDataItem counter={props.data.globalStats.totalProjects} name="Construction projects"
                                 photo="/static/img/explore-01.png" path="/projects"/>
                <ExploreDataItem counter={props.data.globalStats.totalDevelopers} name="Developers"
                                 photo="/static/img/explore-02.png" path="/organizations?type=developer"/>
                <ExploreDataItem counter={props.data.globalStats.totalConstructors} name="Contractors"
                                 photo="/static/img/explore-03.png" path="/organizations?type=constructor"/>
                <ExploreDataItem counter={props.data.globalStats.totalPermits} name="Permits"
                                 photo="/static/img/explore-04.png" path="/permits"/>
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
            <Footer/>
        </>
    );
}));

// const HousingInsights = () => {
//     return (
//         <>
//             <p>
//                 <strong>Measuring housing is critical for informed urban planning decisions</strong>
//                 <br/>
//                 This site makes it easy to compare current and future levels of housing production with the Mayor’s
//                 annual goal and the long-term RHNA goals set by the state.
//             </p>
//
//             <p>
//                 <strong>Accuracy is a work in progress</strong>
//                 <br/>
//                 Unit counts and expected completion times change frequently. Our pipeline editing tools allow all
//                 stakeholders to add, correct, and expand individual records.
//             </p>
//         </>
//     );
// };
//
// const HousingMethodology = () => {
//     return (
//         <>
//             <p>
//                 <strong>Housing production is facing a severe downturn</strong>
//                 <br/>
//                 Based on the current data, housing production in 2017-2018 will represent a significant drop from
//                 record-high 2016 level of 5000+ units. The extent of this downturn will be more clear as verification
//                 process progresses forward.
//             </p>
//         </>
//     );
// };
//
// const ApprovalInsights = () => {
//     return (
//         <>
//             <p>
//                 <strong>Measuring housing is critical for informed urban planning decisions</strong>
//                 <br/>
//                 This site makes it easy to compare current and future levels of housing production with the Mayor’s
//                 annual goal and the long-term RHNA goals set by the state.
//             </p>
//
//             <p>
//                 <strong>Accuracy is a work in progress</strong>
//                 <br/>
//                 Unit counts and expected completion times change frequently. Our pipeline editing tools allow all
//                 stakeholders to add, correct, and expand individual records.
//             </p>
//         </>
//     );
// };
//
// const ApprovalMethodology = () => {
//     return (
//         <>
//             <p>
//                 <strong>Housing production is facing a severe downturn</strong>
//                 <br/>
//                 Based on the current data, housing production in 2017-2018 will represent a significant drop from
//                 record-high 2016 level of 5000+ units. The extent of this downturn will be more clear as verification
//                 process progresses forward.
//             </p>
//         </>
//     );
// };