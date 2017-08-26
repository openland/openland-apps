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
                            <a className="st-page--author" href="#">
                                <img src="http://placehold.it/48" alt="" />Yury Lifshits
                            </a>
                            <a className="st-page--author" href="#">
                                <img src="http://placehold.it/48" alt="" />Stepan Korshakov
                            </a>
                        </div>
                        <div className="st-page--contacts">
                            <a className="st-page--contact" href="#"><i className="icon-email">{}</i>yury@statecraft.one</a>
                        </div>
                    </div>
                </C.Section>
                <C.Section>
                    <div className="st-page--fields">
                        <div className="st-page--field">
                            <div className="st-page--field-l">Code:</div>
                            <div className="st-page--field-r">
                                <div className="st-link-icon--w"><a className="st-link-icon" href="#"><i className="icon-github">{}</i>Source code</a><a className="st-link-icon" href="#"><i className="icon-github">{}</i>Step-by-step comments</a></div>
                            </div>
                        </div>
                        <div className="st-page--field">
                            <div className="st-page--field-l">Outputs:</div>
                            <div className="st-page--field-r">
                                <div className="st-link-icon--w"><a className="st-link-icon" href="#"><i className="icon-csv">{}</i>Housing completions by quarter</a><a className="st-link-icon" href="#"><i className="icon-csv">{}</i>In-construction projects by quarter</a></div>
                            </div>
                        </div>
                        {props.data.project.findings && (
                            <div className="st-page--field">
                                <div className="st-page--field-l">Findings:</div>
                                <C.Formatted className="st-page--field-r" text={props.data.project.findings} />
                            </div>
                        )}
                    </div>
                </C.Section>
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