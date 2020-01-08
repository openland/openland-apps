import * as React from 'react';
import { PView } from 'openland-pegasus/PView';
import { PHeader } from 'openland-pegasus/PHeader';
import { PMap } from 'openland-pegasus/PMap';

export const PowerupSample = React.memo(() => {
    return (
        <>
            <PHeader title="Power Up Sample!" />
            <PView
                width={'100%'}
                flexGrow={1}
                flexShrink={1}
                backgroundColor="red"
            >
                <PMap />
                <PView
                    position="absolute"
                    height={100}
                    bottom={0}
                    left={0}
                    right={0}
                    backgroundColor="rgba(1,0,0,0.5)"
                >
                    {}
                </PView>
            </PView>
        </>
    );
});