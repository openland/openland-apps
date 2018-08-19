import * as React from 'react';
import { XPAvatarProps, XPAvatar } from 'openland-xp/XPAvatar';
import { ZPictureModalContext, ZPictureModalProvider } from './modal/ZPictureModalContext';
import { View, TouchableWithoutFeedback } from 'react-native';

class XPAvatarWithPreviewComponent extends React.PureComponent<XPAvatarProps & { modal: ZPictureModalProvider }> {

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
            this.props.modal.showModal({
                url,
                width: 256,
                height: 256,
                isGif: false,
                animate: { x: pageX, y: pageY, width, height, view: view!!, borderRadius: this.props.size / 2 },
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
        let { modal, ...other } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View onLayout={this.handleLayout} ref={this.ref}>
                    <XPAvatar {...other} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export const XPAvatarWithPreview = (props: XPAvatarProps) => {
    return (
        <ZPictureModalContext.Consumer>
            {modal => <XPAvatarWithPreviewComponent {...props} modal={modal!!} />}
        </ZPictureModalContext.Consumer>
    );
};