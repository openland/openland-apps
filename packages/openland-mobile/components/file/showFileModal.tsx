import * as React from 'react';
import { showModal, ZModalController } from '../ZModal';
import { ZFileModalConfig, ZFileModal } from './ZFileModal';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { View, BackHandler, Platform, Dimensions } from 'react-native';
import { SAnimated } from 'react-native-s/SAnimated';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';

class FileModalWithTransition extends React.PureComponent<{ config: ZFileModalConfig, ctx: ZModalController }> implements ZModalController {
    key = randomKey();
    contents: any;

    started = false;
    ended = false;
    contentView = new SAnimatedShadowView(this.key + '--ctns', { translateY: Dimensions.get('screen').height });
    contentHeight = Dimensions.get('screen').height;

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        if (this.started) {
            return;
        }
        this.started = true;

        // Srtart
        SAnimated.beginTransaction();
        SAnimated.setPropertyAnimator((name, prop, from, to) => {
            if (Platform.OS === 'ios') {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            } else {
                SAnimated.timing(name, {
                    property: prop,
                    from: from,
                    to: to,
                    easing: 'material'
                });
            }
        });

        this.contentView.translateY = 0;

        SAnimated.commitTransaction();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.ended) {
            return false;
        }
        this.hide();
        return true;
    }

    hide = () => {
        if (this.ended) {
            return;
        }
        this.ended = true;

        SAnimated.beginTransaction();
        SAnimated.setPropertyAnimator((name, prop, from, to) => {
            if (Platform.OS === 'ios') {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            } else {
                SAnimated.timing(name, {
                    property: prop,
                    from: from,
                    to: to,
                    easing: 'material'
                });
            }
        });

        this.contentView.translateY = this.contentHeight;
        SAnimated.commitTransaction(() => { this.props.ctx.hide(); });
    }

    render() {
        return (
            <SAnimated.View
                name={this.key + '--ctns'}
                style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                }}
            >
                <View flexGrow={1} alignSelf="stretch">
                    <ZFileModal
                        config={this.props.config}
                        onClose={this.hide}
                    />
                </View>
            </SAnimated.View>
        );
    }
}

export function showFileModal(config: ZFileModalConfig) {
    showModal((ctx) => {
        return (
            <FileModalWithTransition config={config} ctx={ctx} />
        );
    });
}