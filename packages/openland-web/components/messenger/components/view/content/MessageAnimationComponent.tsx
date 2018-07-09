import * as React from 'react';

export class MessageAnimationComponent extends React.PureComponent<{ file: string, fileName?: string, width?: number, height?: number }> {
    render() {
        return (
            <video width="400" height="400" autoPlay={true} loop={true} muted={true} webkit-playsinline="true" playsInline={true}>
                <source src={'https://ucarecdn.com/' + this.props.file + '/gif2video/-/format/webm/image.gif'} type="video/webm" />
                <source src={'https://ucarecdn.com/' + this.props.file + '/gif2video/-/format/mp4/image.gif'} type="video/mp4" />
            </video>
        );
    }
}