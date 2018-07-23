import * as React from 'react';
import { Image, View } from 'react-native';

export class ZAvatar extends React.PureComponent<{ size: number, src?: string | null }> {
    render() {
        if (this.props.src) {
            let url = this.props.src;
            url += '-/scale_crop/' + this.props.size * 2 + 'x' + this.props.size * 2 + '/';
            return (
                <Image source={{ uri: url }} style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2 }} />
            );
        } else {
            return <View style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2 }} />;
        }
    }
}