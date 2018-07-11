import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';

const FileButton = Glamorous(XLink)((props) => ({
    display: 'flex',
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    cursor: props.enabled === false ? 'default !important' : 'pointer',
    borderRadius: 5,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    color: '#334562',
    backgroundColor: '#ffffff',
    width: 250,
    '&:hover': {
        '& .title': {
            color: props.enabled === false ? '#334562' : undefined
        },
        '& .size': {
            color: '#334562'
        }
    }
}));

const FileImage = Glamorous.div({
    width: 40,
    height: 40,
    flexShrink: 0,
    backgroundColor: '#f3f3f5',
    borderRadius: 50,
    backgroundImage: 'url(\'/static/X/file.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginRight: 12
});

const FileText = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: 'calc(100% - 52px)'
});

const Title = Glamorous.div({
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.1
});

const Size = Glamorous.div({
    fontSize: 14,
    opacity: 0.5,
    letterSpacing: -0.1
});

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
                {this.props.file && (
                    <FileButton
                        href={'https://ucarecdn.com/' + this.props.file + '/' + (this.props.fileName ? this.props.fileName!! : '')}
                    >
                        <FileImage />
                        <FileText>
                            <Title className="title">{this.props.fileName ? this.props.fileName!! : 'file'}</Title>
                            <Size className="size">{niceBytes(this.props.fileSize)}</Size>
                        </FileText>
                    </FileButton>
                )}
                {!this.props.file && (
                    <FileButton
                        enabled={false}
                    >
                        <FileImage />
                        <FileText>
                            <Title className="title">{this.props.fileName ? this.props.fileName!! : 'file'}</Title>
                            <Size className="size">{niceBytes(this.props.fileSize)}</Size>
                        </FileText>
                    </FileButton>
                )}
            </>
        );
    }
}