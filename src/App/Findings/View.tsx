import * as React from 'react';
import * as Router from 'react-router';

import * as C from '../Components';
import { withFindingsQuery } from '../../api/';

export default withFindingsQuery(C.withLoader((props) => {

    var chart1: C.BarChartData = {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
        datasets: [
            { label: 'Total completed', data: [90, 70, 105, 60, 75, 90, 105, 60], color: '#34b5ff' },
            { label: 'Affordable completed', data: [70, 63, 77, 35, 85, 70, 77, 35], color: '#535de8' },
            { label: 'Total in-construction', data: [90, 70, 105, 60, 75, 90, 105, 60], color: '#ff5c54' },
            { label: 'Affordable in-construction', data: [70, 63, 77, 35, 85, 70, 77, 35], color: '#ffc334' }
        ]
    };

    function charts() {
        return <C.BarChart data={chart1} />;
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
                        <C.Link className="st-page--nav-i" path="/findings/recomendations"><span>Charts</span><i className="icon-last-arrow">{}</i></C.Link>
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