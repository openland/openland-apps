import * as React from 'react';
import { withLandingPage } from '../components/withPage';
import { Intro, IntroTitle, IntroCols, IntroCol, IntroLink, IntroBox, IntroForm } from '../components/Intro';
import { withBuildingProjectsStats } from '../api/BuildingProjects';
import { Counters, CountersList, CountersItem, CountersCols, CountersText } from '../components/Landing/Counters';
import { About, AboutItem } from '../components/Landing/About';
import { Footer } from '../components/Footer';
import { Trends, TrendsChart, TrendsText } from '../components/Landing/Trends';
import { buildDuration } from '../utils/date';
import { withLoader } from '../components/withLoader';

export default withLandingPage(withBuildingProjectsStats(withLoader((props) => {

    let fastest = props.data.stats.fastestApprovalProject!!;
    let slowest = props.data.stats.slowestApprovalProject!!;
    let fastestPermits = fastest.permits!!.filter((v) => v.approvalTime != null).map((v) => v.approvalTime!!);
    let fastestDuration = buildDuration(Math.max(...fastestPermits));

    let slowestPermits = slowest.permits!!.filter((v) => v.approvalTime != null).map((v) => v.approvalTime!!);
    let slowestDuration = buildDuration(Math.max(...slowestPermits));

    return (
        <>
        <Intro>
            <IntroTitle>
                San Francisco<br /> Housing Analytics
                </IntroTitle>
            <IntroCols>
                <IntroCol title="Insights">
                    <IntroLink title="Housing forecast 2017-2018" path="/" />
                    <IntroLink title="Building permit approval times" path="/" />
                    <IntroLink title="Building permits volume trends" path="/" />
                </IntroCol>
                <IntroCol title="Data">
                    <IntroLink counter={props.data.globalStats.totalPermits} label="Permits" path="/permits" />
                    <IntroLink counter={props.data.globalStats.totalProjects} label="Construction Projects" path="/projects" />
                    <IntroLink counter={props.data.globalStats.totalDevelopers + props.data.globalStats.totalConstructors} label="Organizations" path="/organizations" />
                </IntroCol>
            </IntroCols>
            <IntroBox>
                <IntroForm />
            </IntroBox>
        </Intro>

        <Counters title="Housing forecast 2017-2018">
            <CountersCols>
                <CountersText
                    title="TBD Headline"
                    text="Here we can tell something about forecast, how we get things going and do great things. Lorem ipsum ish text block, can be removed if we dont need it." />
                <CountersText
                    title="TBD Headline"
                    text="Here we can tell something about forecast, how we get things going and do great things. Lorem ipsum ish text block, can be removed if we dont need it." />
            </CountersCols>
            <CountersList>
                <CountersItem counter={props.data.stats.year2017NewUnits} name="2017 net new units"
                    path="/projects?year=2017" caption="Explore projects" />
                <CountersItem counter={props.data.stats.year2018NewUnits} name="2018 net new units"
                    path="/projects?year=2018" caption="Explore projects" />
                <CountersItem counter={5000} name="Mayor’s annual target"
                    href="https://medium.com/@mayoredlee/making-a-more-affordable-san-francisco-f1ff3bae0d86"
                    caption="Read an article" />
            </CountersList>
        </Counters>

        <Counters title="Building Permit Approval Times">
            <CountersCols>
                <CountersText
                    title="TBD Headline"
                    text="Here we can tell something about forecast, how we get things going and do great things. Lorem ipsum ish text block, can be removed if we dont need it." />
                <CountersText
                    title="TBD Headline"
                    text="Here we can tell something about forecast, how we get things going and do great things. Lorem ipsum ish text block, can be removed if we dont need it." />
            </CountersCols>
            <CountersList>
                <CountersItem counter={slowestDuration.value} label={slowestDuration.subtitle}
                    name="The longest approval" photo={slowest.preview}
                    address={slowest.name} path={'/projects/' + slowest.slug}
                    caption="Construction project details" />
                <CountersItem counter={fastestDuration.value} label={fastestDuration.subtitle}
                    name="The shortest approval" photo={fastest.preview}
                    address={fastest.name} path={'/projects/' + fastest.slug}
                    caption="Construction project details" />
                <CountersItem counter={377} label="days"
                    name="Median approval time" photo={fastest.preview}
                    path="/" caption="Learn more" />
            </CountersList>
        </Counters>

        <Trends title="Building permits volume trends">
            <TrendsChart />
            <TrendsText title="About volume trends">
                <p>Here we can tell something about volume trends, how we get things going and do great things. Lorem ipsum ish text block, can be removed if we dont need it.</p>
                <p>Here we can tell something about approval times, how we get things going and do great things. Lorem ipsum ish text block, can be removed if we dont need it.</p>
            </TrendsText>
        </Trends>

        <About title="About Us" mail="hello@statecraft.one">
            <AboutItem
                title="Creators"
                text="This site is developed by [Statecraft](https://statecraft.one/), an urban analytics company based in San Francisco. Second question is also to be done, it would be great if it is long enough to take another line of text, haha."
            />
            <AboutItem
                title="Data sources"
                text="Our database was initially populated from [San Francisco Open Data](https://datasf.org/) portal. Further details such as expected completion dates are collected by our community of contributors from developer websites, press, and satellite images."
            />
        </About>

        <Footer />
        </>
    );
})));