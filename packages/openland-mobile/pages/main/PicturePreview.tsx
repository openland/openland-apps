import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { XPImage } from 'openland-xp/XPImage';

class PicturePreviewComponent extends React.PureComponent<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Photo',
        headerAppearance: 'small'
    };
    render() {
        return (
            <View width="100%" height="100%" backgroundColor="#fff">
                <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={300}
                    imageHeight={300}
                >
                    <XPImage source={{ uuid: this.props.navigation.getParam('uuid') }} width={300} height={300} />
                </ImageZoom>
            </View>
        );
    }
}

export const PicturePreview = withApp(PicturePreviewComponent, { navigationStyle: 'small' });