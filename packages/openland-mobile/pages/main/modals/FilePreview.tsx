import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { View, Text, Image, StyleSheet, TextStyle, TouchableHighlight, Alert, Linking, Button } from 'react-native';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import Share from 'react-native-share';
import { PageProps } from '../../../components/PageProps';
// import { FastHeader } from 'react-native-fast-navigation/FastHeader';
// import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { formatBytes } from 'openland-shared/utils/formatBytes';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { SHeader } from 'react-native-s/SHeader';
import { ZRoundedButton } from '../../../components/ZRoundedButton';
import { XPCircularLoader } from 'openland-xp/XPCircularLoader';
import { DownloadState } from 'openland-shared/DownloadManagerInterface';

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
class FilePreviewComponent extends React.PureComponent<PageProps, { completed: boolean, path?: string, downloadState?: DownloadState }> {

    subscription?: WatchSubscription;

    constructor(props: any) {
        super(props);
        this.state = { completed: false };
    }

    componentDidMount() {
        const config = this.props.router.params.config;
        this.subscription = DownloadManagerInstance.watch(config.uuid, null, (state) => {
            if (!state.path) {
                this.setState({ completed: false });
            } else {
                if (this.subscription) {
                    this.subscription!!();
                }
                this.setState({ completed: true, path: state.path, downloadState: state });
            }
        });
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription();
        }
    }

    private handlePress = () => {
        if (this.state.path) {
            Share.open({
                // type: 'application/pdf',
                url: this.state.path
            } as any);
        }
    }

    render() {
        const config = this.props.router.params.config;
        return (
            <>
                <SHeader title="Document" />
                <View backgroundColor="#fff" flexGrow={1}>
                    <TouchableHighlight underlayColor="#fff" onPress={this.handlePress}>
                        <ASSafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('assets/img-file.png')} style={{ width: 50, height: 60 }} />
                            <Text style={styles.name}>{config.name}</Text>
                            <Text style={styles.size}>{formatBytes(config.size)}</Text>
                            < View height={46} justifyContent="center" marginTop={5}>
                                {this.state.path && <ZRoundedButton title="Open" onPress={this.handlePress} />}
                                {!this.state.path && <XPCircularLoader visible={!this.state.path} progress={(this.state.completed ? 1 : this.state.downloadState ? this.state.downloadState.progress || 0 : 0)} />}
                            </View>

                        </ASSafeAreaView>
                    </TouchableHighlight>
                </View>
            </>
        );
    }
}

export const FilePreview = withApp(FilePreviewComponent, { navigationAppearance: 'small' });