import * as React from 'react';
import { withDatasetsQuery, DataSet } from '../../api/';
import * as C from '../Components';
import Mansory from 'react-masonry-component';
import { User } from '../../api/User';
import { Account } from '../../api/Account';
import { withUser } from '../Components/UserProvider';

function DataLink(props: { dataset: DataSet }) {

    var icon = 'icon-datasets';
    if (props.dataset.kind === 'document') {
        icon = 'icon-documents';
    } else if (props.dataset.kind === 'link') {
        icon = 'icon-links';
    } else if (props.dataset.kind === 'data-need') {
        icon = 'icon-data-needs';
    }

    if (props.dataset.kind === 'data-need') {
        return (
            <div className="st-data--link">
                <div className="st-data--link-i not-link"><i className={icon}>{}</i>{props.dataset.name}</div>
            </div>
        );
    } else {
        return (
            <div className="st-data--link">
                <a className="st-data--link-i" href={props.dataset.url} target="_blank"><i className={icon}>{}</i>{props.dataset.name}</a>
            </div>
        );
    }
}

function DataLinkBlock(props: { dataset: DataSet[], title: string, icon: C.Icons }) {
    var dest = props.dataset;
    var ungrouped = dest.filter((d) => !d.group).map((d) => <div className="st-data--links"><DataLink dataset={d} /></div>);
    var grouped = dest.filter((d) => d.group)
        .reduce(
        (map, n) => {
            let key = n.group!;
            if (!map.has(key)) {
                map.set(key, [n]);
            } else {
                map.get(key)!!.push(n);
            }
            return map;
        },
        new Map<string, DataSet[]>());
    var keys = Array.from(grouped.keys()).sort();
    var elements: any[] = [];
    var tabsRegexp = /\d\d\d\d\s\Q\d$/;
    keys.forEach((k) => {
        elements.push(<div className="st-data--label">{k}</div>);
        var items = grouped.get(k)!;
        if (items.filter((s) => !(tabsRegexp.exec(s.name!))).length === 0) {
            var index = 0;
            var row: any[] = [];
            var rows: any[] = [];
            items.forEach((d) => {
                row.push(<DataLink dataset={d} />);
                index++;
                if (index === 4) {
                    rows.push((
                        <div className="st-data--grid">{row}</div>
                    ));
                    row = [];
                    index = 0;
                }
            });
            if (row.length > 0) {
                rows.push((
                    <div className="st-data--grid">{row}</div>
                ));
            }
            elements.push(<div className="st-data--section">{rows}</div>);
        } else {
            elements.push(<div className="st-data--section"> {items.map((d) => <div className="st-data--links"><DataLink dataset={d} /></div>)}</div>);
        }
    });

    return (
        <div className="st-page--col">
            <div className="st-box in-grid">
                <div className="st-data">
                    <C.RowTitle title={props.title} icon={props.icon} />
                    <div className="st-data--section">
                        {ungrouped.length > 0 && (
                            <div className="st-data--section">
                                {ungrouped}
                            </div>
                        )}
                        {elements}
                    </div>
                </div>
            </div>
        </div>
    );
}

function datasetCompare(a: DataSet, b: DataSet) {
    return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));
}

class DatasetsPage extends React.Component<{ datasets: [DataSet], user?: User, account: Account }, { tab: string }> {

    constructor(props: { datasets: [DataSet], user?: User, account: Account }) {
        super(props);
        this.state = { tab: 'all' };
    }

    render() {
        var records = [];
        var sorted = this.props.datasets.slice(0).sort(datasetCompare);
        var datasets = sorted.filter((d) => d.kind === 'dataset');
        var documents = sorted.filter((d) => d.kind === 'document');
        var links = sorted.filter((d) => d.kind === 'link');
        var needs = sorted.filter((d) => d.kind === 'data-need');

        if (this.state.tab === 'all' || this.state.tab === 'datasets') {
            if (datasets.length > 0) {
                records.push(<DataLinkBlock dataset={datasets} title="Datasets" icon="datasets" key="_datasets" />);
            }
        }

        if (this.state.tab === 'all' || this.state.tab === 'docs') {
            if (documents.length > 0) {
                records.push(<DataLinkBlock dataset={documents} title="Documents" icon="documents" key="_docs" />);
            }
        }

        if (this.state.tab === 'all' || this.state.tab === 'links') {
            if (links.length > 0) {
                records.push(<DataLinkBlock dataset={links} title="Links" icon="links" key="_links" />);
            }
        }

        if (this.state.tab === 'all' || this.state.tab === 'needs') {
            if (needs.length > 0) {
                records.push(<DataLinkBlock dataset={needs} title="Data Needs" icon="data-needs" key="_needs" />);
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
            <C.Page title="Data Sources">
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
                        {links.length > 0 && (
                            <li className={liClass('links')}>
                                <a
                                    href="#"
                                    onClick={(e: React.MouseEvent<{}>) => {
                                        e.preventDefault();
                                        this.setState({ tab: 'links' });
                                    }}
                                >
                                    Links
                                </a>
                            </li>
                        )}
                        {needs.length > 0 && (
                            <li className={liClass('needs')}>
                                <a
                                    href="#"
                                    onClick={(e: React.MouseEvent<{}>) => {
                                        e.preventDefault();
                                        this.setState({ tab: 'needs' });
                                    }}
                                >
                                    Data Needs
                                </a>
                            </li>
                        )}
                    </ul>
                    {this.props.account.writeAccess && (
                        <div className="st-navigation--btn"><C.Link className="st-btn is-sm is-block" path="/sources/new">Add a source</C.Link></div>
                    )}
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

const DatasetsRender = withDatasetsQuery(withUser(C.withLoader((props) => {
    return <DatasetsPage datasets={props.data.datasets} user={props.user} account={props.account} />;
})));

export default DatasetsRender;