import React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

import { TextStyles } from 'openland-web/utils/TextStyles';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useTheme } from 'openland-x-utils/useTheme';

const crowdImageStyle = css`
    margin: 32px 0;
    height: 170px;
    background: url(https://cdn.openland.com/shared/art/art-crowd-new.png) center center / contain
        no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-crowd-new.png) 1x,
        url(https://cdn.openland.com/shared/art/art-crowd-new@2x.png) 2x,
        url(https://cdn.openland.com/shared/art/art-crowd-new@3x.png) 3x);
`;

const crowdImageDarkStyle = css`
    margin: 32px 0;
    height: 170px;
    background: url(https://cdn.openland.com/shared/art/art-crowd-new-dark.png) center center / contain
        no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-crowd-new-dark.png) 1x,
        url(https://cdn.openland.com/shared/art/art-crowd-new-dark@2x.png) 2x,
        url(https://cdn.openland.com/shared/art/art-crowd-new-dark@3x.png) 3x);
`;

export const MembersWarning = React.memo(
    (props: { hide: () => void; parentHide: () => void }) => {
        const { hide, parentHide } = props;

        const onCancel = () => {
            parentHide();
            hide();
        };

        const crowdImageClass = useTheme().theme === 'dark' ? crowdImageDarkStyle : crowdImageStyle;

        return (
            <>
                <XView {...TextStyles.Body} marginHorizontal={24}>
                    Please, only add people whom you know will be interested in your group
                </XView>
                <div className={crowdImageClass} />
                <XModalFooter>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={onCancel} />
                    <UButton text="Continue" style="primary" size="large" onClick={hide} />
                </XModalFooter>
            </>
        );
    },
);
