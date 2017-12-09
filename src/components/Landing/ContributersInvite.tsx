import * as React from 'react';

export function ContributersInvite() {
    return (
        <div className="x-form">
            <div className="x-container">
                <div className="x-form--title">Make this forecast more accurate</div>
                <div className="x-form--text">Join our community to correct, expand, or add records to the pipeline</div>
                {/* <form className="x-form--in" method="POST" action="">
                    <div className="x-form--field">
                        <input className="x-input" type="text" placeholder="Full name" />
                    </div>
                    <div className="x-form--field">
                        <input className="x-input" type="text" placeholder="Email" />
                    </div>
                    <div className="x-form--field">
                        <input className="x-input" type="text" placeholder="Organization" />
                    </div>
                    <div className="x-form--btn">
                        <button className="x-btn is-block" type="submit">Join as a contributor</button>
                    </div>
                </form> */}

                <div className="x-form--btn">
                    <a className="x-btn is-block" target="_blank" href="https://goo.gl/forms/YX8LSpH6jWLzbEj02">Join as a contributor</a>
                </div>
            </div>
        </div>
    );
}