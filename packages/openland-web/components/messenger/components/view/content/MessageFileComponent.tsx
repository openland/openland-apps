import * as React from 'react';
import { XButton } from 'openland-x/XButton';

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function niceBytes(x: number | undefined) {

    if (x === undefined) {
        return;
    }

    let l = 0;

    while (x >= 1024 && ++l) {
        x = x / 1024;
    }

    return (x.toFixed(x >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

export class MessageFileComponent extends React.PureComponent<{ file?: string, fileName?: string, fileSize?: number }> {
    render() {
        return (
            <>
                {this.props.file && <XButton
                    href={'https://ucarecdn.com/' + this.props.file + '/' + (this.props.fileName ? this.props.fileName!! : '')}
                    text={this.props.fileName ? this.props.fileName!! : 'file'}
                    alignSelf="flex-start"
                />}
                {!this.props.file && <XButton
                    enabled={false}
                    text={this.props.fileName ? this.props.fileName!! : 'file'}
                    alignSelf="flex-start"
                />}
                <span>{niceBytes(this.props.fileSize)}</span>
            </>
        );
    }
}