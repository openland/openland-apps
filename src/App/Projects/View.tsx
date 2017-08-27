import * as React from 'react';
import { withLoader } from '../Components/withLoader';
import { withProjectQuery } from '../../api/';
import * as C from '../Components';

const ViewRender = withProjectQuery(withLoader((props) => {
    return (
        <C.Page>
            <C.Header title="Projects" subtitle={props.data.project.name} />
            <C.Background />
            <C.Content>
                <C.Section>
                    <C.PageTitle title={props.data.project.name} >
                        <a className="st-btn is-outline" href="#">Follow project</a>
                    </C.PageTitle>
                    {props.data.project.intro && (
                        <C.PageIntro intro={props.data.project.intro} />
                    )}
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
                {(props.data.project.findings != null || props.data.project.sources.length > 0 || props.data.project.outputs.length > 0) && (
                    <C.Section>
                        <div className="st-page--fields">
                            {props.data.project.sources.length > 0 && (
                                <div className="st-page--field">
                                    <div className="st-page--field-l">Code:</div>
                                    <div className="st-page--field-r">
                                        <div className="st-link-icon--w">
                                            {props.data.project.sources.map((s) => (
                                                <a className="st-link-icon" href={s.url}><i className="icon-github">{}</i>{s.title}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {props.data.project.outputs.length > 0 && (
                                <div className="st-page--field">
                                    <div className="st-page--field-l">Code:</div>
                                    <div className="st-page--field-r">
                                        <div className="st-link-icon--w">
                                            {props.data.project.outputs.map((s) => (
                                                <a className="st-link-icon" href={s.url}><i className="icon-csv">{}</i>{s.title}</a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {props.data.project.findings && (
                                <div className="st-page--field">
                                    <div className="st-page--field-l">Findings:</div>
                                    <C.Formatted className="st-page--field-r" text={props.data.project.findings} />
                                </div>
                            )}
                        </div>
                    </C.Section>
                )}
                {props.data.project.description && (
                    <C.Section>
                        <C.Formatted className="st-page--text is-project" text={props.data.project.description} />
                    </C.Section>
                )}
            </C.Content>
        </C.Page >
    );
}));

export default ViewRender;