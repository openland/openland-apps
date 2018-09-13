import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { DeviceConfig } from '../../DeviceConfig';
import { FastHeaderTitleProps } from './FastHeaderTitle';
import { AnimatedViewKeys } from '../AnimatedViewKeys';
import { SAnimated } from 'react-native-s/SAnimated';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: DeviceConfig.navigationBarBackWidth
    } as ViewStyle,
    containerFirst: {
        paddingLeft: 16
    } as ViewStyle,
    titleContainer: {
        height: DeviceConfig.navigationBarHeightLarge,
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    } as ViewStyle,
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 56,
        height: 56,
        color: '#49288f'
    } as TextStyle,
    subtitle: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 20,
        color: '#49288f',
        opacity: 0.4
    } as TextStyle
});

export class FastHeaderTitleAndroid extends React.PureComponent<FastHeaderTitleProps> {
    render() {
        return (
            <SAnimated.View name={AnimatedViewKeys.headerContent(this.props.route)} style={[styles.container, this.props.index === 0 && styles.containerFirst]} pointerEvents="box-none">
                <View pointerEvents="box-none" flexDirection="row" flexGrow={1} flexBasis={0}>
                    {this.props.titleView && (
                        <View
                            style={styles.titleContainer}
                            pointerEvents="box-none"
                        >
                            {this.props.titleView}
                        </View>
                    )}
                    {!this.props.titleView && (
                        <View
                            style={styles.titleContainer}
                            pointerEvents="box-none"
                        >
                            {!this.props.titleView && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        right: 0,
                                    }}
                                    pointerEvents="none"
                                >
                                    <Text style={[styles.title]}>{this.props.titleText}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
                <View paddingRight={15} pointerEvents="box-none" renderToHardwareTextureAndroid={true}>
                    {this.props.rightView}
                </View>
            </SAnimated.View>
        );
    }
}
