import * as React from 'react';
import { css } from 'linaria';
import { LandingLinks } from '../_links';
import { GoogleButton, EmailButton } from 'openland-web/pages/init/components/SignComponents';

let homeFormRootClass = css`
    margin: 0 0 30px;
    width: 465px;
    display: flex;
    flex-direction: row;

    @media (max-width: 767px) {
        margin: 0 auto 20px;
        width: 234px;
        flex-direction: column;
    }
    @media (min-width: 768px) and (max-width: 999px) {
        margin-left: auto;
        margin-right: auto;
    }
`;

let homeFormBtnClass = css`
    flex-grow: 1;

    &:first-child {
        margin-right: 6px;

        @media (max-width: 767px) {
            margin-right: 0;
            margin-bottom: 12px;
        }
    }

    &:last-child {
        margin-left: 6px;

        @media (max-width: 767px) {
            margin-left: 0;
        }
    }
`;

export const HomeForm = () => (
    <div className={homeFormRootClass}>
        <div className={homeFormBtnClass}>
            <GoogleButton
                path={LandingLinks.signup + '?google=true'}
                text="Sign up with Google"
                rounded={true}
            />
        </div>
        <div className={homeFormBtnClass}>
            <EmailButton
                path={LandingLinks.signup + '?email=true'}
                text="Sign up with Email"
                rounded={true}
            />
        </div>
    </div>
);
