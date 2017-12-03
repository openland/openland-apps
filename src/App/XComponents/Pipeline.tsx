import * as React from 'react';

export function Pipeline() {
    return (
        <div className="x-pipeline">
            <div className="x-container">
                <div className="row">
                    <div className="col-xs-12 col-lg-4">
                        <div className="x-pipeline--title">Pipeline</div>
                        <div className="x-pipeline--text">List of development projects likely to be completed in 2017-2018.</div>
                        <div className="x-pipeline--btn"><a className="x-btn is-block" href="#">Explore the pipeline</a></div>
                    </div>
                    <div className="col-xs-12 col-lg-8">
                        <div className="x-pipeline--list"><img src="img/x-pipeline--list.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}