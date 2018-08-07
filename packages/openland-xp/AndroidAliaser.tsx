import * as React from 'react';
import { View, ART, Platform } from 'react-native';

export class AndroidAliaser extends React.PureComponent<{ width: number, height: number, borderRadius: number }> {
    render() {
        if (Platform.OS === 'android') {
            let path = (ART as any).Path().move(this.props.width / 2, 0).arc(0, this.props.width, this.props.width / 2).arc(0, -this.props.width, this.props.width / 2);
            return (
                <View
                    style={{
                        width: this.props.width,
                        height: this.props.height
                    }}
                >
                    {this.props.children}
                    <ART.Surface
                        width={this.props.width}
                        height={this.props.height}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: this.props.width,
                            height: this.props.height,
                            zIndex: 100
                        }}
                    >
                        <ART.Group x={0} y={0}>
                            <ART.Shape d={path} stroke={'#fff'} />
                        </ART.Group>
                    </ART.Surface>
                </View>
            );
        }
        return (
            <View
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: this.props.borderRadius
                }}
            >
                {this.props.children}
            </View>
        );
    }
}