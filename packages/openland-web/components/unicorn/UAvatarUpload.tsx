import * as React from 'react';
import { css, cx } from 'linaria';
import {
    UFileUpload,
    UUploadCareImageCrop,
    UFileUploadRenderProps,
    UploadedFile,
    UImageCropT,
} from 'openland-web/components/unicorn/UFileUpload';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XLoader } from 'openland-x/XLoader';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcPhoto from 'openland-icons/s/ic-camera-36.svg';
import IcPhotoIndicator from 'openland-icons/s/ic-camera-16.svg';
import IcClear from 'openland-icons/s/ic-clear-16.svg';
import { FormField } from 'openland-form/useField';

export interface UAvatarUploadBasicProps {
    value?: UploadedFile | null;
    onChange?: (file: UploadedFile | null) => void;
    initialUrl?: string | null;
    cropParams?: string | false;
    className?: string;
    hideImageIndicator?: boolean;
    clearable?: boolean;
}

const contentContainer = css`
    cursor: pointer;
    position: relative;
    display: flex;
    flex-shrink: 0;
    max-width: 100%;
    align-items: center;
    justify-content: center;
    align-self: flex-start;

    & .ic-camera {
        z-index: 1;
    }
    & .loader {
        z-index: 1;
    }
    & .avatar-container:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
`;

const hasImageContentContainer = css`
    & .ic-camera {
        display: none;
    }
    & .avatar-container:hover {
        background-color: var(--backgroundTertiary);
    }
    &:hover {
        & .avatar-container::after {
            background-color: var(--overlayLight);
        }
    }
`;

const isLoadingContentContainer = css`
    cursor: default;
    & .ic-camera {
        display: none;
    }
    & .avatar-container:hover {
        background-color: var(--backgroundTertiary);
    }
    & .avatar-container::after {
        background-color: var(--overlayLight);
    }
    &:hover {
        & .ic-camera {
            display: none;
        }
    }
`;

const hasImageIndicator = css`
    pointer-events: none;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--backgroundPrimary);
    border-radius: 100%;
    background-color: var(--accentPrimary);
    position: absolute;
    right: 4px;
    bottom: 4px;
    z-index: 2;
`;

const avatarContainer = css`
    width: 96px;
    height: 96px;
    max-width: 100%;
    position: relative;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;
    background-color: var(--backgroundTertiaryTrans);
`;

const hasImageAvatarContainer = css`
    &::after {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        content: '';
        background-color: transparent;
        border-radius: 100%;
        border: 1px solid var(--borderLight);
        box-sizing: border-box;
        z-index: 2;
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

const clearContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    cursor: pointer;
    z-index: 2;
    position: absolute;
    right: 0;
    top: 0;
    &:hover {
      opacity: 0.72;
    }
    & svg {
        box-shadow: var(--boxShadowPopper);
        border-radius: 100px;
    }
`;

const clearContainerIcon = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: -1;
    }
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
    className?: string;
}

const AvatarRender = (props: AvatarRenderProps) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [oldValue] = React.useState(props.value);

    React.useLayoutEffect(() => {
        if (props.value !== oldValue) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [props.value, oldValue]);

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
                props.className && props.className,
            )}
        >
            <div
                className={cx(
                    avatarContainer,
                    hasImage && hasImageAvatarContainer,
                    'avatar-container',
                )}
            >
                {hasImage && (
                    <XCloudImage
                        width={value && value.crop && isFreeCrop ? value.crop.width : undefined}
                        height={value && value.crop && isFreeCrop ? value.crop.height : undefined}
                        srcCloud={prepareSrc(value!!.uuid, value!!.crop)}
                        resize={'fill'}
                        onLoad={onLoad}
                        className={avatarImage}
                    />
                )}
                {!hasImage && <UIcon icon={<IcPhoto />} color="var(--foregroundQuaternary)" className="ic-camera" />}
                {(props.isLoading || isLoading) && (
                    <XLoader
                        transparentBackground={true}
                        loading={props.isLoading || isLoading}
                        contrast={true}
                        className="loader"
                    />
                )}
            </div>
            {hasImage && props.hideImageIndicator !== true && (
                <div className={hasImageIndicator}>
                    <UIcon icon={<IcPhotoIndicator />} color="var(--foregroundContrast)" />
                </div>
            )}
            {hasImage && props.clearable && (
                <div
                    className={clearContainer}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.doClear();
                    }}
                >
                    <div className={clearContainerIcon}>
                        <UIcon icon={<IcClear />} size={24} color="var(--foregroundContrast)" />
                    </div>
                </div>
            )}
        </div>
    );
};

export const UAvatarUploadBasic = React.memo<UAvatarUploadBasicProps>((props) => (
    <UFileUpload
        {...props}
        initialUrl={props.initialUrl}
        cropParams={props.cropParams === undefined ? '1:1' : props.cropParams}
        component={(rp) => {
            return <AvatarRender {...rp} />;
        }}
    />
));

export type StoredFileT = {
    uuid: string;
    name?: string | null;
    size?: string | null;
    isImage?: boolean;
    width?: number | null;
    height?: number | null;
    crop?: UImageCropT | null;
};

export const toValue = (file: UploadedFile | null): StoredFileT | null => {
    if (file && file.isImage) {
        if (file.crop) {
            return {
                isImage: true,
                uuid: file.uuid,
                width: file.width,
                height: file.height,
                crop: {
                    x: Math.round(file.crop.left),
                    y: Math.round(file.crop.top),
                    w: Math.round(file.crop.width),
                    h: Math.round(file.crop.height),
                },
            };
        } else {
            let side = Math.min(file.width!!, file.height!!);
            return {
                isImage: true,
                uuid: file.uuid,
                width: file.width,
                height: file.height,
                crop: {
                    x: Math.round((file.width!! - side) / 2),
                    y: Math.round((file.height!! - side) / 2),
                    w: Math.round(side),
                    h: Math.round(side),
                },
            };
        }
    }
    return null;
};

export const fromValue = (value2?: StoredFileT | null): UploadedFile | null => {
    if (value2) {
        let uuid = value2.uuid;
        let name = value2.name;
        let size = value2.size;
        let crop = value2.crop
            ? {
                left: Math.round(value2.crop.x),
                top: Math.round(value2.crop.y),
                width: Math.round(value2.crop.w),
                height: Math.round(value2.crop.h),
            }
            : null;

        return {
            uuid: uuid,
            crop: crop,
            isImage: true,
            width: crop ? crop.width : null,
            height: crop ? crop.height : null,
            name: name ? name : null,
            size: size ? size : null,
        };
    }
    return null;
};

interface UAvatarUploadFieldProps extends UAvatarUploadBasicProps {
    field: FormField<StoredFileT | undefined | null>;
}

export const UAvatarUploadField = (props: UAvatarUploadFieldProps) => {
    const { field, ...other } = props;
    return (
        <UAvatarUploadBasic
            value={fromValue(field.input.value)}
            onChange={(file: UploadedFile | null) => {
                field.input.onChange(toValue(file));
            }}
            {...other}
        />
    );
};
