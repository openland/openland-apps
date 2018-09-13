import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ZScrollView } from '../../components/ZScrollView';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
// import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { SAnimated } from 'react-native-s/SAnimated';

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
    child: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 50,
        left: 50,
        backgroundColor: 'green',
    },
});

export class Typography extends React.PureComponent {

    hidden = false;

    render() {
        return (
            <>
                {/* <FastHeader title="Testing" />
                <FastHeaderButton
                    title="Animate!"
                    onPress={() => {
                        if (this.hidden) {
                            SAnimated.timing('typography_container', {
                                property: 'opacity',
                                from: 0,
                                to: 1
                            });
                        } else {
                            SAnimated.timing('typography_container', {
                                property: 'opacity',
                                from: 1,
                                to: 0
                            });
                        }
                        this.hidden = !this.hidden;
                    }}
                /> */}
                <ZScrollView>
                    <SAnimated.View name="typography_container">
                        <View width="100%" height="100%" backgroundColor="#fff">
                            {/* <ScrollView width="100%" height="100%" backgroundColor="#fff"> */}
                            <View width="100%" paddingTop={8} paddingLeft={8} flexDirection="column">
                                <View flexDirection="row">
                                    <View>
                                        <Text style={[{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#fff' }]} numberOfLines={1}>Thin 15</Text>
                                        <Text style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#eee' }} numberOfLines={1}>Thin 14</Text>
                                        <Text style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#fff' }} numberOfLines={1}>Thin 13</Text>
                                        <Text style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#eee' }} numberOfLines={1}>Thin 12</Text>
                                        <Text style={{ fontWeight: '100', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#fff' }} numberOfLines={1}>Thin 11</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#eee' }} numberOfLines={1}>Light 15</Text>
                                        <Text style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#fff' }} numberOfLines={1}>Light 14</Text>
                                        <Text style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#eee' }} numberOfLines={1}>Light 13</Text>
                                        <Text style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#fff' }} numberOfLines={1}>Light 12</Text>
                                        <Text style={{ fontWeight: '300', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#eee' }} numberOfLines={1}>Light 11</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#fff' }} numberOfLines={1}>Regular 15</Text>
                                        <Text style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#eee' }} numberOfLines={1}>Regular 14</Text>
                                        <Text style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#fff' }} numberOfLines={1}>Regular 13</Text>
                                        <Text style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#eee' }} numberOfLines={1}>Regular 12</Text>
                                        <Text style={{ fontWeight: '400', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#fff' }} numberOfLines={1}>Regular 11</Text>
                                    </View>
                                </View>
                                <View flexDirection="row">
                                    <View>
                                        <Text style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#eee' }} numberOfLines={1}>Medium 15</Text>
                                        <Text style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#fff' }} numberOfLines={1}>Medium 14</Text>
                                        <Text style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#eee' }} numberOfLines={1}>Medium 13</Text>
                                        <Text style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#fff' }} numberOfLines={1}>Medium 12</Text>
                                        <Text style={{ fontWeight: '500', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#eee' }} numberOfLines={1}>Medium 11</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#fff' }} numberOfLines={1}>Bold 15</Text>
                                        <Text style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#eee' }} numberOfLines={1}>Bold 14</Text>
                                        <Text style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#fff' }} numberOfLines={1}>Bold 13</Text>
                                        <Text style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#eee' }} numberOfLines={1}>Bold 12</Text>
                                        <Text style={{ fontWeight: '700', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#fff' }} numberOfLines={1}>Bold 11</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 15, backgroundColor: '#eee' }} numberOfLines={1}>Black 15</Text>
                                        <Text style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 14, backgroundColor: '#fff' }} numberOfLines={1}>Black 14</Text>
                                        <Text style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 13, backgroundColor: '#eee' }} numberOfLines={1}>Black 13</Text>
                                        <Text style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 12, backgroundColor: '#fff' }} numberOfLines={1}>Black 12</Text>
                                        <Text style={{ fontWeight: '900', width: 90, height: 20, lineHeight: 20, fontSize: 11, backgroundColor: '#eee' }} numberOfLines={1}>Black 11</Text>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={styles.child} />
                                </View>
                            </View>
                        </View>
                    </SAnimated.View>
                </ZScrollView>
            </>
        );
    }
}