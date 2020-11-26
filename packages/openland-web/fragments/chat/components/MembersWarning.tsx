import React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

import { TextStyles } from 'openland-web/utils/TextStyles';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { UButton } from 'openland-web/components/unicorn/UButton';

const crowdImageStyle = css`
    margin: 32px 0;
    height: 170px;
    background: url(https://cdn.openland.com/shared/art/art-crowd.png) center center / contain
        no-repeat;
    background-image: -webkit-image-set(url(https://cdn.openland.com/shared/art/art-crowd.png) 1x,
        url(https://cdn.openland.com/shared/art/art-crowd@2x.png) 2x,
        url(https://cdn.openland.com/shared/art/art-crowd@3x.png) 3x);
`;

export const MembersWarning = React.memo(
    (props: { hide: () => void; parentHide: () => void }) => {
        const { hide, parentHide } = props;

        const onCancel = () => {
            parentHide();
            hide();
        };

        return (
            <>
                <XView {...TextStyles.Body} marginHorizontal={24}>
                    Please, only add people whom you know will be interested in your group
                </XView>
                <div className={crowdImageStyle} />
                <XModalFooter>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={onCancel} />
                    <UButton text="Continue" style="primary" size="large" onClick={hide} />
                </XModalFooter>
            </>
        );
    },
);
