import * as React from 'react';
import { withDatasetsQuery, DataSet } from '../../api/';
import * as C from '../Components';

class DatasetsPage extends React.Component<{ datasets: [DataSet] }, { tab: string }> {

    constructor() {
        super();
        this.state = { tab: 'all' };
    }

    render() {
        var records = [];

        if (this.state.tab === 'all' || this.state.tab === 'datasets') {
            var datasets = this.props.datasets.filter((d) => d.kind === 'dataset').map((d) => {
                return (
                    <div className="st-data--links">
                        <a className="st-data--link" href={d.url} target="_blank"><i className="icon-datasets">{}</i>{d.name}</a>
                    </div>
                );
            });
            if (datasets.length > 0) {
                records.push((
                    <C.Row>
                        <C.RowTitle title="Datasets" icon="datasets" />
                        <div className="st-data--section">
                            {datasets}
                        </div>
                    </C.Row>
                ));
            }
        }

        if (this.state.tab === 'all' || this.state.tab === 'docs') {
            var documents = this.props.datasets.filter((d) => d.kind === 'document').map((d) => {
                return (
                    <div className="st-data--links">
                        <a className="st-data--link" href={d.url} target="_blank"><i className="icon-documents">{}</i>{d.name}</a>
                    </div>
                );
            });
            if (documents.length > 0) {
                records.push((
                    <C.Row>
                        <C.RowTitle title="Documents" icon="documents" />
                        <div className="st-data--section">
                            {documents}
                        </div>
                    </C.Row>
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
                    </ul>
                    <div className="st-navigation--btn"><a className="st-btn is-sm is-block" href="#">Add a source</a></div>
                </div>
                <C.Background />
                <C.Grid>
                    <C.Column>
                        {records}
                    </C.Column>
                </C.Grid>
            </C.Page>
        );
    }
}

const DatasetsRender = withDatasetsQuery(C.withLoader((props) => {
    return <DatasetsPage datasets={props.data.datasets} />;
}));

export default DatasetsRender;