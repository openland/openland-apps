import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import RNRestart from 'react-native-restart';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
// import { NativeModules } from 'react-native';

// function doBenchmark(name: string, count: number, src: Function) {
//     var start = Date.now();
//     for (var i = 0; i < count; i++) {
//         src();
//     }
//     var d = Date.now() - start;
//     console.log(name + ': ' + (Date.now() - start) + ' ms, ' + (count * 1000 / d) + ' op/sec');
// }

export const Developer = withApp(() => {
    // console.log('BENCHMARK: Starting')
    // doBenchmark('BENCHMARK: Simple', 40000, function () {
    //     NativeModules.BenchmarkModule.setConfig()
    // });
    const handleLogout = () => {
        (async () => {
            await AppStorage.resetToken();
            RNRestart.Restart();
        })();
    }
    return (
        <>
            <SHeader title="Developer" />
            <SScrollView>
                <ZListItemGroup header={null} divider={false}>
                    <ZListItem text="Worker" path="DevWorker" />
                    <ZListItem text="Components" path="DevComponents" />
                    <ZListItem text="Benchmarks" path="DevBenchmarks" />
                    <ZListItem text="Benchmarks Async" path="DevBenchmarksAsync" />
                    <ZListItem text="Benchmarks Async Direct" path="DevBenchmarksAsyncDirect" />
                    <ZListItem text="Typography" path="DevTypography" />
                    <ZListItem text="Components" path="DevComponents" />
                    <ZListItem text="Navigation" path="DevNavigation" />
                    <ZListItem text="Loader" path="DevLoader" />
                    <ZListItem text="Log out" onPress={handleLogout} />
                </ZListItemGroup>
            </SScrollView>
        </>
    )
});