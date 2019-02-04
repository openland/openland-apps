import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { NativeModules } from 'react-native';

function doBenchmark(name: string, count: number, src: Function) {
    var start = Date.now();
    for (var i = 0; i < count; i++) {
        src();
    }
    var d = Date.now() - start;
    console.log(name + ': ' + (Date.now() - start) + ' ms, ' + (count * 1000 / d) + ' op/sec');
}

export const Developer = withApp(() => {
    console.log('BENCHMARK: Starting')
    doBenchmark('BENCHMARK: Simple', 40000, function () {
        NativeModules.BenchmarkModule.setConfig()
    });
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