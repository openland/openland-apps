import * as React from 'react';

export function Loader() {
    return (
        <div className="st-loader">
            <svg className="st-loader--svg" viewBox="25 25 50 50">
                <circle className="st-loader--circle" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
            </svg>
        </div>
    );
}