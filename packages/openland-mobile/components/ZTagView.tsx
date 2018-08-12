import * as React from 'react';
import { ScrollView, View, Text, TextInput, Dimensions, NativeSyntheticEvent, TextInputKeyPressEventData, TouchableWithoutFeedback, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

export interface ZTagViewProps {
    items: { id: string, text: string }[];
    onChange: (query: string) => void;
    onRemoved: (id: string) => void;
}

export class ZTagView extends React.PureComponent<ZTagViewProps, { focused?: string, query: string }> {

    ref = React.createRef<TextInput>();
    constructor(props: ZTagViewProps) {
        super(props);

        this.state = {
            focused: undefined,
            query: ''
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
                    setTimeout(() => { this.ref.current!!.setNativeProps({ text: '' }); }, 0);
                } else {
                    this.ref.current.setNativeProps({ text: '' });
                }
            }
        }
    }

    handleChange = (text: string) => {
        console.log('change:' + text);
        this.setState({ focused: undefined, query: text });
        this.props.onChange(text);
    }

    handleFocus = (id: string) => {
        console.log('handle focus');
        this.setState({ focused: id, query: '' });

        if (this.ref.current) {
            if (Platform.OS === 'ios') {
                this.ref.current.setNativeProps({ text: ' ' });
                setTimeout(() => { this.ref.current!!.setNativeProps({ text: '' }); }, 0);
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
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
                    <TouchableWithoutFeedback onPress={() => this.handleTouchOutside()}>
                        <View flexWrap="wrap" flexDirection="row">
                            <View style={{ height: 28, paddingRight: 5 }}>
                                <Text style={{ lineHeight: 28, fontSize: 13, color: '#000' }}>To:</Text>
                            </View>
                            {this.props.items.map((v) => (
                                <TouchableWithoutFeedback onPress={() => this.handleFocus(v.id)}>
                                    <View paddingLeft={1} paddingRight={1} paddingTop={2} paddingBottom={2}>
                                        <View height={24} borderRadius={12} backgroundColor={this.state.focused === v.id ? AppStyles.primaryColor : undefined} paddingLeft={1} paddingRight={1}>
                                            <Text style={{ color: this.state.focused === v.id ? '#fff' : AppStyles.primaryColor, height: 24, lineHeight: 24, textAlignVertical: 'center', fontSize: 13 }}>{v.text},</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                            <TextInput
                                ref={this.ref}
                                onChangeText={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                style={{ minWidth: Math.min(Dimensions.get('window').width * 0.3, 250), fontSize: 13, height: 28 }}
                                value={this.state.query}
                                opacity={this.state.focused ? 0 : 1}
                                spellCheck={false}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        );
    }
}