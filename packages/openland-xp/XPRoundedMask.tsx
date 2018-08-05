import * as React from 'react';
import { View, Platform } from 'react-native';

export class XPRoundedMask extends React.PureComponent<{ radius: { topLeft: number, topRight: number, bottomLeft: number, bottomRight: number }, backgroundColor?: string, borderColor?: string }> {
    render() {
        if (Platform.OS === 'macos') {
            // WARNING
            // On MacOS there are some creepy logic in background color and masking
            return (
                <View>
                    <View
                        style={{
                            borderTopLeftRadius: this.props.radius.topLeft,
                            borderTopRightRadius: this.props.radius.topRight,
                            borderBottomRightRadius: this.props.radius.bottomRight,
                            borderBottomLeftRadius: this.props.radius.bottomLeft,
                            overflow: 'hidden',
                        }}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                borderTopLeftRadius: this.props.radius.topLeft,
                                borderTopRightRadius: this.props.radius.topRight,
                                borderBottomRightRadius: this.props.radius.bottomRight,
                                borderBottomLeftRadius: this.props.radius.bottomLeft,
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderColor: this.props.backgroundColor,
                                borderWidth: 1,
                                backgroundColor: this.props.backgroundColor,
                            }}
                        />
                        {this.props.children}
                    </View>
                    {this.props.borderColor && <View
                        style={{
                            position: 'absolute',
                            borderTopLeftRadius: this.props.radius.topLeft,
                            borderTopRightRadius: this.props.radius.topRight,
                            borderBottomRightRadius: this.props.radius.bottomRight,
                            borderBottomLeftRadius: this.props.radius.bottomLeft,
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderColor: this.props.borderColor,
                            borderWidth: 1
                        }}
                    />}
                </View>
            );
        }
        return (
            <View>
                <View
                    style={{
                        borderTopLeftRadius: this.props.radius.topLeft,
                        borderTopRightRadius: this.props.radius.topRight,
                        borderBottomRightRadius: this.props.radius.bottomRight,
                        borderBottomLeftRadius: this.props.radius.bottomLeft,
                        backgroundColor: this.props.backgroundColor,
                    }}
                >
                    {this.props.children}
                </View>
                {this.props.borderColor && <View
                    style={{
                        position: 'absolute',
                        borderTopLeftRadius: this.props.radius.topLeft,
                        borderTopRightRadius: this.props.radius.topRight,
                        borderBottomRightRadius: this.props.radius.bottomRight,
                        borderBottomLeftRadius: this.props.radius.bottomLeft,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderColor: this.props.borderColor,
                        borderWidth: 1
                    }}
                    pointerEvents="none"
                />}
            </View>
        );
    }
}