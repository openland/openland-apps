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
        if (!this.props.src || this.props.src.startsWith('ph://')) {
            return;
        }
        if (!this.ref.current) {
            return;
        }
        let view = this.ref.current!!;
        let url = this.props.src;

        view.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            showPictureModal({
                title: this.props.placeholderTitle || undefined,
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
        });
    }

    render() {
        let { ...other } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View onLayout={this.handleLayout} ref={this.ref} width={this.props.size} height={this.props.size}>
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