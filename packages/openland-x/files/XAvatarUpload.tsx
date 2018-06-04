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
    onChanged?: (uuid: string | null) => void;
}

const DropAreaWrapper = Glamorous.div<{ hasImage: boolean }>((props) => ({
    position: 'relative',

    width: 152,
    height: 152,

    backgroundColor: '#ffffff',
    overflow: 'hidden',

    borderRadius: 5,
    border: 'solid 1px #dcdee4',

    cursor: 'pointer',

    '&:hover': {
        border: '1px solid #986AFE'
    },
    // '& label': {
    //     width: '100%',
    //     height: '100%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     cursor: 'pointer',
    //     position: 'relative',
    //     '&::after': {
    //         content: `''`,
    //         display: 'none',
    //         width: '100%',
    //         height: '100%',
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         backgroundColor: 'rgba(0, 0, 0, 0.47)'
    //     }
    // },
    '& .material-icons': {
        color: props.hasImage ? '#fff' : '#dcdee4',
        fontSize: 30,
        marginBottom: 7,
        zIndex: 1
    },
    // '& span': {
    //     display: 'block',
    //     width: 86,
    //     fontSize: 14,
    //     lineHeight: 1.29,
    //     letterSpacing: -0.1,
    //     textAlign: 'center',
    //     color: 'rgba(51, 69, 98, 0.4)',
    //     zIndex: 1
    // },
    // '& input': {
    //     display: 'none'
    // }
}));

const AvatarImage = Glamorous(XCloudImage)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
});

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
                        <AvatarImage
                            width={152}
                            height={152}
                            src={rp.uuid}
                            crop={rp.crop}
                            resize={'fill'}
                        />
                        <XIcon icon="photo_camera" />
                        {rp.isLoading && <XLoader loading={rp.isLoading} />}
                    </DropAreaWrapper>
                );
            }} />
    );
}