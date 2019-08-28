import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { NativeVideoPreview } from 'openland-mobile/videos/NativeVideoPreview';

class ComponentsComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <SScrollView>
                <NativeVideoPreview name="sample" />
            </SScrollView>
        );
    }
}

export const Videos = withApp(ComponentsComponent);