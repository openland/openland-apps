import * as React from 'react';
import { ZPictureModalContext, ZPictureModalProvider } from './ZPictureModalContext';
import { ZPictureOverlay } from './ZPictureOverlay';
import { View, Keyboard } from 'react-native';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';

export class ZPictureModal extends React.PureComponent<{}, { config?: ZPictureTransitionConfig }> implements ZPictureModalProvider {

    constructor(props: {}) {
        super(props);
        this.state = {

        };
    }

    showModal = (config: ZPictureTransitionConfig) => {
        Keyboard.dismiss();
        this.setState({ config });
    }

    render() {
        return (
            <View width="100%" height="100%">
                <ZPictureModalContext.Provider value={this}>
                    <View width="100%" height="100%" renderToHardwareTextureAndroid={!!this.state.config}>
                        {this.props.children}
                    </View>
                </ZPictureModalContext.Provider>
                {this.state.config &&
                    <ZPictureOverlay config={this.state.config} onClose={() => this.setState({ config: undefined })} />
                }
            </View>
        );
    }
}