import * as React from 'react';

export function ContributersInvite() {
    return (
        <div className="sf-form">
            <div className="container">
                <div className="sf-form--title">Make this forecast more accurate</div>
                <div className="sf-form--text">Join our community to correct, expand, or add records to the pipeline</div>
                <form className="sf-form--in" method="POST" action="">
                    <div className="sf-form--field">
                        <input className="sf-input" type="text" placeholder="Full name" />
                    </div>
                    <div className="sf-form--field">
                        <input className="sf-input" type="text" placeholder="Email" />
                    </div>
                    <div className="sf-form--field">
                        <input className="sf-input" type="text" placeholder="Organization" />
                    </div>
                    <div className="sf-form--btn">
                        <button className="sf-btn is-block" type="submit">Join as a contributor</button>
                    </div>
                </form>
            </div>
        </div>
    );
}