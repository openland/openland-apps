import * as React from 'react';
import Glamorous from 'glamorous';

const Image = Glamorous.img({
    display: 'block',
    width: 400,
    height: 400,
    objectFit: 'scale-down'
});

export class MessageImageComponent extends React.PureComponent<{ file: string, fileName?: string, width?: number, height?: number }> {
    render() {
        return <Image src={'https://ucarecdn.com/' + this.props.file + '/' + (this.props.fileName ? this.props.fileName!! : '')} />;
    }
}