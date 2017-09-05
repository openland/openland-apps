import * as React from 'react';
import * as Router from 'react-router';

import * as C from '../Components';
import { withFindingsQuery } from '../../api/';

export default withFindingsQuery(C.withLoader((props) => {
    var years = ['2014', '2015', '2016', '2017'];
    var quarters = [
        '14\'Q1', '14\'Q2', '14\'Q3', '14\'Q4',
        '15\'Q1', '15\'Q2', '15\'Q3', '15\'Q4',
        '16\'Q1', '16\'Q2', '16\'Q3', '16\'Q4',
        '17\'Q4'
    ];
    var unitsByYearChart: C.BarChartData = {
        labels: years,
        datasets: [
            { label: 'Total completed', data: [4198, 2323, 5815, 1062], color: '#34b5ff' },
            { label: 'Affordable completed', data: [0, 211, 358, 71], color: '#535de8' },
            { label: 'Total in-construction', data: [5255, 9124, 11915, 6105], color: '#ff5c54' },
            { label: 'Affordable in-construction', data: [509, 1025, 3363, 1170], color: '#ffc334' }
        ]
    };
    var unitsByQuarterChart: C.BarChartData = {
        labels: quarters,
        datasets: [
            { label: 'Total сompleted', data: [1672, 328, 732, 1466, 485, 337, 845, 656, 1674, 1272, 1151, 1718, 1062], color: '#34b5ff' },
            { label: 'Affordable completed', data: [0, 0, 0, 0, 0, 10, 34, 167, 64, 96, 175, 23, 71], color: '#535de8' },
            { label: 'Total in-construction', data: [5106, 6187, 7246, 7793, 7723, 8651, 9186, 9142, 8716, 8385, 7598, 6754, 6105], color: '#ff5c54' },
            { label: 'Affordable in-construction', data: [0, 0, 0, 404, 454, 1147, 1135, 999, 915, 871, 781, 796, 1170], color: '#ffc334' }
        ]
    };
    var projectsByYearChart: C.BarChartData = {
        labels: years,
        datasets: [
            { label: 'Completed', data: [104, 74, 173, 50], color: '#34b5ff' },
            { label: 'In construction', data: [188, 222, 201, 185], color: '#535de8' },
        ]
    };
    var projectsByQuarterChart: C.BarChartData = {
        labels: quarters,
        datasets: [
            { label: 'Completed', data: [18, 15, 28, 43, 18, 16, 16, 24, 71, 27, 34, 41, 50], color: '#34b5ff' },
            { label: 'In construction', data: [164, 188, 188, 183, 197, 206, 222, 205, 175, 194, 197, 201, 185], color: '#535de8' },
        ]
    };

    function charts() {
        return (
            <div className="st-page--text is-charts">
                <h2>Net new units by quarter</h2>
                <C.BarChart data={unitsByQuarterChart} />
                <h2>Net new units by year</h2>
                <C.BarChart data={unitsByYearChart} />
                <h2>Projects by quarter</h2>
                <C.BarChart data={projectsByQuarterChart} />
                <h2>Projects by year</h2>
                <C.BarChart data={projectsByYearChart} />
            </div>
        );
    }

    return (
        <C.Page>
            <C.Header title="Findings" />
            <C.Background />
            {props.data.findings && (
                <C.Content>
                    <C.Section>
                        <C.PageTitle title={props.data.findings.title} />
                        <C.PageIntro intro={props.data.findings.intro} />
                        <div className="st-page--tools">
                            <div className="st-page--authors">
                                <a className="st-page--author" href="mailto:yury@statecraft.one">
                                    <img src="/img/profile_yury.jpg" alt="" />Yury Lifshits
                            </a>
                                <a className="st-page--author" href="mailto:steve@statecraft.one">
                                    <img src="/img/profile_steve.jpg" alt="" />Stepan Korshakov
                            </a>
                            </div>
                            <div className="st-page--contacts">
                                <a className="st-page--contact" href="mailto:yury@statecraft.one"><i className="icon-email">{}</i>yury@statecraft.one</a>
                            </div>
                        </div>
                    </C.Section>
                    {props.data.findings.description && (
                        <C.Section>
                            <div className="st-page--tabs">
                                <C.Button className="st-page--tab" activeClassName="is-active" path="/findings">Key findings</C.Button>
                                <C.Button className="st-page--tab" activeClassName="is-active" path="/findings/charts">Charts</C.Button>
                                <C.Button className="st-page--tab" activeClassName="is-active" path="/findings/recomendations">Recommendations</C.Button>
                            </div>
                            <Router.Route exact={true} path="/findings" component={() => (<C.Formatted className="st-page--text" text={props.data.findings!!.description!!} />)} />
                            <Router.Route exact={true} path="/findings/charts" component={charts} />
                            <Router.Route exact={true} path="/findings/recomendations" component={() => (<C.Formatted className="st-page--text" text={props.data.findings!!.recomendations!!} />)} />
                        </C.Section>
                    )}
                    <C.Section>
                        <div className="st-subscribe">
                            <div className="st-subscribe--title">Housing insights from Statecraft</div>
                            <div className="st-subscribe--text">Subscribe to housing trends and statistics in San Francisco</div>
                            <form className="st-subscribe--form" method="POST" action="https://one.us15.list-manage.com/subscribe/post?u=b588cb73ec7bd801c3b609670&amp;id=982401175d" target="_blank">
                                <input className="st-input" type="email" placeholder="Your email address" name="EMAIL" />
                                <div className="st-subscribe--submit">
                                    <button className="st-btn is-lg is-block" type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </C.Section>
                </C.Content>
            )}
            {!props.data.findings && (
                <C.Content>
                    <C.Section>
                        <C.PageTitle title="No Findings Yet" />
                    </C.Section>
                </C.Content>
            )}

            <Router.Route
                exact={true}
                path="/findings"
                component={() => (
                    <div className="st-page--nav">
                        <C.Link className="st-page--nav-i" path="/findings/charts"><span>Charts</span><i className="icon-right-arrow">{}</i></C.Link>
                        <C.Link className="st-page--nav-i" path="/findings/recomendations"><span>Recomendations</span><i className="icon-last-arrow">{}</i></C.Link>
                    </div>
                )}
            />

            <Router.Route
                exact={true}
                path="/findings/charts"
                component={() => (
                    <div className="st-page--nav">
                        <C.Link className="st-page--nav-i" path="/findings"><i className="icon-left-arrow">{}</i><span>Key findings</span></C.Link>
                        <C.Link className="st-page--nav-i" path="/findings/recomendations"><span>Recomendations</span><i className="icon-right-arrow">{}</i></C.Link>
                    </div>
                )}
            />

            <Router.Route
                exact={true}
                path="/findings/recomendations"
                component={() => (
                    <div className="st-page--nav">
                        <C.Link className="st-page--nav-i" path="/findings"><i className="icon-first-arrow">{}</i><span>Key findings</span></C.Link>
                        <C.Link className="st-page--nav-i" path="/findings/charts"><i className="icon-left-arrow">{}</i><span>Charts</span></C.Link>
                    </div>
                )}
            />

        </C.Page>
    );
}));