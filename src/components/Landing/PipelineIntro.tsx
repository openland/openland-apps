import * as React from 'react';
import { XLink } from '../X/XLink';

export function PipelineIntro() {
    return (
        <div className="x-pipeline">
            <div className="x-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <div className="x-pipeline--title">Pipeline</div>
                        <div className="x-pipeline--text">List of development projects likely to be completed in 2017-2018.</div>
                        <div className="x-pipeline--btn"><XLink path="/pipeline" className="x-btn is-block">Explore the pipeline</XLink></div>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <div className="x-pipeline--list"><img src="/static/img/x-pipeline--list.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}