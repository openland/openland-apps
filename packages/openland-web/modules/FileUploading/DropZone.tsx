import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import UloadIc from 'openland-icons/file-upload.svg';

const DropArea = Glamorous.div<{ dragOn: boolean; height: string | number }>(props => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: props.height,
    zIndex: 2,
    padding: 24,
    visibility: props.dragOn ? 'visible' : 'hidden',
    backgroundColor: props.dragOn ? '#fff' : 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
}));

const DropAreaContent = Glamorous.div<{ dragUnder: boolean }>(props => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: props.dragUnder ? 'rgba(23, 144, 255, 0.2)' : 'rgba(51, 69, 98, 0.1)',
    borderRadius: 8,
    backgroundColor: props.dragUnder ? 'rgba(23, 144, 255, 0.02)' : '#fff',
    '& > svg': {
        pointerEvents: 'none',
        '& > g': {
            stroke: props.dragUnder ? '#1790FF' : '#BCC3CC',
        },
    },
}));

interface DropZoneProps {
    height: string | number;
    onFileDrop?: (file: any) => void;
}

interface DropZoneState {
    dragOn: boolean;
    dragUnder: boolean;
}

export class DropZone extends React.PureComponent<DropZoneProps, DropZoneState> {
    constructor(props: DropZoneProps) {
        super(props);

        this.state = {
            dragOn: false,
            dragUnder: false,
        };
    }

    private handleDrop = (e: any) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        this.setState({
            dragOn: false,
            dragUnder: false,
        });

        if (!file) {
            return;
        }

        if (this.props.onFileDrop) {
            this.props.onFileDrop(file);
        }
    }

    private handleWindowDragover = (e: any) => {
        if (e.dataTransfer.types[0] !== 'Files') {
            return;
        }
        e.preventDefault();
        this.setState({
            dragOn: true,
        });
    }

    private handleMouseOut = () => {
        this.setState({
            dragOn: false,
            dragUnder: false,
        });
    }

    private handleWindowDrop = (e: any) => {
        e.preventDefault();
        this.setState({
            dragOn: false,
        });
    }

    private handleDragOver = (e: any) => {
        this.setState({
            dragUnder: true,
        });
    }

    private handleDragLeave = (e: any) => {
        this.setState({
            dragUnder: false,
        });
    }

    componentDidMount() {
        window.addEventListener('dragover', this.handleWindowDragover);
        window.addEventListener('drop', this.handleWindowDrop);
    }

    componentWillUnmount() {
        window.removeEventListener('dragover', this.handleWindowDragover);
        window.removeEventListener('drop', this.handleWindowDrop);
    }

    render() {
        const { state } = this;
        const { dragOn, dragUnder } = state;
        return (
            <DropArea
                dragOn={dragOn}
                height={dragOn ? this.props.height : 0}
                onMouseOut={this.handleMouseOut}
            >
                <DropAreaContent
                    onDrop={this.handleDrop}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onMouseOut={this.handleMouseOut}
                    dragUnder={dragUnder}
                >
                    <UloadIc />
                    <XView
                        fontSize={16}
                        fontWeight="600"
                        lineHeight={1.5}
                        flexDirection="row"
                        justifyContent="center"
                        color="#334562"
                        marginTop={23}
                        marginBottom={4}
                    >
                        Drop files here
                    </XView>
                    <XView
                        fontSize={14}
                        fontWeight="600"
                        lineHeight={1.71}
                        flexDirection="row"
                        justifyContent="center"
                        color="#5c6a81"
                    >
                        To send them as files
                    </XView>
                </DropAreaContent>
            </DropArea>
        );
    }
}
