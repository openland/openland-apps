import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { XCloudImage } from 'openland-x/XCloudImage';

const picStyle = css`
    border-radius: 8px;
    object-fit: contain;
    max-height: 90vh;
`;

export const showAvatarModal = (photo: string) => {
    showModalBox({ width: 512, transparentBox: true }, ctx => (
        <XView alignItems="center" justifyContent="center" onClick={ctx.hide}>
            <XCloudImage
                srcCloud={
                    photo.includes('ucarecdn')
                        ? photo
                        : `https://ucarecdn.com/${photo}/-/format/jpeg/`
                }
                resize={'fill'}
                width={512}
                height={512}
                maxWidth="100%"
                className={picStyle}
            />
        </XView>
    ));
};
