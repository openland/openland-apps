import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';

export const Developer = withApp(() => {
    return (
        <>
            <SHeader title="Developer" />
            <SScrollView>
                <ZListItemGroup header={null} divider={false}>
                    <ZListItem text="Worker" path="DevWorker" />
                </ZListItemGroup>
            </SScrollView>
        </>
    )
});