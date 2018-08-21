import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZHeader } from '../../../components/ZHeader';
import { View, WebView, Text, WebViewUriSource } from 'react-native';
import { ZQuery } from '../../../components/ZQuery';
import { DocumentFetchPreviewLinkQuery } from 'openland-api/DocumentFetchPreviewLinkQuery';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { ZHeaderButton } from '../../../components/ZHeaderButton';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import Share from 'react-native-share';
import { ZSafeAreaView } from '../../../components/layout/ZSafeAreaView';

class FilePreviewComponent extends React.PureComponent<NavigationInjectedProps> {

    private handlePress = () => {
        const config = this.props.navigation.getParam('config');
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
        const config = this.props.navigation.getParam('config');
        return (
            <>
                <ZHeader title="File" />
                <ZHeaderButton title="Open" onPress={this.handlePress} />
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