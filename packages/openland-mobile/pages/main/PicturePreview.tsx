import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

class PicturePreviewComponent extends React.PureComponent<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Photo',
        headerAppearance: 'small'
    };
    render() {
        return (
            <View width="100%" height="100%" backgroundColor="#fff">
                <ImageViewer imageUrls={[{ url: 'https://ucarecdn.com/' + this.props.navigation.getParam('uuid') + '/' }]} />
            </View>
        );
    }
}

export const PicturePreview = withApp(PicturePreviewComponent, { navigationStyle: 'small' });