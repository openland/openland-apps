import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { View, Dimensions, LayoutAnimation } from 'react-native';
import { ZHeader } from '../../../components/ZHeader';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { ZHeaderButton } from '../../../components/ZHeaderButton';
import { ZImagePreview } from '../../../components/media/ZImagePreview';

class PicturePreviewComponent extends React.PureComponent<NavigationInjectedProps, { isInited: boolean }> {
    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            isInited: false
        };
    }

    componentDidMount() {
        setTimeout(
            () => {
                LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.spring });
                this.setState({ isInited: true });
            },
            0);

    }

    render() {
        const uuid = this.props.navigation.getParam('uuid') as string;
        const w = this.props.navigation.getParam('width') as number;
        const h = this.props.navigation.getParam('height') as number;
        const animate = this.props.navigation.getParam('animate') as { x: number, y: number, width: number, height: number };
        const size = layoutMedia(w, h, 1024, 1024);
        const l = layoutMedia(w, h, Dimensions.get('window').width, Dimensions.get('window').height);
        return (
            <>
                <ZHeader title="Photo" />
                <ZHeaderButton title="Close" onPress={() => this.props.navigation.pop()} />
                <View key="img" position="absolute">
                    <ZImagePreview
                        src={uuid}
                        srcWidth={w}
                        srcHeight={h}
                        width={Dimensions.get('window').width}
                        height={Dimensions.get('window').height}
                    />
                </View>
            </>
        );
    }
}

export const PicturePreview = withApp(PicturePreviewComponent, { navigationAppearance: 'small' });