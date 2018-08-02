import * as React from 'react';
import { View } from 'react-native';
import { ZRoundedMask } from '../../../../components/ZRoundedMask';
import { ZImage } from '../../../../components/ZImage';

function resolveCorners(isOut: boolean, attach?: 'bottom' | 'top' | 'both') {
    let topRightRadius = 18;
    let topLeftRadius = 18;
    let bottomRightRadius = 18;
    let bottomLeftRadius = 18;
    if (isOut) {
        if (attach === 'top' || attach === 'both') {
            topRightRadius = 4;
        }
        if (attach === 'bottom' || attach === 'both') {
            bottomRightRadius = 4;
        }
    } else {
        if (attach === 'top' || attach === 'both') {
            topLeftRadius = 4;
        }
        if (attach === 'bottom' || attach === 'both') {
            bottomLeftRadius = 4;
        }
    }
    return {
        topRight: topRightRadius,
        topLeft: topLeftRadius,
        bottomRight: bottomRightRadius,
        bottomLeft: bottomLeftRadius
    };
}

export class BubbleImage extends React.PureComponent<{ uuid: string, width: number, height: number, resize: boolean, isOut: boolean, attach?: 'bottom' | 'top' | 'both' }> {
    render() {
        let radius = resolveCorners(this.props.isOut, this.props.attach);
        return (
            <ZImage
                source={{ uuid: this.props.uuid }}
                resize={this.props.resize}
                width={this.props.width}
                height={this.props.height}
                style={{
                    borderTopLeftRadius: radius.topLeft,
                    borderTopRightRadius: radius.topRight,
                    borderBottomLeftRadius: radius.bottomLeft,
                    borderBottomRightRadius: radius.bottomRight
                }}
            />
        );
    }
}

export class BubbleView extends React.PureComponent<{ appearance?: 'text' | 'media', isOut: boolean, attach?: 'bottom' | 'top' | 'both' }> {
    render() {
        let radius = resolveCorners(this.props.isOut, this.props.attach);
        let topPadding = 8;
        let bottomPadding = 7;
        let innerPaddingHorizontal = 0;
        let innerPaddingTop = 0;
        let innerPaddingBottom = 0;
        if (this.props.appearance === 'text') {
            innerPaddingHorizontal = 13;
            innerPaddingTop = 7;
            innerPaddingBottom = 8;
        }
        if (this.props.attach === 'top' || this.props.attach === 'both') {
            topPadding = 2;
        }
        if (this.props.attach === 'bottom' || this.props.attach === 'both') {
            bottomPadding = 1;
        }
        return (
            <View paddingTop={topPadding} paddingBottom={bottomPadding}>
                <ZRoundedMask
                    radius={radius}
                    backgroundColor={this.props.isOut && (this.props.appearance !== 'media') ? '#4747ec' : '#eff2f5'}
                    borderColor={(!this.props.isOut || this.props.appearance === 'media') ? 'rgba(220, 224, 231, 0.45)' : undefined}
                >
                    <View style={{ paddingBottom: innerPaddingBottom, paddingTop: innerPaddingTop, paddingHorizontal: innerPaddingHorizontal }}>
                        {this.props.children}
                        <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, borderColor: 'rgba(220, 224, 231, 0.45)' }} />
                    </View>
                </ZRoundedMask>
            </View>
        );
    }
}