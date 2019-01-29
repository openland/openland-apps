import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { showPictureModal } from './modal/ZPictureModal';
import { ZAvatarProps, ZAvatar } from './ZAvatar';

class XPAvatarWithPreviewComponent extends React.PureComponent<ZAvatarProps> {

    ref = React.createRef<View>();
    handleLayout = () => {
        // Do nothing
    }
    handlePress = () => {
        if (!this.props.src) {
            return;
        }
        if (!this.ref.current) {
            return;
        }
        let view = this.ref.current!!;
        let url = this.props.src;
        // url += '-/scale_crop/' + 256 + 'x' + 256 + '/';
        // console.log(url);
        view.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            showPictureModal({
                url,
                width: 256,
                height: 256,
                isGif: false,
                animate: { x: pageX, y: pageY, width, height, borderRadius: this.props.size / 2 },
                onBegin: () => {
                    view!!.setNativeProps({ 'opacity': 0 });
                },
                onEnd: () => {
                    view!!.setNativeProps({ 'opacity': 1 });
                },
            });
            // console.log({ x, y, width, height, pageX, pageY });
            // Modals.showPicturePreview(
            //     this.props.navigator,
            //     message.file!!,
            //     message.fileMetadata!!.imageWidth!!,
            //     message.fileMetadata!!.imageHeight!!,
            //     { x: pageX, y: pageY, width, height }
            // );
        });
        //
    }
    render() {
        let { ...other } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View onLayout={this.handleLayout} ref={this.ref}>
                    <ZAvatar {...other} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export const XPAvatarWithPreview = (props: ZAvatarProps) => {
    return (
        <XPAvatarWithPreviewComponent {...props} />
    );
};