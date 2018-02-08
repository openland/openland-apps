import * as React from 'react';
import { withLandingPage } from '../../components/Navigation/withPage';
import { Intro, IntroTitle, IntroCols, IntroCol, IntroLink, IntroBox, IntroForm } from '../../components/Landing/Intro';
import { Counters, CountersList, CountersItem, CountersCols, CountersText } from '../../components/Landing/Counters';
import { About, AboutItem } from '../../components/Landing/About';
import { Footer } from '../../components/Navigation/Footer';
import { Trends, TrendsItem, TrendsChart, TrendsText } from '../../components/Landing/Trends';
import { buildDuration } from '../../utils/date';
import { withLoader } from '../../components/Base/withLoader';
import { XBarChart } from '../../components/X/XBarChart';
import { XHead } from '../../components/X/XHead';
import { Links, ExternalLinks } from '../../Links';
import { withAreaStats } from '../../api';
import { XWriteAcces } from '../../components/X/XWriteAccess';

export default withLandingPage(withAreaStats(withLoader((props) => {

    let fastest = props.data.area.stats.fastestApprovalProject!!;
    let slowest = props.data.area.stats.slowestApprovalProject!!;
    let fastestDuration = buildDuration(fastest.approvalTime!!);
    let slowestDuration = buildDuration(slowest.approvalTime!!);

    let links = Links.area(props.data.area.slug);

    return (
        <>
        <XHead title="San Francisco Housing Analytics" />
        <Intro>
            <IntroTitle>
                San Francisco<br /> Housing Analytics
            </IntroTitle>
            <IntroCols>
                <IntroCol title="Insights">
                    <IntroLink title="Housing forecast 2017-2018" anchor="#housing" />
                    <IntroLink title="Building permit approval times" anchor="#approval" />
                    <IntroLink title="Building permits volume" anchor="#volume" />
                </IntroCol>
                <IntroCol title="Data">
                    <IntroLink counter={props.data.area.stats.totalPermits} label="Permits" path={links.permits} />
                    <IntroLink counter={props.data.area.stats.totalProjects} label="Construction projects" path={links.projects()} />
                    <IntroLink counter={props.data.area.stats.totalOrganizations} label="Organizations" path={links.organizations} />
                </IntroCol>
            </IntroCols>
            <IntroBox>
                <IntroForm />
            </IntroBox>
        </Intro>

        <Counters id="housing" title="Housing forecast 2017-2018">
            <CountersCols>
                <CountersText
                    title="Housing production is facing a severe downturn"
                    text="Based on the current data, San Francisco housing production in 2017-2018 will represent a nearly 50% drop from record-high 2016 level of 5000+ units." />
                <CountersText
                    title="Developer input needed for timely and accurate reporting"
                    text="Unit counts, expected completion dates, and other property attributes change frequently. Our pipeline verification tools allow all stakeholders to add, correct, and expand individual records." />
            </CountersCols>
            <CountersList>
                <CountersItem counter={props.data.area.stats.year2017NewUnits} name="2017 net new units"
                    path={links.projects('2017')} caption="Explore projects" />
                <CountersItem counter={props.data.area.stats.year2018NewUnits} name="2018 net new units"
                    path={links.projects('2018')} caption="Explore projects" />
                <CountersItem counter={5000} name="Mayor’s annual target"
                    href="https://medium.com/@mayoredlee/making-a-more-affordable-san-francisco-f1ff3bae0d86"
                    caption="Read Mayor’s announcement" />
            </CountersList>
        </Counters>

        <Counters id="approval" title="Building permit approval times">
            <CountersCols>
                <CountersText
                    title="Approval times differ wildly"
                    text="A sizable number of multi-family projects are permitted in 3-6 months, while others wait for 5-10 years. The crisis of 2008 gives only a partial explanation for abnormally long permitting times." />
                <CountersText
                    title="Data holds keys to finding bottlenecks"
                    text="Statecraft system allows quick research on fastest and slowest approvals in individual categories, filtering permits by period, project size, key dates, and application status." />
            </CountersCols>
            <CountersList>
                <CountersItem
                    counter={slowestDuration.value}
                    label={slowestDuration.subtitle}
                    name="The longest approval" photo={slowest.preview}
                    address={slowest.name} path={links.project(slowest.slug).view}
                    caption="Construction project details"
                />
                <CountersItem
                    counter={fastestDuration.value}
                    label={fastestDuration.subtitle}
                    name="The shortest approval" photo={fastest.preview}
                    address={fastest.name} path={links.project(fastest.slug).view}
                    caption="Construction project details"
                />
                <CountersItem counter={377} label="days"
                    name="Median approval time" photo={{ url: '/static/img/median-time.png', retina: '/static/img/median-time@2x.png 2x' }}
                    path={links.permits} caption="Browse permits by approval time" />
            </CountersList>
        </Counters>

        <Trends id="volume" title="Building permits volume">
            <TrendsItem>
                <TrendsChart>
                    <XBarChart data={props.data.permitsUnitsIssuedStats} maxY={9000} stacked={true} />
                </TrendsChart>
                <TrendsText title="Issued permits offer a glimpse of future supply">
                    <p>The last four years demonstrate a stable level of ~4000 housing units permitted per year. That gives little hope for meeting mayor’s annual target of 5000 units in near future.</p>
                </TrendsText>
            </TrendsItem>
            <TrendsItem>
                <TrendsChart>
                    <XBarChart data={props.data.permitsUnitsFiledStats} maxY={9000} defaultColor="#FAA61F" stacked={true} />
                </TrendsChart>
                <TrendsText title="New permit applications set record in 2016">
                    <p>However, year-to-year variation is high and the 2017 year saw significantly reduced volume of applications. To meet mayor’s goal in housing production, permit filings volume needs to stay high consistently for several years.</p>
                </TrendsText>
            </TrendsItem>
            <XWriteAcces>
                <TrendsItem>
                    <TrendsChart>
                        <XBarChart data={props.data.permitsUnitsFiledStatsMonthly} defaultColor="#FAA61F" stacked={true} />
                    </TrendsChart>
                    <TrendsText title="Monlthly filed">
                        <p>However, year-to-year variation is high and the 2017 year saw significantly reduced volume of applications. To meet mayor’s goal in housing production, permit filings volume needs to stay high consistently for several years.</p>
                    </TrendsText>
                </TrendsItem>
            </XWriteAcces>
        </Trends>

        <About title="About Us" mail={ExternalLinks.corporateEmail}>
            <AboutItem
                title="Creators"
                text={'This housing analytics portal is developed by [Statecraft](' + ExternalLinks.corporateSite + '), an urban analytics company based in San Francisco. We hope to significantly expand our analysis in near future, with insights for affordable housing, inclusionary requirements, development incentives, and opportunity sites.'}
            />
            <AboutItem
                title="Data sources"
                text="Our database was initially populated from [San Francisco Open Data](https://datasf.org/) portal. Additional information is collected by volunteer contributors from publicly available sources such as developer websites. Statecraft is currently testing new tools to allow all stakeholders to correct and expand individual records."
            />
        </About>

        <Footer />
        </>
    );
})));