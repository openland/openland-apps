import * as React from 'react';
import { XButton } from 'openland-x/XButton';

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
                <span>{this.props.fileSize}</span>
            </>
        );
    }
}