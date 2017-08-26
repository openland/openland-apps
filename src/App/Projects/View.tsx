import * as React from 'react';
import { withLoader } from '../Components/withLoader';
import { withProjectQuery } from '../../api/';
import * as C from '../Components';

const intro = 'An automatic script and a sequence of manual checks to derive housing completions from SF quarterly development pipelines.';
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
                    <C.PageIntro intro={intro} />
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
                        <div className="st-page--field">
                            <div className="st-page--field-l">Findings:</div>
                            <div className="st-page--field-r">This project is focused on data transformation and cleanup. The analysis of housing completions is performed in the follow-up project Housing production analysis</div>
                        </div>
                    </div>
                </C.Section>
                <C.Section>
                    <div className="st-page--text is-project">
                        <h2>Methodology</h2>
                        <p>We use SF DBI’s quarterly pipeline datasets (released by DataSF) as the primary source. To identify completed projects in a given quarter, we find all developments that are listed “IN CONSTRUCTION” in the given quarter’s pipeline, and aren’t present in the next quarter’s pipeline.</p>
                        <h2>Cleanup techniques and edge cases</h2>
                        <ul>
                            <li>We use SF DBI’s building permit id as unique identifier to check whether the project continues to be in construction in the next quarter.</li>
                            <li>We manually inspect a few development projects that don’t have a building permit id on their record.</li>
                            <li>We manually merge duplicate records (multiple records with the same unit counts and permit ids).</li>
                            <li>When a given development project states different total units in different quarters, we use the largest number as the number of completed units and attribute all of them for the last quarter the project was in construction.</li>
                            <li>When net units exceed total units (that happened!) we update net units to be equal to total units.</li>
                            <li>When a particular project appears/disappears from the pipeline multiple times, we mark its completion only once for the last appearance.</li>
                            <li>Our affordable units completions are calculated only for 9 quarters as corresponding counts were included only in the last 10 pipeline datasets. </li>
                            <li>To perform a manual review, our script shows top 10 largest completed projects for each quarter.</li>
                            <li>Projects that are most difficult to accurately account for have multiple data quality issues: varying number of units, missing building permit id or ‘multiple’ value instead of actual building permit, multiple or changing street addresses, duplicate records, and multi-phase completion schedule. These projects require manual review to achieve most accurate representation.</li>
                            <li>In our analysis, the hardest-to-account projects are HP Shipyard Phase I (possibly duplicating 101 and 201 Donahue  Street), multiple projects at 55 Laguna Street and 218 Buchanan Street, and townhouse development at 800 Brotherhood Way.</li>
                            <li>Since some development pipeline datasets are published with delays, our analysis provides only approximate timing attribution for completions. In other words, some units might be completed a quarter later than we account them for.</li>
                        </ul>
                        <h2>Future improvements and expansions</h2>
                        <p>Use housing inventory datasets (exist only until 2015) to resolve remaining data quality issues.</p>
                    </div>
                </C.Section>
            </C.Content>
        </C.Page >
    );
}));

export default ViewRender;