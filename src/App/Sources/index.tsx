import * as React from 'react';
import { withDatasetsQuery } from '../../api/';
import * as C from '../Components';

const DatasetsRender = withDatasetsQuery(C.withLoader((props) => {
    var datasets = props.data.datasets.map((d) => {
        return (
            <div className="st-data--links">
                <a className="st-data--link" href={d.url} target="_blank"><i className="icon-datasets">{}</i>{d.name}</a>
            </div>
        );
    });

    return (
        <C.Page title="Data Sources">
            <C.Grid>
                <C.Column>
                    <C.Row>
                        <C.RowTitle title="Data Sets" icon="datasets" />
                        <div className="st-data--section">
                            {datasets}
                        </div>
                    </C.Row>
                </C.Column>
            </C.Grid>
        </C.Page>
    );
}));

export default DatasetsRender;