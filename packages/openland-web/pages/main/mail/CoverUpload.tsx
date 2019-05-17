import * as React from 'react';
import { css, cx } from 'linaria';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import AddPhotoIcon from 'openland-icons/ic-photo-create-room.svg';
import UploadCare from 'uploadcare-widget';
import { getConfig } from '../../../config';

const CoverWrapperClassName = css`
    width: 120px;
    height: 120px;
    border-radius: 62px;
    background-color: #f2f3f4;
    color: #696c6e;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
        & .edit-photo {
            opacity: 1;
            color: #fff;
        }
        & svg path {
            fill: #fff;
        }
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.4;
            background-color: #000000;
            content: '';
            z-index: 0;
        }
    }
`;

const AddPhotoClassName = css`
    position: absolute;
    top: calc(50% - 24px);
    left: calc(50% - 32px);
    pointer-events: none;
    font-size: 14px;
    line-height: 1.29;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    & span {
        display: block;
        margin-top: 9px;
    }
`;

const EditPhotoClassName = css`
    opacity: 0;
`;

const CoverImgClassName = css`
    width: 100%;
    height: 100%;
    display: block;
`;

export const CoverUpload = ({ onCoverSelect }: { onCoverSelect: (a: string | null) => void }) => {
    const [coverSrc, setCoverSrc] = React.useState<string | null>('');
    const [coverUploading, setCoverUploading] = React.useState(false);

    const handleSetCover = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!,
        });
        dialog.done(res => {
            res.progress(r => {
                setCoverUploading(true);

                setCoverSrc('');
                onCoverSelect('');
            });
            res.done(r => {
                setCoverUploading(false);

                setCoverSrc(r.uuid);
                onCoverSelect(r.uuid);
            });
        });
    };

    return (
        <div className={CoverWrapperClassName} onClick={handleSetCover}>
            {coverUploading && <XLoadingCircular color="#373754" />}
            {!coverUploading && (
                <>
                    {coverSrc && (
                        <>
                            <img
                                className={CoverImgClassName}
                                src={
                                    'https://ucarecdn.com/' +
                                    coverSrc +
                                    '/-/format/jpeg/-/scale_crop/200x200/center/-/progressive/yes/'
                                }
                            />
                            <div
                                className={`${cx(
                                    AddPhotoClassName,
                                    EditPhotoClassName,
                                )} edit-photo`}
                            >
                                <AddPhotoIcon />
                                <span>Edit photo</span>
                            </div>
                        </>
                    )}
                    {!coverSrc && (
                        <div className={`${AddPhotoClassName} edit-photo`}>
                            <AddPhotoIcon />
                            <span>Add photo</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
