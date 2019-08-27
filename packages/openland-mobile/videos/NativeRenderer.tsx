import * as React from 'react';
import { VideoRendererInt } from 'openland-video/videos/components/renderers';
import { View } from 'react-native';

export const NativeRenderer: VideoRendererInt = {
    renderView: (props) => {
        return (
            <View
                style={{
                    marginTop: props.marginTop,
                    marginBottom: props.marginBottom,
                    marginLeft: props.marginLeft,
                    marginRight: props.marginRight,
                    paddingTop: props.paddingTop,
                    paddingBottom: props.paddingBottom,
                    paddingRight: props.paddingRight,
                    paddingLeft: props.paddingLeft,
                    width: props.width,
                    height: props.height,
                    backgroundColor: props.backgroundColor,
                }}
            >
                {props.children}
            </View>
        );
    }
};