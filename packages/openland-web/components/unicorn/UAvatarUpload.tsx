import * as React from 'react';
import { css, cx } from 'linaria';
import {
    UFileUpload,
    UUploadCareImageCrop,
    UFileUploadRenderProps,
    UploadedFile,
} from 'openland-web/components/unicorn/UFileUpload';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XLoader } from 'openland-x/XLoader';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcPhoto from 'openland-icons/s/ic-camera-36.svg';
import IcPhotoIndicator from 'openland-icons/s/ic-camera-16.svg';

export interface UAvatarUploadBasicProps {
    value?: UploadedFile | null;
    onChange?: (file: UploadedFile | null) => void;
    initialUrl?: string | null;
    cropParams?: string;
}

const contentContainer = css`
    cursor: pointer;
    width: 96px;
    height: 96px;
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    & .ic-camera {
        z-index: 1;
    }
    & .loader {
        z-index: 1;
    }
    &:hover {
        & .ic-camera {
            --icon-color: #fff !important;
        }
        & .avatar-container::after {
            background-color: var(--overlayLight);
        }
    }
`;

const hasImageContentContainer = css`
    & .ic-camera {
        display: none;
    }
    &:hover {
        & .ic-camera {
            display: flex;
        }
    }
`;

const isLoadingContentContainer = css`
    cursor: default;
    & .ic-camera {
        display: none;
    }
    &:hover {
        & .ic-camera {
            display: none;
        }
    }
    & .avatar-container::after {
        background-color: var(--overlayLight);
    }
`;

const hasImageIndicator = css`
    pointer-events: none;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    border-radius: 100%;
    background-color: var(--accentPrimary);
    position: absolute;
    right: 4px;
    bottom: 4px;
    z-index: 2;
`;

const avatarContainer = css`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: var(--backgroundTertiary);
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;

    &::after {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        content: '';
        background-color: transparent;
    }
`;

const avatarImage = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    min-height: 100%;
    min-width: 100%;
    max-width: 100%;
    max-height: 100%;
`;

function prepareSrc(uuid: string, crop: UUploadCareImageCrop | null) {
    if (uuid && uuid.startsWith('https://ucarecdn.com/')) {
        return uuid;
    }
    let res = 'https://ucarecdn.com/' + uuid + '/';
    if (crop) {
        res += `-/crop/${crop.width}x${crop.height}/${crop.left},${crop.top}/`;
    }
    return res;
}

interface AvatarRenderProps extends UFileUploadRenderProps {
    dataTestId?: string;
}

const AvatarRender = (props: AvatarRenderProps) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [oldValue] = React.useState(props.value);

    React.useLayoutEffect(
        () => {
            if (props.value !== oldValue) {
                setIsLoading(true);
            } else {
                setIsLoading(false);
            }
        },
        [props.value, oldValue],
    );

    const onLoad = () => {
        setIsLoading(false);
    };

    const { value } = props;
    const hasImage = !!(value && value.uuid && !value.uuid.startsWith('ph://') && value.isImage);
    const isFreeCrop = value && value.crop && value.crop.height !== value.crop.width;
    return (
        <div
            onClick={props.isLoading || isLoading ? undefined : props.doUpload}
            className={cx(
                contentContainer,
                hasImage && hasImageContentContainer,
                (isLoading || props.isLoading) && isLoadingContentContainer,
            )}
        >
            <div className={cx(avatarContainer, 'avatar-container')}>
                {hasImage && (
                    <XCloudImage
                        width={value && value.crop && isFreeCrop ? value.crop.width : 96}
                        height={value && value.crop && isFreeCrop ? value.crop.height : 96}
                        srcCloud={prepareSrc(value!!.uuid, value!!.crop)}
                        resize={'fill'}
                        onLoad={onLoad}
                        className={avatarImage}
                    />
                )}
                <UIcon icon={<IcPhoto />} color="#C8C9CC" className="ic-camera" />
                {(props.isLoading || isLoading) && (
                    <XLoader
                        transparentBackground={true}
                        loading={props.isLoading || isLoading}
                        color="#fff"
                        className="loader"
                    />
                )}
            </div>
            {hasImage && (
                <div className={hasImageIndicator}>
                    <UIcon icon={<IcPhotoIndicator />} color="#fff" />
                </div>
            )}
        </div>
    );
};

export const UAvatarUploadBasic = React.memo<UAvatarUploadBasicProps>(props => (
    <UFileUpload
        {...props}
        initialUrl={props.initialUrl}
        cropParams={props.cropParams || '1:1'}
        component={rp => {
            return <AvatarRender {...rp} />;
        }}
    />
));
