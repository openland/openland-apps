import * as React from 'react';
import { View } from 'react-native';

export class ZRoundedMask extends React.PureComponent<{ radius: { topLeft: number, topRight: number, bottomLeft: number, bottomRight: number }, backgroundColor?: string, borderColor?: string }> {
    render() {
        // if (Platform.OS === 'ios') {
        //     return (
        //         <Mask radius={this.props.radius}>
        //             <View backgroundColor={this.props.backgroundColor}>
        //                 {this.props.children}
        //             </View>
        //         </Mask>
        //     );
        // } else {
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
                />}
            </View>
        );
        // }
    }
}