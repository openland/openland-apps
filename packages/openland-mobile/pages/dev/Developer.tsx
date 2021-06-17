import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { logout } from 'openland-mobile/utils/logout';

export const Developer = withApp(() => {

    return (
        <>
            <SHeader title="Developer" />
            <SScrollView>
                <ZListGroup header={null}>
                    <ZListItem text="Colors" path="DevColors" />
                    <ZListItem text="Typography" path="DevTypography" />
                    <ZListItem text="List items" path="DevComponents" />
                    <ZListItem text="Inputs" path="DevInputs" />
                    <ZListItem text="Buttons" path="DevButtons" />
                    <ZListItem text="Loaders" path="DevLoader" />
                    <ZListItem text="Toast" path="DevToast" />
                    <ZListItem text="Bottom Sheet" path="DevBottomSheet" />
                    <ZListItem text="Worker" path="DevWorker" />
                    <ZListItem text="Benchmarks" path="DevBenchmarks" />
                    <ZListItem text="Benchmarks Async" path="DevBenchmarksAsync" />
                    <ZListItem text="Benchmarks Async Direct" path="DevBenchmarksAsyncDirect" />
                    <ZListItem text="Navigation" path="DevNavigation" />
                    <ZListItem text="Bad User Profile" path="ProfileUser" pathParams={{ id: "1" }} />
                    <ZListItem text="Videos" path="DevVideos" />
                    <ZListItem text="Document extensions" path="DevDocumentsExt" />
                    <ZListItem text="PowerUps" path="DevPowerUps" pathPresent={true} />
                    <ZListItem text="Log out" onPress={logout} />
                </ZListGroup>
            </SScrollView>
        </>
    );
});