import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import RNRestart from 'react-native-restart';
import { AppStorage } from 'openland-mobile/utils/AppStorage';

export const Developer = withApp(() => {
    const handleLogout = () => {
        (async () => {
            await AppStorage.clear();
            RNRestart.Restart();
        })();
    };

    return (
        <>
            <SHeader title="Developer" />
            <SScrollView>
                <ZListItemGroup header={null}>
                    <ZListItem text="Colors" path="DevColors" />
                    <ZListItem text="Avatars" path="DevAvatars" />
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
                    <ZListItem text="Log out" onPress={handleLogout} />
                </ZListItemGroup>
            </SScrollView>
        </>
    );
});