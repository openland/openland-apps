import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const ComposeComponent = XMemo<PageProps>((props) => {
    return (
        <>
            <SHeader title="Openland apps" hairline="hidden" />
            <ZListItem title="Mac" />
        </>
    );
});

export const Compose = withApp(ComposeComponent, { navigationAppearance: 'small-hidden', hideHairline: true });