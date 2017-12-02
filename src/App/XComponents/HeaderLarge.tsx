import * as React from 'react';
import { withUser } from '../Components/UserProvider';
import * as A from '../../auth';
export const HeaderLarge = withUser((props) => {
    return (
        <div className="sf-intro">
            <div className="container">
                <div className="sf-header">
                    <a className="sf-header--logo" href="/"><img src="/img/logotype.svg" alt="" /></a>
                    <ul className="sf-header--nav">
                        {props.user &&
                            <li className="sf-header--item"><a href="#"><img src={props.user.picture} alt="" />{props.user.firstName} {props.user.lastName}</a></li>
                        }
                        {!props.user &&
                            <li className="sf-header--item"><a href="#" onClick={e => { e.preventDefault(); A.login(); }}>Sign In</a></li>
                        }
                        {!props.user &&
                            (<li className="sf-header--item is-join"><a href="#" onClick={e => { e.preventDefault(); A.login(); }}>Join</a></li>)
                        }
                    </ul>
                </div>
                <div className="sf-intro--in">
                    {props.children}
                </div>
            </div>
        </div>
    );
});