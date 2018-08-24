import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { View, WebView, Text, WebViewUriSource } from 'react-native';
import { ZQuery } from '../../../components/ZQuery';
import { DocumentFetchPreviewLinkQuery } from 'openland-api/DocumentFetchPreviewLinkQuery';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import Share from 'react-native-share';
import { ZSafeAreaView } from '../../../components/layout/ZSafeAreaView';
import { PageProps } from '../../../components/PageProps';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';

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
                <FastHeader title="File" />
                <FastHeaderButton title="Open" onPress={this.handlePress} />
                <View backgroundColor="#fff" flexGrow={1}>
                    <ZQuery query={DocumentFetchPreviewLinkQuery} variables={{ file: config.uuid }} fetchPolicy="network-only">
                        {resp => {
                            if (!resp) {
                                return (
                                    <ZSafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>Preview is not available</Text>
                                    </ZSafeAreaView>);
                            }
                            return (
                                <ZSafeAreaContext.Consumer>
                                    {area => (
                                        <WebView
                                            contentInset={{ top: area.top }}
                                            style={{ width: '100%', height: '100%' }}
                                            source={{ uri: resp.data.previewLink } as WebViewUriSource}
                                        />
                                    )}
                                </ZSafeAreaContext.Consumer>
                            );
                        }}
                    </ZQuery>
                </View>
            </>
        );
    }
}

export const FilePreview = withApp(FilePreviewComponent, { navigationAppearance: 'small' });