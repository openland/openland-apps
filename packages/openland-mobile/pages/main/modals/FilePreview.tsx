import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { View, Text, Image, StyleSheet, TextStyle } from 'react-native';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import Share from 'react-native-share';
import { PageProps } from '../../../components/PageProps';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { formatBytes } from 'openland-shared/utils/formatBytes';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
        marginTop: 20,
        marginHorizontal: 64,
        textAlign: 'center'
    } as TextStyle,
    size: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        opacity: 0.8,
        marginTop: 2
    } as TextStyle
});
class FilePreviewComponent extends React.PureComponent<PageProps> {

    private handlePress = () => {
        const config = this.props.router.params.config;
        var watcher: WatchSubscription | null = null;
        var completed = false;
        watcher = DownloadManagerInstance.watch(config.uuid, null, (state) => {
            if (!state.path) {
                startLoader();
            } else {
                stopLoader();
                if (watcher) {
                    watcher!!();
                }
                completed = true;
                (async () => {
                    await Share.open({
                        type: 'application/pdf',
                        url: state.path
                    } as any);
                })();
            }
        });
        if (completed) {
            watcher();
        }
    }

    render() {
        const config = this.props.router.params.config;
        return (
            <>
                <FastHeader title="Document" />
                <FastHeaderButton title="Share" icon={require('assets/ic-export.png')} onPress={this.handlePress} />
                <View backgroundColor="#fff" flexGrow={1}>
                    <ASSafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('assets/img-file.png')} style={{ width: 50, height: 60 }} />
                        <Text style={styles.name}>{config.name}</Text>
                        <Text style={styles.size}>{formatBytes(config.size)}</Text>
                    </ASSafeAreaView>
                </View>
            </>
        );
    }
}

export const FilePreview = withApp(FilePreviewComponent, { navigationAppearance: 'small' });