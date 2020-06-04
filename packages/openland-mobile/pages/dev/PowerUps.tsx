import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { View } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';

export const PowerUps = withApp(() => {
    return (
        <>
            <SHeader title="PowerUp" />
            <View flexGrow={1} flexShrink={1} alignSelf="stretch">
                {}
            </View>
            {/* <SHeader title="Developer" />
            <SScrollView>
                <ZListGroup header={null}>
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
                    <ZListItem text="Videos" path="DevVideos" />
                    <ZListItem text="Document extensions" path="DevDocumentsExt" />
                    <ZListItem text="Log out" onPress={handleLogout} />
                </ZListGroup>
            </SScrollView> */}
        </>
    );
}, { navigationAppearance: 'small' });