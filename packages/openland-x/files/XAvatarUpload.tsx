import * as React from 'react';
// import { XButton } from 'openland-x/XButton';
// import { XCloudImage } from 'openland-x/XCloudImage';
import { XFileUpload, XImageCrop } from './XFileUpload';
import Glamorous from 'glamorous';
import { XIcon } from '../XIcon';
import { XCloudImage } from '../XCloudImage';
import { XLoader } from '../XLoader';

export interface XAvatarUploadProps {
    crop?: XImageCrop | null;
    uuid?: string | null;
    onChanged?: (uuid: string | null, crop: XImageCrop | null) => void;
}

const DropAreaWrapper = Glamorous.div<{ hasImage: boolean }>((props) => ({
    position: 'relative',
    width: 153,
    height: 153,

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

export function XAvatarUpload(props: XAvatarUploadProps) {

    return (
        <XFileUpload
            {...props}
            cropParams="1:1"
            component={(rp) => {
                console.warn(rp);
                return (
                    <DropAreaWrapper
                        hasImage={rp.uuid !== null}
                        onClick={rp.doUpload}
                    >
                        {rp.uuid && <AvatarImage
                            width={152}
                            height={152}
                            src={rp.uuid}
                            crop={rp.crop}
                            resize={'fill'}
                        />}

                        <Placeholder hasImage={rp.uuid !== null}>
                            <PlaceholderImage icon="photo_camera" hasImage={rp.uuid !== null} />
                            <PlaceholderHoint hasImage={rp.uuid !== null}><p>{rp.uuid !== null ? 'Change' : 'Add'} your</p><p>profile photo</p></PlaceholderHoint>
                        </Placeholder>
                        {rp.isLoading && <XLoader loading={rp.isLoading} />}
                    </DropAreaWrapper>
                );
            }} />
    );
}