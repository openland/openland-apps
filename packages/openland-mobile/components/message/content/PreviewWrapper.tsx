import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { showPictureModal } from 'openland-mobile/components/modal/ZPictureModal';
import { formatDateTime } from 'openland-y-utils/formatTime';

interface PreviewWrapperProps {
    path?: string;
    radius: number;
    children: any;
    width: number | undefined | null;
    height: number | undefined | null;
    isGif?: boolean;
    senderName?: string;
    date?: string;
    crossFade?: boolean;
}

export class PreviewWrapper extends React.PureComponent<PreviewWrapperProps> {
    ref = React.createRef<View>();

    handlePress = () => {
        if (!this.props.path) {
            return;
        }
        if (!this.ref.current) {
            return;
        }
        let view = this.ref.current!!;

        view.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            showPictureModal({
                title: this.props.senderName,
                subtitle: this.props.date ? formatDateTime(parseInt(this.props.date, 10)) : undefined,
                url: this.props.path!,
                width: this.props.width || 1024,
                height: this.props.height || 1024,
                isGif: this.props.isGif || false,
                animate: { x: pageX, y: pageY, width, height, borderRadius: this.props.radius },
                crossFade: this.props.crossFade,
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
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View ref={this.ref}>
                    {this.props.children}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}