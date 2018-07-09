import * as React from 'react';
import Glamorous from 'glamorous';

const ImageWrapper = Glamorous.div({
    // display: 'flex',
    // justifyContent: 'flex-start'
});

const Image = Glamorous.img({
    display: 'block',
    maxWidth: 400,
    maxHeight: 400,
    objectFit: 'contain'
});

export class MessageImageComponent extends React.PureComponent<{ file: string, fileName?: string, width?: number, height?: number }> {
    render() {
        return (
            <ImageWrapper>
                <Image src={'https://ucarecdn.com/' + this.props.file + '/' + (this.props.fileName ? this.props.fileName!! : '')} />
            </ImageWrapper>
        );
    }
}