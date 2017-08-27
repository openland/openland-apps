import * as React from 'react';
import { withDatasetsQuery, DataSet } from '../../api/';
import * as C from '../Components';
import Mansory from 'react-masonry-component';

class DatasetsPage extends React.Component<{ datasets: [DataSet] }, { tab: string }> {

    constructor() {
        super();
        this.state = { tab: 'all' };
    }

    render() {
        var records = [];
        var datasets = this.props.datasets.filter((d) => d.kind === 'dataset').map((d) => {
            return (
                <div className="st-data--links">
                    <a className="st-data--link" href={d.url} target="_blank"><i className="icon-datasets">{}</i>{d.name}</a>
                </div>
            );
        });
        var documents = this.props.datasets.filter((d) => d.kind === 'document').map((d) => {
            return (
                <div className="st-data--links">
                    <a className="st-data--link" href={d.url} target="_blank"><i className="icon-documents">{}</i>{d.name}</a>
                </div>
            );
        });
        if (this.state.tab === 'all' || this.state.tab === 'datasets') {
            if (datasets.length > 0) {
                records.push((
                    <div className="st-page--col" key="datasets">
                        <div className="st-box in-grid">
                            <div className="st-data">
                                <C.RowTitle title="Datasets" icon="datasets" />
                                <div className="st-data--section">
                                    {datasets}
                                </div>
                            </div>
                        </div>
                    </div>
                ));
            }
        }

        if (this.state.tab === 'all' || this.state.tab === 'docs') {
            if (documents.length > 0) {
                records.push((
                    <div className="st-page--col" key="documents">
                        <div className="st-box in-grid">
                            <div className="st-data">
                                <C.RowTitle title="Documents" icon="documents" />
                                <div className="st-data--section">
                                    {documents}
                                </div>
                            </div>
                        </div>
                    </div>
                ));
            }
        }

        var liClass = (key: string) => {
            if (this.state.tab === key) {
                return 'st-navigation--item is-active';
            } else {
                return 'st-navigation--item';
            }
        };

        return (
            <C.Page>
                <C.Header title="Data Source" />
                <div className="st-navigation">
                    <ul className="st-navigation--list">
                        <li className={liClass('all')}>
                            <a
                                href="#"
                                onClick={(e: React.MouseEvent<{}>) => {
                                    e.preventDefault();
                                    this.setState({ tab: 'all' });
                                }}
                            >
                                All
                            </a>
                        </li>
                        {datasets.length > 0 && (
                            <li className={liClass('datasets')}>
                                <a
                                    href="#"
                                    onClick={(e: React.MouseEvent<{}>) => {
                                        e.preventDefault();
                                        this.setState({ tab: 'datasets' });
                                    }}
                                >
                                    Datasets
                                </a>
                            </li>
                        )}
                        {documents.length > 0 && (
                            <li className={liClass('docs')}>
                                <a
                                    href="#"
                                    onClick={(e: React.MouseEvent<{}>) => {
                                        e.preventDefault();
                                        this.setState({ tab: 'docs' });
                                    }}
                                >
                                    Documents
                                </a>
                            </li>
                        )}
                    </ul>
                    <div className="st-navigation--btn"><C.Link className="st-btn is-sm is-block" path="/sources/new">Add a source</C.Link></div>
                </div>
                <C.Background />
                <C.Grid>
                    <Mansory>
                        {records}
                    </Mansory>
                </C.Grid>
            </C.Page>
        );
    }
}

const DatasetsRender = withDatasetsQuery(C.withLoader((props) => {
    return <DatasetsPage datasets={props.data.datasets} />;
}));

export default DatasetsRender;