import * as React from 'react';
import { PView } from 'openland-pegasus/PView';
import { PHeader } from 'openland-pegasus/PHeader';
import { PMap, PMyLocation } from 'openland-pegasus/PMap';
import { useClient } from 'openland-y-graphql/GQLClientContext';
import { AppGeolocation } from 'openland-y-runtime/AppGeolocation';
import { AppAlertBlanket } from 'openland-y-runtime/AppAlertBlanket';
import { PText } from 'openland-pegasus/PText';

export const PowerupSample = React.memo(() => {
    const client = useClient();
    const acc = client.useAccount();
    const [myLocation, setMyLocation] = React.useState<{ latitude: number, longitude: number } | undefined>(undefined);
    const [permission, setPermission] = React.useState<'unknown' | 'unsupported' | 'allow' | 'deny'>('unknown');

    //
    // Get User Consent befor requesting permission
    //
    React.useEffect(() => {
        let canceled = false;
        (async () => {
            let state = await AppGeolocation.permissionState();
            if (canceled) {
                return;
            }
            if (state === 'initial') {
                AppAlertBlanket.builder()
                    .message('To see everybody on the map, please share your location with others')
                    .action('Deny', 'destructive', () => {
                        setPermission('deny');
                    })
                    .action('Share', 'default', () => {
                        setPermission('allow');
                    })
                    .show();

            } else if (state === 'allow') {
                setPermission('allow');
            } else if (state === 'deny') {
                setPermission('deny');
            } else if (state === 'unsupported') {
                setPermission('unsupported');
            }
        })();
        return () => {
            canceled = true;
        };
    }, []);

    //
    // Perform Permission Request
    //
    React.useEffect(() => {
        let canceled = false;
        if (permission === 'allow') {
            (async () => {
                let state = await AppGeolocation.permissionState();
                if (canceled) {
                    return;
                }
                if (state === 'initial') {
                    state = await AppGeolocation.requestPermissions();
                    if (canceled) {
                        return;
                    }
                }

                if (state === 'allow') {
                    let res = await AppGeolocation.getCurrentPosition();
                    if (canceled) {
                        return;
                    }
                    setMyLocation(res);
                } else if (state === 'deny') {
                    // Update permission test since user rejected to share location
                    setPermission('deny');
                }
            })();
        }
        return () => {
            canceled = true;
        };
    }, [permission]);

    return (
        <>
            <PHeader title={`Hi, ${acc.me!.firstName}, this is Power Up Sample!`} />
            <PView
                width={'100%'}
                flexGrow={1}
                flexShrink={1}
                backgroundColor="red"
            >
                <PMap>
                    {myLocation && <PMyLocation latitude={myLocation.latitude} longitude={myLocation.longitude} />}
                </PMap>
                <PView
                    position="absolute"
                    height={100}
                    bottom={0}
                    left={0}
                    right={0}
                    backgroundColor="rgba(1,0,0,0.5)"
                >
                    <PText>
                        {permission}
                    </PText>
                </PView>
            </PView>
        </>
    );
});