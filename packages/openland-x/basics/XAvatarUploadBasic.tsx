import * as React from 'react';
import {
    XFileUpload,
    XImageCrop,
    XFileUploadRenderProps,
    UploadedFile,
} from '../files/XFileUpload';
import Glamorous from 'glamorous';
import { XIcon } from '../XIcon';
import { XCloudImage } from '../XCloudImage';
import { XLoader } from '../XLoader';
import { styleResolver } from 'openland-x-utils/styleResolver';

export interface XAvatarUploadBasicProps {
    placeholder?: { add: any; change: any };
    file?: UploadedFile | null;
    onChanged?: (file: UploadedFile | null) => void;
    size?: 'small' | 'normal' | 'large' | 'default';
    initialUrl?: string | null;
    cropParams?: string;
    dataTestId?: string;
}

let DrowAreaSize = styleResolver({
    small: {
        width: 96,
        height: 96,
    },
    default: {
        width: 120,
        height: 120,
    },
    normal: {
        width: 160,
        height: 160,
    },
    large: {
        width: 240,
        height: 240,
    },
});

const DropAreaWrapper = Glamorous.div<{
    hasImage: boolean;
    avatarSize?: 'small' | 'normal' | 'large' | 'default';
}>([
    {
        position: 'relative',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderRadius: 12,
        border: '1px solid rgba(220, 222, 228, 0.45)',
        cursor: 'pointer',

        '&:hover': {
            border: '1px solid #45a6ff',
        },

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    props => DrowAreaSize(props.avatarSize || 'normal'),
]);

const AvatarImage = Glamorous(XCloudImage)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
});

const PlaceholderHoint = Glamorous.div<{ hasImage: boolean }>(props => ({
    lineHeight: 1.29,
    letterSpacing: -0.1,
    textAlign: 'center',
}));

const PlaceholderImage = Glamorous(XIcon)<{ hasImage: boolean }>(props => ({
    fontSize: 30,
    marginBottom: 7,
}));

const Placeholder = Glamorous.div<{ hasImage: boolean }>(props => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: props.hasImage ? 'rgba(255, 255, 255, 0)' : 'rgba(51,69,98,0.5)',
    zIndex: 1,
    '&:hover': {
        color: props.hasImage ? '#fff' : 'rgba(51,69,98,0.5)',
        backgroundColor: props.hasImage ? 'rgba(0, 0, 0, 0.47)' : '#fff',
    },
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

interface AvatarRenderProps extends XFileUploadRenderProps {
    placeholder?: {
        add: any;
        change: any;
    };
    size?: 'small' | 'normal' | 'large' | 'default';
    dataTestId ?: string;
}

let AvatarImageSize = {
    small: 96,
    default: 120,
    normal: 159,
    large: 241,
};

class AvatarRender extends React.PureComponent<
    AvatarRenderProps,
    { srcLoading: boolean }
> {
    constructor(props: AvatarRenderProps) {
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
    };
    render() {
        let hasImage =
            (this.props.file &&
                this.props.file.uuid &&
                this.props.file.uuid &&
                !this.props.file.uuid.startsWith('ph://') &&
                this.props.file.isImage) ||
            false;
        let isFreeCrop =
            this.props.file &&
            this.props.file.crop &&
            this.props.file.crop.height !== this.props.file.crop.width;

        return (
            <DropAreaWrapper
                data-test-id={this.props.dataTestId}
                hasImage={hasImage}
                onClick={this.props.doUpload}
                avatarSize={this.props.size}
                className={(this.props as any).className}
            >
                {hasImage && (
                    <AvatarImage
                        width={AvatarImageSize[this.props.size || 'normal']}
                        height={AvatarImageSize[this.props.size || 'normal']}
                        srcCloud={prepareSrc(
                            this.props.file!!.uuid,
                            this.props.file!!.crop,
                        )}
                        resize={isFreeCrop ? undefined : 'fill'}
                        onLoad={this.handleOnLoad}
                    />
                )}

                <Placeholder hasImage={hasImage}>
                    <PlaceholderImage icon="photo_camera" hasImage={hasImage} />
                    <PlaceholderHoint hasImage={hasImage}>
                        {this.props.placeholder &&
                            (hasImage
                                ? this.props.placeholder.change
                                : this.props.placeholder.add)}
                        {!this.props.placeholder && (
                            <>
                                {' '}
                                <p>{hasImage ? 'Change' : 'Add'} your</p>{' '}
                                <p>profile photo</p>
                            </>
                        )}
                    </PlaceholderHoint>
                </Placeholder>
                {(this.props.isLoading || this.state.srcLoading) && (
                    <XLoader
                        loading={this.props.isLoading || this.state.srcLoading}
                    />
                )}
            </DropAreaWrapper>
        );
    }
}

export class XAvatarUploadBasic extends React.PureComponent<
    XAvatarUploadBasicProps
> {
    render() {
        return (
            <XFileUpload
                {...this.props}
                initialUrl={this.props.initialUrl}
                cropParams={this.props.cropParams || '1:1'}
                component={rp => {
                    return (
                        <AvatarRender
                            {...rp}
                            dataTestId={this.props.dataTestId}
                            placeholder={this.props.placeholder}
                            size={this.props.size}
                            {...{ className: (this.props as any).className }}
                        />
                    );
                }}
            />
        );
    }
}
