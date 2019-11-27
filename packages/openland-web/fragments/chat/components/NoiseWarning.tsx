import * as React from 'react';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { css } from 'linaria';

const warningContainer = css`
    background: url(/static/art/art-noise.png) center center no-repeat;
    background-image: -webkit-image-set(url(/static/art/art-noise.png) 1x, url(/static/art/art-noise@2x.png) 2x, url(/static/art/art-noise@3x.png) 3x);
    height: 200px;
    margin: -8px 0 20px;
`;

export const showNoiseWarning = async (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title(title);
        builder.message(message);

        builder.body(ctx => (
            <div className={warningContainer} />
        ));

        builder.action('Continue', async () => { resolve(); }, 'danger');
        builder.onCancel(reject);
        builder.show();
    });
};