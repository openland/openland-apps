import * as React from 'react';
import { layoutMedia } from './utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';

export class MessageImageComponent extends React.PureComponent<{ file: string, fileName?: string, width: number, height: number }> {
    render() {
        let dimensions = layoutMedia(this.props.width, this.props.height);
        return (
            <XCloudImage
                srcCloud={'https://ucarecdn.com/' + this.props.file + '/'}
                resize={'fill'}
                width={dimensions.width}
                height={dimensions.height}
            />
        );
    }
}