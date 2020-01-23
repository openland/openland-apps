import * as React from 'react';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SRouter } from 'react-native-s/SRouter';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import Share from 'react-native-share';
import { Platform, View, TouchableWithoutFeedback, Text, StyleSheet, TextStyle } from 'react-native';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { ZButton } from '../ZButton';
import { PdfPreview } from 'openland-mobile/pages/main/modals/PdfPreview';
import { ZVideoComponent } from './ZVideoComponent';
import { ZDocumentExt } from './ZDocumentExt';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SDevice } from 'react-native-s/SDevice';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { SShareButton } from 'react-native-s/SShareButton';
import { SStatusBar } from 'react-native-s/SStatusBar';

export interface ZFileModalConfig {
    uuid: string;
    name: string;
    size: number;
}

const styles = StyleSheet.create({
    name: {
        ...TextStyles.Title2,
        marginTop: 24,
        marginHorizontal: 24,
        textAlign: 'center'
    } as TextStyle,
    size: {
        ...TextStyles.Body,
        marginTop: 4
    } as TextStyle,
});

interface ZFileModal {
    config: ZFileModalConfig;
    onClose: () => void;
}

interface FilePreviewInnerProps extends ZFileModal {
    config: ZFileModalConfig;
    onClose: () => void;
    style: 'default' | 'video';
    theme: ThemeGlobal;
    router?: SRouter;
}

interface FilePreviewInnerState {
    completed: boolean;
    path?: string;
    downloadState?: DownloadState;
}

const isVideo = (name: string) => name.toLowerCase().endsWith('.mp4') || (Platform.OS === 'ios' && name.toLowerCase().endsWith('.mov'));

class FilePreviewInner extends React.PureComponent<FilePreviewInnerProps, FilePreviewInnerState> {
    subscription?: WatchSubscription;
    content: 'unknown' | 'pdf' | 'video' = 'unknown';

    constructor(props: FilePreviewInnerProps) {
        super(props);
        this.state = { completed: false };

        if (props.config.name.toLowerCase().endsWith('.pdf')) {
            this.content = 'pdf';
        } else if (isVideo(props.config.name)) {
            this.content = 'video';
        }
    }

    componentDidMount() {
        if (this.content === 'video') {
            SStatusBar.setBarStyle('light-content');
        }

        const config = this.props.config;
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
        SStatusBar.setBarStyle(this.props.theme.statusBar);

        if (this.subscription) {
            this.subscription();
        }
    }

    private handleOpen = async () => {
        if (this.state.path) {
            const config = this.props.config;

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
        const config = this.props.config;
        const { theme, style } = this.props;
        const paddingTop = SDevice.navigationBarHeight + SDevice.statusBarHeight + SDevice.safeArea.top;
        const paddingBottom = Platform.OS === 'ios' ? (SDevice.safeArea.bottom || 16) : SDevice.safeArea.bottom + 16;

        const textColor = style === 'default' ? theme.foregroundPrimary : theme.foregroundContrast;
        const iconColor = style === 'default' ? theme.foregroundSecondary : theme.foregroundContrast;
        const backgroundColor = style === 'default' ? theme.backgroundPrimary : '#000000';

        let header = (
            <View
                style={{
                    height: SDevice.navigationBarHeight + SDevice.statusBarHeight + SDevice.safeArea.top,
                    paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                }}
            >
                <SCloseButton tintColor={iconColor} onPress={this.props.onClose} />
                <Text style={{ ...TextStyles.Headline, flexGrow: 1, textAlign: 'center', color: textColor }} allowFontScaling={false}>
                    {this.content === 'video' ? 'Video' : 'Document'}
                </Text>
                <SShareButton tintColor={iconColor} onPress={this.handleOpen} />
            </View>
        );

        let content = (
            <>
                <TouchableWithoutFeedback onPress={this.handleOpen}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, marginTop: 35 }}>
                        <ZDocumentExt name={config.name} size="large" />
                        <Text style={[styles.name, { color: theme.foregroundPrimary }]}>{config.name}</Text>
                        <Text style={[styles.size, { color: theme.foregroundSecondary }]}>{formatBytes(config.size)}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ paddingHorizontal: 16 }}>
                    <ZButton
                        title="Open"
                        size="large"
                        onPress={this.handleOpen}
                        loading={!this.state.path}
                    />
                </View>
            </>
        );

        if (this.state.completed && this.state.path && this.content === 'pdf') {
            content = (
                <View flexGrow={1} marginBottom={-paddingBottom}>
                    <PdfPreview path={this.state.path} />
                </View>
            );
        }

        if (this.content === 'video') {
            content = <ZVideoComponent uuid={config.uuid} name={config.name} completed={this.state.completed} />;
        }

        return (
            <View style={{ paddingTop, paddingBottom }} backgroundColor={backgroundColor} flexGrow={1}>
                {header}
                {content}
            </View>
        );
    }
}

export const ZFileModal = React.memo((props: ZFileModal) => {
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext);

    return (
        <FilePreviewInner
            {...props}
            theme={theme}
            router={router}
            style={isVideo(props.config.name) ? 'video' : 'default'}
        />
    );
});