import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { View, Text, Image, StyleSheet, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import Share from 'react-native-share';
import { PageProps } from '../../../components/PageProps';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { SHeader } from 'react-native-s/SHeader';
import { ZRoundedButton } from '../../../components/ZRoundedButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { formatBytes } from '../../../utils/formatBytes';
import { DownloadState } from '../../../files/DownloadManagerInterface';
// import { ZCircularLoader } from 'openland-mobile/components/ZCircularLoader';
import { PdfPreview } from './PdfPreview';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

const styles = StyleSheet.create({
    name: {
        ...TextStyles.Label1,
        marginTop: 20,
        marginHorizontal: 64,
        textAlign: 'center'
    } as TextStyle,
    size: {
        ...TextStyles.Subhead,
        marginTop: 2
    } as TextStyle
});
class FilePreviewComponent extends React.PureComponent<PageProps & { theme: ThemeGlobal }, { completed: boolean, path?: string, downloadState?: DownloadState }> {

    subscription?: WatchSubscription;
    isPdf = false;

    constructor(props: any) {
        super(props);
        this.state = { completed: false };
        this.isPdf = props.router.params.config.name.toLowerCase().endsWith('.pdf');
    }

    componentDidMount() {
        const config = this.props.router.params.config;
        this.subscription = DownloadManagerInstance.watch(config.uuid, null, (state) => {
            if (!state.path) {
                this.setState({ completed: false, downloadState: state });
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

    private handleOpen = async () => {
        if (this.state.path) {
            const config = this.props.router.params.config;

            let realFilePath = await DownloadManagerInstance.getFilePathWithRealName(config.uuid, null, config.name);

            if (realFilePath) {
                Share.open({
                    // type: 'application/pdf',
                    url: 'file://' + realFilePath
                });
            }
        }
    }

    render() {
        const config = this.props.router.params.config;
        const { theme } = this.props;

        let content = (
            <View backgroundColor={theme.backgroundPrimary} flexGrow={1}>
                <TouchableWithoutFeedback onPress={this.handleOpen}>
                    <ASSafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('assets/img-file.png')} style={{ width: 50, height: 60, tintColor: theme.foregroundQuaternary }} />
                        <Text style={[styles.name, { color: theme.foregroundPrimary }]}>{config.name}</Text>
                        <Text style={[styles.size, { color: theme.foregroundSecondary }]}>{formatBytes(config.size)}</Text>
                        <View height={46} justifyContent="center" marginTop={5}>
                            {this.state.path && <ZRoundedButton title="Open" onPress={this.handleOpen} />}
                            {/* {!this.state.path && <ZCircularLoader visible={!this.state.path} progress={(this.state.completed ? 1 : (this.state.downloadState ? this.state.downloadState.progress || 0 : 0))} />} */}
                            {!this.state.path && <LoaderSpinner />}
                        </View>
                    </ASSafeAreaView>
                </TouchableWithoutFeedback>
            </View>
        );

        if (this.state.completed && this.state.path && this.isPdf) {
            content = <PdfPreview path={this.state.path} />;
        }
        return (
            <>
                <SHeader title="Document" />
                <SHeaderButton title="Share" icon={require('assets/ic-header-share-24.png')} onPress={this.handleOpen} />

                {content}
            </>
        );
    }
}

const ThemedFilePreview = XMemo<PageProps>(props => {
    const theme = React.useContext(ThemeContext);

    return <FilePreviewComponent {...props} theme={theme} />;
});

export const FilePreview = withApp(ThemedFilePreview, { navigationAppearance: 'small' });