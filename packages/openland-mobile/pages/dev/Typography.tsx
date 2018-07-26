import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { ZText } from '../../components/ZText';

export class Typography extends React.PureComponent {
    static navigationOptions = (args: any) => {
        return {
            title: 'Typography'
        };
    }

    render() {
        return (
            <View backgroundColor="#fff" width="100%" height="100%">
                <ScrollView width="100%" height="100%">
                    <View width="100%" paddingTop={8} paddingLeft={8} flexDirection="column">
                        <View flexDirection="row">
                            <View>
                                <ZText style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#fff' }} numberOfLines={1}>Thin 15</ZText>
                                <ZText style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#eee' }} numberOfLines={1}>Thin 14</ZText>
                                <ZText style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#fff' }} numberOfLines={1}>Thin 13</ZText>
                                <ZText style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#eee' }} numberOfLines={1}>Thin 12</ZText>
                                <ZText style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#fff' }} numberOfLines={1}>Thin 11</ZText>
                            </View>
                            <View>
                                <ZText style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#eee' }} numberOfLines={1}>Light 15</ZText>
                                <ZText style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#fff' }} numberOfLines={1}>Light 14</ZText>
                                <ZText style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#eee' }} numberOfLines={1}>Light 13</ZText>
                                <ZText style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#fff' }} numberOfLines={1}>Light 12</ZText>
                                <ZText style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#eee' }} numberOfLines={1}>Light 11</ZText>
                            </View>
                            <View>
                                <ZText style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#fff' }} numberOfLines={1}>Regular 15</ZText>
                                <ZText style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#eee' }} numberOfLines={1}>Regular 14</ZText>
                                <ZText style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#fff' }} numberOfLines={1}>Regular 13</ZText>
                                <ZText style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#eee' }} numberOfLines={1}>Regular 12</ZText>
                                <ZText style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#fff' }} numberOfLines={1}>Regular 11</ZText>
                            </View>
                        </View>
                        <View flexDirection="row">
                            <View>
                                <ZText style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#eee' }} numberOfLines={1}>Medium 15</ZText>
                                <ZText style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#fff' }} numberOfLines={1}>Medium 14</ZText>
                                <ZText style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#eee' }} numberOfLines={1}>Medium 13</ZText>
                                <ZText style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#fff' }} numberOfLines={1}>Medium 12</ZText>
                                <ZText style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#eee' }} numberOfLines={1}>Medium 11</ZText>
                            </View>
                            <View>
                                <ZText style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#fff' }} numberOfLines={1}>Bold 15</ZText>
                                <ZText style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#eee' }} numberOfLines={1}>Bold 14</ZText>
                                <ZText style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#fff' }} numberOfLines={1}>Bold 13</ZText>
                                <ZText style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#eee' }} numberOfLines={1}>Bold 12</ZText>
                                <ZText style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#fff' }} numberOfLines={1}>Bold 11</ZText>
                            </View>
                            <View>
                                <ZText style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#eee' }} numberOfLines={1}>Black 15</ZText>
                                <ZText style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#fff' }} numberOfLines={1}>Black 14</ZText>
                                <ZText style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#eee' }} numberOfLines={1}>Black 13</ZText>
                                <ZText style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#fff' }} numberOfLines={1}>Black 12</ZText>
                                <ZText style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#eee' }} numberOfLines={1}>Black 11</ZText>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}