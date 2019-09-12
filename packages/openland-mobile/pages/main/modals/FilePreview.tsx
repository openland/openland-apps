import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { View, Text, Image, StyleSheet, TextStyle, TouchableWithoutFeedback, Platform, ViewStyle, ImageStyle } from 'react-native';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import Share from 'react-native-share';
import { PageProps } from '../../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { ZRoundedButton } from '../../../components/ZRoundedButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { formatBytes } from '../../../utils/formatBytes';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { PdfPreview } from './PdfPreview';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { ASSafeAreaContext, ASSafeArea } from 'react-native-async-view/ASSafeAreaContext';

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

    previewContainer: {
        width: 72,
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    ext: {
        ...TextStyles.Label2,
        color: '#FFF',
        position: 'absolute', 
        bottom: 10, 
        width: 72,
        textAlign: 'center'
    } as TextStyle,
    previewCornerImages: {
        position: 'absolute', 
        right: 0, 
        top: 0, 
        flexDirection: 'column'
    } as ViewStyle,
    previewBackground: {
        position: 'absolute', 
        top: 0, 
        left: 0
    },
    arrowDownIcon: {
        tintColor: '#FFF'
    } as ImageStyle
});

const Preview = (props: { ext: string; }) => {
    const theme = React.useContext(ThemeContext);

    const fileTypesColor = {
        'xlsx': theme.tintGreen,
        'zip': theme.tintOrange,
        'pdf': theme.tintRed
    };
    
    const tintColor = fileTypesColor[props.ext] || theme.accentPrimary;
    
    return (
        <View style={styles.previewContainer}>
            <Image 
                source={require('assets/ic-document-preview-72.png')} 
                style={[styles.previewBackground, { tintColor }]} 
            />
            <View style={styles.previewCornerImages}>
                <Image source={require('assets/ic-file-preview-corner-1-18.png')} />
                <Image source={require('assets/ic-file-preview-corner-2-18.png')} />
            </View>
            {!!props.ext ? (
                <Text style={styles.ext}>{props.ext.toUpperCase()}</Text>
            ) : (
                <Image 
                    source={require('assets/ic-down-24.png')} 
                    style={styles.arrowDownIcon}
                />
            )}
        </View> 
    );
};

class FilePreviewComponent extends React.PureComponent<PageProps & { theme: ThemeGlobal, area: ASSafeArea }, { completed: boolean, path?: string, downloadState?: DownloadState }> {

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
        const { theme, area } = this.props;
        const paddingBottom = Platform.OS === 'ios' ? (area.bottom || 16) : area.bottom + 16;

        let content = (
            <View style={{ paddingTop: area.top, paddingBottom }} backgroundColor={theme.backgroundPrimary} flexGrow={1}>
                <TouchableWithoutFeedback onPress={this.handleOpen}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, marginTop: 35 }}>
                        <Preview ext={config.name.split('.')[1] || ''} />
                        <Text style={[styles.name, { color: theme.foregroundPrimary }]}>{config.name}</Text>
                        <Text style={[styles.size, { color: theme.foregroundSecondary }]}>{formatBytes(config.size)}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{ paddingHorizontal: 16 }}>
                    <ZRoundedButton 
                        title="Open" 
                        size="large"
                        onPress={this.handleOpen} 
                        loading={!this.state.path}
                    />
                </View>
            </View>
        );

        if (this.state.completed && this.state.path && this.isPdf) {
            content = <PdfPreview path={this.state.path} />;
        }
        return (
            <>
                <SHeader title="Document" />
                <SHeaderButton title="Share" icon={require('assets/ic-share-24.png')} onPress={this.handleOpen} />

                {content}
            </>
        );
    }
}

const ThemedFilePreview = XMemo<PageProps>(props => {
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);

    return <FilePreviewComponent {...props} theme={theme} area={area} />;
});

export const FilePreview = withApp(ThemedFilePreview, { navigationAppearance: 'small' });