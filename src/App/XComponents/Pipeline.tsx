import * as React from 'react';

export function Pipeline() {
    return (
        <div className="sf-pipeline">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sf-pipeline--title">Pipeline</div>
                        <div className="sf-pipeline--text">List of development projects likely to be completed in 2017-2018.</div>
                        <div className="sf-pipeline--btn"><a className="sf-btn is-block" href="#">Explore the pipeline</a></div>
                    </div>
                    <div className="col-lg-8">
                        <div className="sf-pipeline--list"><img src="img/sf-pipeline--list.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}