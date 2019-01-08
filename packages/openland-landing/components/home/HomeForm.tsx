import * as React from 'react';
import { css } from 'linaria';
import { LandingLinks } from '../_links';
import { GoogleButton, EmailButton } from 'openland-web/pages/init/components/SignComponents';
import { XView } from 'react-mental';

let homeFormRootClass = css`
    margin: 0 0 30px;
    width: 465px;
    display: flex;
    flex-direction: row;

    @media (max-width: 767px) {
        margin: 0 0 20px;
        width: auto;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        margin-left: auto;
        margin-right: auto;
    }
`;

export const HomeForm = () => (
    <div className={homeFormRootClass}>
        <XView flexGrow={1} marginRight={6}>
            <GoogleButton
                path={LandingLinks.signup + '?google=true'}
                text="Sign up with Google"
                rounded={true}
            />
        </XView>
        <XView flexGrow={1} marginLeft={6}>
            <EmailButton
                path={LandingLinks.signup + '?email=true'}
                text="Sign up with Email"
                rounded={true}
            />
        </XView>
    </div>
);
