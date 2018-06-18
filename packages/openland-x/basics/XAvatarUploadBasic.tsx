import * as React from 'react';
import { XFileUpload, XImageCrop, XFileUploadRenderProps, UploadedFile } from '../files/XFileUpload';
import Glamorous from 'glamorous';
import { XIcon } from '../XIcon';
import { XCloudImage } from '../XCloudImage';
import { XLoader } from '../XLoader';

export interface XAvatarUploadBasicProps {
    placeholder?: { add: any, change: any };
    file?: UploadedFile | null;
    onChanged?: (file: UploadedFile | null) => void;
    size?: 'normal' | 'large';
    initialUrl?: string | null;
}

const DropAreaWrapper = Glamorous.div<{ hasImage: boolean, avatarSize?: 'normal' | 'large' }>((props) => ({
    position: 'relative',
    width: props.avatarSize === 'large' ? 242 : 160,
    height: props.avatarSize === 'large' ? 242 : 160,

    backgroundColor: '#ffffff',
    overflow: 'hidden',

    borderRadius: 5,
    border: 'solid 1px #dcdee4',

    cursor: 'pointer',

    '&:hover': {
        border: '1px solid #986AFE'
    },

    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'stretch',

}));

const AvatarImage = Glamorous(XCloudImage)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
});

const PlaceholderHoint = Glamorous.div<{ hasImage: boolean }>((props) => ({
    lineHeight: 1.29,
    letterSpacing: -0.1,
    textAlign: 'center',
}));

const PlaceholderImage = Glamorous(XIcon)<{ hasImage: boolean }>((props) => ({
    fontSize: 30,
    marginBottom: 7,
}));

const Placeholder = Glamorous.div<{ hasImage: boolean }>((props) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: props.hasImage ? 'rgba(255, 255, 255, 0)' : '#dcdee4',
    zIndex: 1,
    '&:hover': {
        color: props.hasImage ? '#fff' : '#dcdee4',
    }
}));

function prepareSrc(uuid: string, crop: XImageCrop | null) {
    if (uuid && uuid.startsWith('https://ucarecdn.com/')) {
        return uuid;
    }
    let res = 'https://ucarecdn.com/' + uuid + '/';
    if (crop) {
        res += `-/crop/${crop.width}x${crop.height}/${crop.left},${crop.top}/`;
    }
    return res;
}

class AvatarRender extends React.PureComponent<
    XFileUploadRenderProps & { placeholder?: { add: any, change: any }, size?: 'normal' | 'large'; },
    { srcLoading: boolean }> {

    constructor(props: XFileUploadRenderProps & { placeholder?: { add: any, change: any }, size?: 'normal' | 'large'; }) {
        super(props);
        this.state = { srcLoading: false };
        // if (props.uuid) {
        //     this.state = { srcLoading: true };
        // } else {
        //     this.state = { srcLoading: false };
        // }
    }

    componentWillReceiveProps(nextProps: XFileUploadRenderProps) {
        if (this.props.file !== nextProps.file) {
            if (nextProps.file) {
                this.setState({ srcLoading: true });
            } else {
                this.setState({ srcLoading: false });
            }
        }
    }

    handleOnLoad = () => {
        this.setState({ srcLoading: false });
    }
    render() {
        let hasImage = this.props.file && this.props.file.uuid && this.props.file.isImage || false;
        return (
            <DropAreaWrapper
                hasImage={hasImage}
                onClick={this.props.doUpload}
                avatarSize={this.props.size}
            >
                {hasImage && <AvatarImage
                    width={this.props.size === 'large' ? 241 : 159}
                    height={this.props.size === 'large' ? 241 : 159}
                    srcCloud={prepareSrc(this.props.file!!.uuid, this.props.file!!.crop)}
                    resize={'fill'}
                    onLoad={this.handleOnLoad}
                />}

                <Placeholder hasImage={hasImage}>
                    <PlaceholderImage icon="photo_camera" hasImage={hasImage} />
                    <PlaceholderHoint hasImage={hasImage}>
                        {this.props.placeholder && (hasImage ? this.props.placeholder.change : this.props.placeholder.add)}
                        {!this.props.placeholder && (<> <p>{hasImage ? 'Change' : 'Add'} your</p> <p>profile photo</p></>)}

                    </PlaceholderHoint>
                </Placeholder>
                {(this.props.isLoading || this.state.srcLoading) && <XLoader loading={this.props.isLoading || this.state.srcLoading} />}
            </DropAreaWrapper>
        );
    }
}

export class XAvatarUploadBasic extends React.PureComponent<XAvatarUploadBasicProps> {
    render() {
        return (
            <XFileUpload
                {...this.props}
                initialUrl={this.props.initialUrl}
                cropParams="1:1"
                component={(rp) => {
                    return (
                        <AvatarRender {...rp} placeholder={this.props.placeholder} size={this.props.size} />
                    );
                }}
            />
        );
    }
}