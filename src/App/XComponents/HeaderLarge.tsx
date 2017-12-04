import * as React from 'react';
import { withUser } from '../Components/UserProvider';
import * as A from '../../auth';
export const HeaderLarge = withUser((props) => {
    return (
        <div className="x-intro">
            <div className="x-container">
                <div className="x-header">
                    <a className="x-header--logo" href="/"><img src="/img/logotype.svg" alt="" /></a>
                    <ul className="x-header--nav">
                        {props.user &&
                            <li className="x-header--item"><span><img src={props.user.picture} alt="" />{props.user.firstName} {props.user.lastName}</span></li>
                        }
                        {props.user &&
                            <li className="x-header--item is-join"><button onClick={e => { e.preventDefault(); A.logout(); }}>Log Out</button></li>
                        }
                        {!props.user &&
                            <li className="x-header--item"><button onClick={e => { e.preventDefault(); A.login(); }}>Sign In</button></li>
                        }
                        {!props.user &&
                            (<li className="x-header--item is-join"><button onClick={e => { e.preventDefault(); A.login(); }}>Join</button></li>)
                        }
                    </ul>
                </div>
                <div className="x-intro--in">
                    {props.children}
                </div>
            </div>
        </div>
    );
});