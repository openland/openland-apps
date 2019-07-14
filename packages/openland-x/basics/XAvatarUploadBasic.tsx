import * as React from 'react';
import {
    XFileUpload,
    XUploadCareImageCrop,
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
    value?: UploadedFile | null;
    onChange?: (file: UploadedFile | null) => void;
    size?: 'small' | 'xSmall' | 'normal' | 'large' | 'default';
    darkMode?: boolean;
    initialUrl?: string | null;
    cropParams?: string;
    dataTestId?: string;
    rounded?: boolean;
}

let DrowAreaSize = styleResolver({
    small: {
        width: 96,
        height: 96,
    },
    xSmall: {
        width: 100,
        height: 100,
    },
    default: {
        width: 110,
        height: 110,
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

interface DropAreaWrapperProps {
    hasImage: boolean;
    avatarSize?: 'small' | 'xSmall' | 'normal' | 'large' | 'default';
    darkMode?: boolean;
    rounded?: boolean;
}

const DropAreaWrapper = Glamorous.div<DropAreaWrapperProps>([
    props => ({
        position: 'relative',
        backgroundColor: props.darkMode ? '#f9f9f9' : '#fff',
        overflow: 'hidden',
        borderRadius: props.rounded ? '100%' : props.darkMode ? 8 : 12,
        border: props.darkMode ? undefined : '1px solid rgba(220, 222, 228, 0.45)',
        cursor: 'pointer',

        '&:hover': {
            border: props.darkMode ? undefined : '1px solid #45a6ff',
        },

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    }),
    props => DrowAreaSize(props.avatarSize || 'normal'),
]);

const AvatarImage = Glamorous(XCloudImage)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    minHeight: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
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

interface PlaceholderProps {
    hasImage: boolean;
    darkMode?: boolean;
}

const Placeholder = Glamorous.div<PlaceholderProps>(props => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: props.darkMode
        ? '#7a7a7a'
        : props.hasImage
            ? 'rgba(255, 255, 255, 0)'
            : 'rgba(51,69,98,0.5)',
    zIndex: 1,
    '&:hover': {
        color: props.darkMode ? '#fff' : props.hasImage ? '#fff' : 'rgba(51,69,98,0.5)',
        backgroundColor: props.darkMode
            ? 'rgba(0, 0, 0, 0.4)'
            : props.hasImage
                ? 'rgba(0, 0, 0, 0.4)'
                : '#fff',
    },
}));

function prepareSrc(uuid: string, crop: XUploadCareImageCrop | null) {
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
    darkMode?: boolean;
    size?: 'small' | 'xSmall' | 'normal' | 'large' | 'default';
    dataTestId?: string;
    rounded?: boolean;
}

let AvatarImageSize = {
    small: 96,
    xSmall: 100,
    default: 110,
    normal: 159,
    large: 241,
};

class AvatarRender extends React.PureComponent<AvatarRenderProps, { srcLoading: boolean }> {
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
        if (this.props.value !== nextProps.value) {
            if (nextProps.value) {
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
            (this.props.value &&
                this.props.value.uuid &&
                this.props.value.uuid &&
                !this.props.value.uuid.startsWith('ph://') &&
                this.props.value.isImage) ||
            false;

        let isFreeCrop =
            this.props.value &&
            this.props.value.crop &&
            this.props.value.crop.height !== this.props.value.crop.width;

        return (
            <DropAreaWrapper
                data-test-id={this.props.dataTestId}
                hasImage={hasImage}
                onClick={this.props.doUpload}
                avatarSize={this.props.size}
                className={(this.props as any).className}
                darkMode={this.props.darkMode}
                rounded={this.props.rounded}
            >
                {hasImage && (
                    <AvatarImage
                        width={
                            this.props.value && this.props.value.crop && isFreeCrop
                                ? this.props.value.crop.width
                                : AvatarImageSize[this.props.size || 'normal']
                        }
                        height={
                            this.props.value && this.props.value.crop && isFreeCrop
                                ? this.props.value.crop.height
                                : AvatarImageSize[this.props.size || 'normal']
                        }
                        srcCloud={prepareSrc(this.props.value!!.uuid, this.props.value!!.crop)}
                        resize={'fill'}
                        onLoad={this.handleOnLoad}
                    />
                )}

                <Placeholder hasImage={hasImage} darkMode={this.props.darkMode}>
                    <PlaceholderImage icon="photo_camera" hasImage={hasImage} />
                    <PlaceholderHoint hasImage={hasImage}>
                        {this.props.placeholder &&
                            (hasImage ? this.props.placeholder.change : this.props.placeholder.add)}
                        {!this.props.placeholder && (
                            <>
                                {' '}
                                <p>{hasImage ? 'Change' : 'Add'} your</p> <p>profile photo</p>
                            </>
                        )}
                    </PlaceholderHoint>
                </Placeholder>
                {(this.props.isLoading || this.state.srcLoading) && (
                    <XLoader loading={this.props.isLoading || this.state.srcLoading} />
                )}
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
                cropParams={this.props.cropParams || '1:1'}
                component={rp => {
                    return (
                        <AvatarRender
                            {...rp}
                            rounded={this.props.rounded}
                            dataTestId={this.props.dataTestId}
                            placeholder={this.props.placeholder}
                            size={this.props.size}
                            darkMode={this.props.darkMode}
                            {...{ className: (this.props as any).className }}
                        />
                    );
                }}
            />
        );
    }
}
