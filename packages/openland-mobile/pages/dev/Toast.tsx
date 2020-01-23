import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZButton } from 'openland-mobile/components/ZButton';
import Toast from 'openland-mobile/components/Toast';
import { delay } from 'openland-y-utils/timer';

export const LoadersComponent = (props: PageProps) => (
    <SScrollView>
        <SHeader title="Toast" />
        <View alignItems={'center'}>
            <View marginVertical={20}>
                <ZButton
                    title={'Show success'}
                    onPress={() => {
                        Toast.success({ duration: 1000 }).show();
                    }}
                />
            </View>
            <View marginVertical={20}>
                <ZButton
                    title={'Show failure with custom text'}
                    onPress={() => {
                        Toast.failure({ text: 'Unknown error', duration: 1000 }).show();
                    }}
                />
            </View>
            <View marginVertical={20}>
                <ZButton
                    title={'Show custom toast'}
                    onPress={() => {
                        Toast.build({
                            iconSource: require('assets/ic-comments-24.png'),
                            text: 'Custom icon',
                            duration: 1000,
                        }).show();
                    }}
                />
            </View>
            <View marginVertical={20}>
                <ZButton
                    title={'Handle error'}
                    onPress={() => {
                        Toast.handle(
                            async () => {
                                await delay(1000);
                                throw new Error();
                            },
                            {
                                failure: { text: 'Error load data' },
                                success: { text: 'success load data' },
                            },
                        );
                    }}
                />
            </View>
            <View marginVertical={20}>
                <ZButton
                    title={'Handle success'}
                    onPress={() => {
                        Toast.handle(
                            async () => {
                                await delay(1000);
                            },
                            {
                                failure: { text: 'Error load data' },
                                success: { text: 'success load' },
                            },
                        );
                    }}
                />
            </View>
        </View>
    </SScrollView>
);

export const ToastPage = withApp(LoadersComponent, { navigationAppearance: 'small' });
