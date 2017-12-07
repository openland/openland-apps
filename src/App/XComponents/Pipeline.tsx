import * as React from 'react';
import { Link } from '../Components/Link';

export function Pipeline() {
    return (
        <div className="x-pipeline">
            <div className="x-container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <div className="x-pipeline--title">Pipeline</div>
                        <div className="x-pipeline--text">List of development projects likely to be completed in 2017-2018.</div>
                        <div className="x-pipeline--btn"><Link path="/pipeline" className="x-btn is-block">Explore the pipeline</Link></div>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        <Link path="/pipeline" className="x-pipeline--list"><img src="img/x-pipeline--list.png" alt="" /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}