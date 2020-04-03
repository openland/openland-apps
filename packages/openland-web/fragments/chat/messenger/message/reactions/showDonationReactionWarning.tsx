import * as React from 'react';
import { css } from 'linaria';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';

const container = css`
    background: url(https://cdn.openland.com/shared/art/art-balance.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-balance.png) 1x, url(https://cdn.openland.com/shared/art/art-balance@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-balance@3x.png) 3x);
    height: 200px;
    width: 340px;
    margin: -4px auto 24px;
`;

export const showDonationReactionWarning = (action: () => Promise<any>) => {
    let builder = new AlertBlanketBuilder();
    builder
        .title('Premium reaction')
        .message('Express your support with a donation to the author')
        .body(() => <div className={container} />)
        .action('Donate $1', async() => { await action(); }, 'pay')
        .width(400);
    builder.show();
};
