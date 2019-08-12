import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
// import { Thread } from 'react-native-threads';

export const Worker = withApp(() => {

    // React.useEffect(() => {
    //     window.setTimeout(() => {
    //         let res = new Thread('./index.thread.js');
    //         res.onmessage = (msg) => {
    //             console.log(msg);
    //             res.terminate();
    //         };
    //         res.postMessage('hello!');
    //     }, 800);
    //     // console.log('effect');

    //     // return () => {
    //     //     console.log('effect:terminate');
    //     //     res.terminate();
    //     // }
    // }, []);

    return (
        <>
            <SHeader title="Worker" />
            <SScrollView>
                <ZListGroup header={null}>
                    {}
                </ZListGroup>
            </SScrollView>
        </>
    );
});