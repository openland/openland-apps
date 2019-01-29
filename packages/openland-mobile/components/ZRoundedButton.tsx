import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import { Alert } from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';

type ZRoundedButtonStyle = 'default' | 'flat' | 'danger' | 'flat-danger';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        height: 26,
        paddingHorizontal: 12,
    } as ViewStyle,
    containerBig: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        height: 35,
        paddingHorizontal: 19,
    } as ViewStyle,
    title: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: Platform.OS === 'android' ? '500' : '600',
        fontSize: 14,
    } as TextStyle,
    titleBig: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: Platform.OS === 'android' ? '500' : '600',
        fontSize: 16,
        height: 56,
        lineHeight: 56,
        letterSpacing: 0.2
    } as TextStyle
});

export interface ZRoundedButtonProps {
    title: string;
    onPress?: () => void;
    action?: () => void;
    actionFinally?: () => void;
    onActionSuccess?: () => void;
    onActionError?: (e: Error) => void;
    path?: string;
    size?: 'big';
    style?: ZRoundedButtonStyle
    uppercase?: boolean;
}

class ZRoundedButtonComponent extends React.PureComponent<ZRoundedButtonProps & { router: SRouter }, { actionInProgress?: boolean }> {
    state = { actionInProgress: false };
    handlePress = async () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.path) {
            this.props.router.push(this.props.path);
        }

        if (this.props.action) {
            this.setState({ actionInProgress: true });

            try {
                await this.props.action();
                if (this.props.onActionSuccess) {
                    await this.props.onActionSuccess();
                }
            } catch (e) {
                if (this.props.onActionError) {
                    await this.props.onActionError(e);
                } else {
                    Alert.alert(formatError(e));
                }
                this.setState({ actionInProgress: false });
            }
            if (this.props.actionFinally) {
                this.props.actionFinally();
            }
        }
    }
    render() {
        return (
            <View borderRadius={this.props.size === 'big' ? 18 : 13}>
                <TouchableOpacity onPress={!this.state.actionInProgress ? this.handlePress : undefined} activeOpacity={0.6}>
                    <View
                        style={[
                            this.props.size === 'big' ? styles.containerBig : styles.container,
                            {
                                ...this.props.style === 'flat' ? { backgroundColor: 'transparent' } :
                                    this.props.style === 'danger' ? { backgroundColor: '#ff3b30' } :
                                        this.props.style === 'flat-danger' ? { backgroundColor: 'transparent' } : {}
                            }
                        ]}

                    >
                        <View >
                            <Text
                                style={[
                                    this.props.size === 'big' ? styles.titleBig : styles.title,
                                    {
                                        ...this.props.style === 'flat' ? { color: '#0084fe' } :
                                            this.props.style === 'danger' ? { color: '#fff' } :
                                                this.props.style === 'flat-danger' ? { color: '#ff3b30' } : {}
                                    },
                                    {
                                        ...this.state.actionInProgress ? { color: 'transparent' } : {}
                                    }
                                ]}
                            >
                                {this.props.uppercase !== false ? this.props.title.toUpperCase() : this.props.title}
                            </Text>
                            {this.state.actionInProgress && <View width={"100%"} height={"100%"} justifyContent="center" position="absolute" >
                                < ActivityIndicator height={"100%"} color={this.props.style === 'flat' ? '#0084fe' : 'white'} />
                            </View>}

                        </View>

                    </View>
                </TouchableOpacity>
            </View >
        );
    }
}

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);