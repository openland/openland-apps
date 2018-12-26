import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { layoutMedia } from '../../../../../utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal } from 'openland-x-modal/XModal';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import DownloadButtonIcon from 'openland-icons/ic_file_download.svg';

const ModalBody = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 40px;
    &:hover > a {
        opacity: 1 !important;
    }
`;

const ModalImage = css`
    border-radius: 8px;
    object-fit: contain;
    max-height: 90vh;
`;

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

    private modalBody = (width: number, height: number) => (
        <div className={ModalBody}>
            <XView
                onClick={this.handleClose}
                cursor="pointer"
                position="fixed"
                right={20}
                top={20}
                width={36}
                height={36}
                borderRadius={5}
                backgroundColor="transparent"
                justifyContent="center"
                alignItems="center"
            >
                <ModalCloseIcon />
            </XView>
            <XCloudImage
                srcCloud={'https://ucarecdn.com/' + this.props.file + '/'}
                resize={'fill'}
                width={width}
                height={height}
                className={ModalImage}
            />
            <XView
                as="a"
                justifyContent="center"
                alignItems="center"
                width={36}
                height={36}
                borderRadius={5}
                backgroundColor="rgba(0, 0, 0, 0.6)"
                opacity={0}
                position="absolute"
                top={20}
                right={20}
                href={'https://ucarecdn.com/' + this.props.file + '/-/preview/-/inline/no/'}
            >
                <DownloadButtonIcon />
            </XView>
        </div>
    );

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
                    body={this.modalBody(dimensions2.width, dimensions2.height)}
                />
                <XView onClick={this.handleOpen} cursor="pointer" paddingBottom={5}>
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
