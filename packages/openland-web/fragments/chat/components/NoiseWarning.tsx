import * as React from 'react';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { css } from 'linaria';
import { useTheme } from 'openland-x-utils/useTheme';

const warningContainer = css`
    background: url(https://cdn.openland.com/shared/art/art-noise.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-noise.png) 1x, url(https://cdn.openland.com/shared/art/art-noise@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-noise@3x.png) 3x);
    height: 200px;
    margin: -8px 0 20px;
`;

const warningContainerDark = css`
    background: url(https://cdn.openland.com/shared/art/art-noise-dark.png) center center no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-noise-dark.png) 1x, url(https://cdn.openland.com/shared/art/art-noise-dark@2x.png) 2x, url(https://cdn.openland.com/shared/art/art-noise-dark@3x.png) 3x);
    height: 200px;
    margin: -8px 0 20px;
`;

export const showNoiseWarning = async (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title(title);
        builder.message(message);
        builder.body(ctx => <div className={useTheme().theme === 'dark' ? warningContainerDark : warningContainer} />);
        builder.action('Continue', async () => { resolve(); }, 'danger');
        builder.onCancel(reject);
        builder.width(480);
        builder.show();
    });
};