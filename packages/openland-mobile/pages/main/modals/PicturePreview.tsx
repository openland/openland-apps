import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Dimensions, LayoutAnimation } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { XPImage } from 'openland-xp/XPImage';
import { ZHeader } from '../../../components/ZHeader';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { ZHeaderButton } from '../../../components/ZHeaderButton';
import { ZImagePreview } from '../../../components/media/ZImagePreview';

class PicturePreviewComponent extends React.PureComponent<NavigationInjectedProps, { isInited: boolean }> {
    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            isInited: false
        };
    }

    componentDidMount() {
        setTimeout(
            () => {
                LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.spring });
                this.setState({ isInited: true });
            },
            0);

    }

    render() {
        const uuid = this.props.navigation.getParam('uuid') as string;
        const w = this.props.navigation.getParam('width') as number;
        const h = this.props.navigation.getParam('height') as number;
        const animate = this.props.navigation.getParam('animate') as { x: number, y: number, width: number, height: number };
        const size = layoutMedia(w, h, 1024, 1024);
        const l = layoutMedia(w, h, Dimensions.get('window').width, Dimensions.get('window').height);
        return (
            <>
                <ZHeader title="Photo" />
                <ZHeaderButton title="Close" onPress={() => this.props.navigation.pop()} />
                {/* {!this.state.isInited && (
                    <View key="img" position="absolute" top={animate.y} left={animate.x} width={animate.width} height={animate.height} backgroundColor="#f00">
                        <ZImagePreview
                            src={uuid}
                            srcWidth={w}
                            srcHeight={h}
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').height}
                        />
                        <XPImage source={{ uuid: uuid }} width={animate.width} height={animate.height} imageSize={size} />
                    </View>
                )}
                {this.state.isInited && (
                    <View key="img" position="absolute" top={0} left={0} width={l.width} height={l.height}>
                        <ZImagePreview
                            src={uuid}
                            srcWidth={w}
                            srcHeight={h}
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').height}
                        />
                    </View>
                )} */}

                <View key="img" position="absolute">
                    <ZImagePreview
                        src={uuid}
                        srcWidth={w}
                        srcHeight={h}
                        width={Dimensions.get('window').width}
                        height={Dimensions.get('window').height}
                    />
                </View>

                <View width="100%" height="100%">
                    {/* <ImageZoom
                        cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={l.width}
                        imageHeight={l.height}
                    >
                        <XPImage source={{ uuid: uuid }} width={l.width} height={l.height} imageSize={size} />
                    </ImageZoom> */}
                </View>
                {/* <View position="absolute" top={animate.y} left={animate.x} width={animate.width} height={animate.height} backgroundColor="#f00" /> */}
            </>
        );
    }
}

export const PicturePreview = withApp(PicturePreviewComponent, { navigationAppearance: 'small' });