import * as React from 'react';
import * as C from '../Components';
import { withFindingsQuery } from '../../api/';

export default withFindingsQuery(C.withLoader((props) => {
    console.warn(props.data.findings);
    return (
        <div>
            <C.Header title="Findings" />
            {props.data.findings && (
                <div>
                    <h1>{props.data.findings.title}</h1>
                    <h5>{props.data.findings.intro}</h5>
                </div>
            )}
            {!props.data.findings && (
                <div>No findings yet</div>
            )}
        </div>
    );
}));