import * as React from 'react';
import { XView } from 'react-mental';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import IcHome from 'openland-icons/s/ic-home-24.svg';

export const IndexFragment = React.memo(() => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <USideHeader title="Discussions" />
            <USearchInput
                marginHorizontal={16}
                marginBottom={16}
                placeholder="Groups, people, and more"
            />
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                    <XView flexDirection="column">
                        <UListItem
                            title="Home"
                            path={'/discuss'}
                            icon={<IcHome />}
                        />
                    </XView>
                </XScrollView3>
            </XView>
        </XView>
    );
});