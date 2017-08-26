import * as React from 'react';

export const Navigation = function () {
    return (
        <div className="st-navigation">
            <ul className="st-navigation--list">
                <li className="st-navigation--item is-active"><a href="#">All</a></li>
                <li className="st-navigation--item"><a href="#">Documents</a></li>
                <li className="st-navigation--item"><a href="#">Datasets</a></li>
                <li className="st-navigation--item"><a href="#">Links</a></li>
                <li className="st-navigation--item"><a href="#">Data needs</a></li>
            </ul>
            <div className="st-navigation--btn"><a className="st-btn is-sm is-block" href="#">Add a source</a></div>
        </div>
    );
};