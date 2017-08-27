import * as React from 'react';
import * as Router from 'react-router';

import * as C from '../Components';
import { withFindingsQuery } from '../../api/';

export default withFindingsQuery(C.withLoader((props) => {
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
                            <Router.Route exact={true} path="/findings/recomendations" component={() => (<C.Formatted className="st-page--text" text={props.data.findings!!.recomendations!!} />)} />
                        </C.Section>
                    )}
                    <C.Section>
                        <div className="st-subscribe">
                            <div className="st-subscribe--title">Housing insights from Statecraft</div>
                            <div className="st-subscribe--text">Subscribe and stay up to date with the latest insights from Statecraft</div>
                            <form className="st-subscribe--form" method="POST" action="">
                                <input className="st-input" type="text" placeholder="Your email address" />
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
        </C.Page>
    );
}));