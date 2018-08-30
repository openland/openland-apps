import * as React from 'react';
import Glamorous from 'glamorous';
import { layoutMedia } from './utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import ModalCloseIcon from '../../icons/ic-modal-close.svg';

const ModalCloser = Glamorous(XLink)({
    position: 'fixed',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const ModalBody = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // maxWidth: 570,
    // margin: 'auto',
    // paddingTop: 40,
    // paddingBottom: 40,
});

const ModalPic = Glamorous.img({
    objectFit: 'contain',
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: 8
});

export class MessageImageComponent extends React.PureComponent<{ file: string, fileName?: string, width: number, height: number }> {
    render() {
        let dimensions = layoutMedia(this.props.width, this.props.height);
        return (
            <XModal
                useTopCloser={true}
                noTransformContainer={true}
                heading={(
                    <ModalBody>
                        <ModalPic
                            src={'https://ucarecdn.com/' + this.props.file + '/'}
                        />
                    </ModalBody>
                )}
                transparent={true}
                body={(
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                )}
                target={(
                    <XLink>
                        <XCloudImage
                            srcCloud={'https://ucarecdn.com/' + this.props.file + '/'}
                            resize={'fill'}
                            width={dimensions.width}
                            height={dimensions.height}
                        />
                    </XLink>
                )}
            />
        );
    }
}