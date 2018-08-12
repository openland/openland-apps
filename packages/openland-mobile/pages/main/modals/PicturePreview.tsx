import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { XPImage } from 'openland-xp/XPImage';
import { ZHeader } from '../../../components/ZHeader';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';

class PicturePreviewComponent extends React.PureComponent<NavigationInjectedProps> {
    render() {
        const uuid = this.props.navigation.getParam('uuid') as string;
        const w = this.props.navigation.getParam('width') as number;
        const h = this.props.navigation.getParam('height') as number;
        const size = layoutMedia(w, h, 1024, 1024);
        const l = layoutMedia(w, h, Dimensions.get('window').width, Dimensions.get('window').height);
        return (
            <>
                <ZHeader title="Photo" />
                <View width="100%" height="100%" backgroundColor="#fff">
                    <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={l.width}
                        imageHeight={l.height}
                    >
                        <XPImage source={{ uuid: uuid }} width={l.width} height={l.height} imageSize={size} />
                    </ImageZoom>
                </View>
            </>
        );
    }
}

export const PicturePreview = withApp(PicturePreviewComponent, { navigationAppearance: 'small' });