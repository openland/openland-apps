import * as React from 'react';
import { XFileUpload, XImageCrop } from '../files/XFileUpload';
import Glamorous from 'glamorous';
import { XIcon } from '../XIcon';
import { XCloudImage } from '../XCloudImage';
import { XLoader } from '../XLoader';

export interface XAvatarUploadBasicProps {
    placeholder?: { add: any, change: any };
    crop?: XImageCrop | null;
    uuid?: string | null;
    onChanged?: (uuid: string | null, crop: XImageCrop | null) => void;
    size?: 'normal' | 'large';
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

export function XAvatarUploadBasic(props: XAvatarUploadBasicProps) {

    return (
        <XFileUpload
            {...props}
            cropParams="1:1"
            component={(rp) => {
                return (
                    <DropAreaWrapper
                        hasImage={rp.uuid !== null}
                        onClick={rp.doUpload}
                        avatarSize={props.size}
                    >
                        {rp.uuid && <AvatarImage
                            width={props.size === 'large' ? 241 : 159}
                            height={props.size === 'large' ? 241 : 159}
                            srcCloud={prepareSrc(rp.uuid, rp.crop)}
                            resize={'fill'}
                        />}

                        <Placeholder hasImage={rp.uuid !== null}>
                            <PlaceholderImage icon="photo_camera" hasImage={rp.uuid !== null} />
                            <PlaceholderHoint hasImage={rp.uuid !== null}>
                                {props.placeholder && (rp.uuid !== null ? props.placeholder.change : props.placeholder.add)}
                                {!props.placeholder && (<> <p>{rp.uuid !== null ? 'Change' : 'Add'} your</p> <p>profile photo</p></>)}

                            </PlaceholderHoint>
                        </Placeholder>
                        {rp.isLoading && <XLoader loading={rp.isLoading} />}
                    </DropAreaWrapper>
                );
            }}
        />
    );
}