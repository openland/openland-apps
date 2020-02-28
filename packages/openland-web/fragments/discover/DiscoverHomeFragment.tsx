import React from 'react';
import { Page } from 'openland-unicorn/Page';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { css } from 'linaria';

const slide = css`
    width: 200px;
    height: 200px;
    background: grey;
    flex-shrink: 0;
`;

export const DiscoverHomeFragment = React.memo(() => {
    return (
        <Page track="discover_home">
            <USlider>
                <div className={slide}>one</div>
                <div className={slide}>two</div>
                <div className={slide}>three</div>
                <div className={slide}>four</div>
            </USlider>
        </Page>
    );
});
