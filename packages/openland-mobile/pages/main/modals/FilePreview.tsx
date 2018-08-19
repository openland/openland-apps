import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZHeader } from '../../../components/ZHeader';
import { View } from 'react-native';

class FilePreviewComponent extends React.PureComponent<NavigationInjectedProps> {
    render() {
        return (
            <>
                <ZHeader title="File" />
                <View backgroundColor="#fff" flexGrow={1}>
                    {}
                </View>
            </>
        );
    }
}

export const FilePreview = withApp(FilePreviewComponent, { navigationAppearance: 'small' });