import * as React from 'react';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { css } from 'linaria';
import { XViewRouter } from 'react-mental';
import { useTheme } from 'openland-x-utils/useTheme';

const container = css`
    background: url(https://cdn.openland.com/shared/art/art-balance.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-balance.png) 1x, url(https://cdn.openland.com/shared/art/art-balance@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-balance@3x.png) 3x);
    height: 200px;
    width: 340px;
    margin: -4px auto 24px;
`;

const containerDark = css`
    background: url(https://cdn.openland.com/shared/art/art-balance-dark.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-balance-dark.png) 1x, url(https://cdn.openland.com/shared/art/art-balance-dark@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-balance-dark@3x.png) 3x);
    height: 200px;
    width: 340px;
    margin: -4px auto 24px;
`;

export const showWithdrawFunds = async (router: XViewRouter) => {
        const builder = new AlertBlanketBuilder();

        builder
            .title('Withdraw funds')
            .message('To request funds withdrawal ($50 minimum) message\u00A0Openland support for instructions')
            .body(ctx => <div className={useTheme().theme === 'dark' ? containerDark : container} />)
            .action('Continue', async() => { router.navigate('/mail/LOaDEWDj9zsVv999DDpJiEj05K'); }, 'primary')
            .width(400);
        builder.show();
};