import * as React from 'react';
import Glamorous from 'glamorous';
import { layoutMedia } from '../../../utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import ModalCloseIcon from '../../icons/ic-modal-close.svg';
import DownloadButtonIcon from '../../icons/ic_file_download.svg';
import { XView } from 'react-mental';

export const ModalCloser = Glamorous(XLink)({
    position: 'fixed',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ImgDownload = Glamorous.a({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 0,
    position: 'absolute',
    top: 20,
    right: 20,
});

export const ModalBody = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
    '&:hover > .download-button': {
        opacity: 1,
    },
});

export const ModalPic = Glamorous(XCloudImage)({
    borderRadius: 8,
    objectFit: 'contain',
    maxHeight: '90vh',
});

interface MessageImageComponentProps {
    file: string;
    fileName?: string;
    width: number;
    height: number;
    startSelected: boolean;
}

export class MessageImageComponent extends React.PureComponent<
    MessageImageComponentProps,
    { isOpen: boolean }
> {
    constructor(props: MessageImageComponentProps) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    handleOpen = (e: any) => {
        if (this.props.startSelected) {
            return;
        }
        e.stopPropagation();
        this.setState({
            isOpen: true,
        });
    };

    handleClose = () => {
        this.setState({
            isOpen: false,
        });
    };

    render() {
        const { props } = this;
        let dimensions = layoutMedia(props.width, props.height);
        let dimensions2 = layoutMedia(props.width, props.height, 1000, 1000);
        return (
            <>
                <XModal
                    useTopCloser={true}
                    width={dimensions2.width}
                    heading={null}
                    transparent={true}
                    isOpen={this.state.isOpen}
                    onClosed={this.handleClose}
                    body={
                        <ModalBody>
                            <ModalCloser autoClose={true} className="closer">
                                <ModalCloseIcon />
                            </ModalCloser>
                            <ModalPic
                                srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                                resize={'fill'}
                                width={dimensions2.width}
                                height={dimensions2.height}
                            />
                            <ImgDownload
                                className="download-button"
                                href={
                                    'https://ucarecdn.com/' + props.file + '/-/preview/-/inline/no/'
                                }
                            >
                                <DownloadButtonIcon />
                            </ImgDownload>
                        </ModalBody>
                    }
                />
                <XView onClick={this.handleOpen} cursor="pointer">
                    <XCloudImage
                        srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                        resize={'fill'}
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                </XView>
            </>
        );
    }
}
