import * as React from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Dimensions,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';

export interface ZTagViewProps {
    title?: string;
    items: { id: string; text: string }[];
    onChange: (query: string) => void;
    onRemoved: (id: string) => void;
    autoFocus?: boolean;
    theme: ThemeGlobal;
}

export class ZTagView extends React.PureComponent<
    ZTagViewProps,
    { focused?: string; query: string }
> {
    ref = React.createRef<TextInput>();
    constructor(props: ZTagViewProps) {
        super(props);

        this.state = {
            focused: undefined,
            query: '',
        };
    }

    componentWillReceiveProps(nextProps: ZTagViewProps) {
        if (this.state.focused) {
            if (!nextProps.items.find((v) => v.id === this.state.focused)) {
                this.setState({ focused: undefined });
            }
        }
        if (nextProps.items.length !== this.props.items.length) {
            this.setState({ focused: undefined, query: '' });
            if (this.ref.current) {
                if (Platform.OS === 'ios') {
                    this.ref.current.setNativeProps({ text: ' ' });
                    setTimeout(() => {
                        this.ref.current!!.setNativeProps({ text: '' });
                    }, 0);
                } else {
                    this.ref.current.setNativeProps({ text: '' });
                }
            }
            this.props.onChange('');
        }
    }

    handleChange = (text: string) => {
        this.setState({ focused: undefined, query: text });
        this.props.onChange(text);
    }

    handleFocus = (id: string) => {
        this.setState({ focused: id, query: '' });

        if (this.ref.current) {
            if (Platform.OS === 'ios') {
                this.ref.current.setNativeProps({ text: ' ' });
                setTimeout(() => {
                    this.ref.current!!.setNativeProps({ text: '' });
                }, 0);
            } else {
                this.ref.current.setNativeProps({ text: '' });
            }
            this.ref.current.focus();
        }

        this.props.onChange('');
    }

    handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === 'Backspace') {
            if (this.state.focused) {
                this.props.onRemoved(this.state.focused);
            } else {
                if (this.state.query === '' && this.props.items.length > 0) {
                    let id = this.props.items[this.props.items.length - 1].id;
                    this.handleFocus(id);
                }
            }
        }
    }

    handleTouchOutside = () => {
        if (this.state.focused) {
            this.setState({ focused: undefined });
        } else {
            if (this.ref.current) {
                this.ref.current.focus();
            }
        }
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <TouchableWithoutFeedback onPress={() => this.handleTouchOutside()}>
                        <View flexWrap="wrap" flexDirection="row" marginLeft={-15} paddingLeft={8}>
                            {this.props.title && (
                                <View
                                    height={28}
                                    paddingLeft={8}
                                    paddingRight={8}
                                    alignItems="center"
                                    flexDirection="row"
                                >
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: this.props.theme.foregroundPrimary,
                                            opacity: 0.6,
                                            textAlignVertical: 'center',
                                        }}
                                    >
                                        {this.props.title}
                                    </Text>
                                </View>
                            )}

                            {this.props.items.map((v) => (
                                <TouchableWithoutFeedback onPress={() => this.handleFocus(v.id)}>
                                    <View
                                        height={28}
                                        paddingLeft={8}
                                        paddingRight={5}
                                        borderRadius={RadiusStyles.Large}
                                        backgroundColor={
                                            this.state.focused === v.id
                                                ? this.props.theme.accentPrimary
                                                : undefined
                                        }
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text
                                            style={{
                                                color:
                                                    this.state.focused === v.id
                                                        ? this.props.theme.foregroundInverted
                                                        : this.props.theme.accentPrimary,
                                                textAlignVertical: 'center',
                                                fontSize: 15,
                                            }}
                                            numberOfLines={1}
                                            ellipsizeMode="middle"
                                        >
                                            {v.text}
                                            <Text style={{ color: this.props.theme.accentPrimary }}>
                                                ,
                                            </Text>
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                            <TextInput
                                padding={Platform.OS === 'android' ? 0 : undefined}
                                ref={this.ref}
                                minHeight={28}
                                onChangeText={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                selectionColor={this.props.theme.accentPrimary}
                                style={{
                                    minWidth: Math.min(
                                        Dimensions.get('window').width * 0.3,
                                        this.state.focused ? 5 : 250,
                                    ),
                                    marginLeft: 8,
                                    fontSize: 15,
                                    height: 28,
                                    color: this.props.theme.foregroundPrimary,
                                }}
                                value={this.state.query}
                                opacity={this.state.focused ? 0 : 1}
                                spellCheck={false}
                                autoFocus={this.props.autoFocus}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        );
    }
}
