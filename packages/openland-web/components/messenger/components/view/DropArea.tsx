import * as React from 'react';
import Glamorous from 'glamorous';
import UloadIc from '../icons/file-upload.svg';

const DropAreaWrapper = Glamorous.div<{ dragOn: boolean }>(props => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% - 115px)',
    zIndex: 2,
    padding: 24,
    visibility: props.dragOn ? 'visible' : 'hidden',
    backgroundColor: props.dragOn ? '#fff' : 'transparent'
}));

const DropAreaContent = Glamorous.div<{ dragUnder: boolean }>(props => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: props.dragUnder
        ? 'rgba(23, 144, 255, 0.2)'
        : 'rgba(51, 69, 98, 0.1)',
    borderRadius: 8,
    backgroundColor: props.dragUnder ? 'rgba(23, 144, 255, 0.02)' : '#fff',
    '& > svg': {
        pointerEvents: 'none',
        '& > g': {
            stroke: props.dragUnder ? '#1790FF' : '#BCC3CC'
        }
    }
}));

const DropAreaTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.3,
    textAlign: 'center',
    color: '#334562',
    marginTop: 23,
    marginBottom: 4
});

const DropAreaSubtitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#5c6a81'
});

export class DropArea extends React.PureComponent<{
    onSendFile?: Function;
    handleDrop: React.MouseEventHandler<HTMLElement>;
    handleDragOver: React.MouseEventHandler<HTMLElement>;
    handleDragLeave: React.MouseEventHandler<HTMLElement>;
    dragOn: boolean;
    dragUnder: boolean;
}> {
    render() {
        return (
            <DropAreaWrapper dragOn={this.props.dragOn}>
                <DropAreaContent
                    onDrop={this.props.handleDrop}
                    onDragOver={this.props.handleDragOver}
                    onDragLeave={this.props.handleDragLeave}
                    dragUnder={this.props.dragUnder}
                >
                    <UloadIc />
                    <DropAreaTitle>Drop files here</DropAreaTitle>
                    <DropAreaSubtitle>To send them as files</DropAreaSubtitle>
                </DropAreaContent>
            </DropAreaWrapper>
        );
    }
}
