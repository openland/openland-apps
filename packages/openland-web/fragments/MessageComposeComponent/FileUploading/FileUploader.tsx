import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import RemoveIcon from 'openland-icons/ic-close.svg';
import { niceBytes } from 'openland-web/components/messenger/message/content/MessageFileComponent';
import { UploadContext } from './UploadContext';

const CoverWrapper = Glamorous.div({
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'flex-start',
    display: 'flex',
    width: 60,
    height: 60,
    marginLeft: 14,
    '& > img': {
        display: 'block',
        minWidth: '100%',
        minHeight: '100%',
        objectFit: 'cover',
    },
});

const CoverDelButton = Glamorous.div({
    position: 'absolute',
    right: -2,
    top: -2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 20,
    height: 20,
    paddingTop: 2,
    paddingRight: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    '& > svg path': {
        fill: '#fff',
    },
});

const FileItem = Glamorous(XHorizontal)({
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 1.54,
    fontWeight: 500,
    color: '#000',
    paddingLeft: 18,
    '& .remove': {
        marginTop: 1,
        cursor: 'pointer',
        '& > svg path': {
            fill: '#C7C7C7',
        },
        '&:hover > svg path': {
            fill: '#4a4a4a',
        },
    },
    '& span': {
        opacity: 0.6,
    },
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: "url('/static/X/file.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

export const FileUploader = () => {
    const { file, fileSrc, fileName, fileRemover } = React.useContext(UploadContext);

    return (
        <>
            {file &&
                fileSrc && (
                    <CoverWrapper>
                        <img src={fileSrc} />
                        <CoverDelButton onClick={fileRemover}>
                            <RemoveIcon />
                        </CoverDelButton>
                    </CoverWrapper>
                )}
            {file &&
                fileName && (
                    <FileItem key={'file' + fileName} separator={4} alignItems="center">
                        <FileImage />
                        <XHorizontal alignItems="center" separator={4}>
                            <div>
                                {fileName} <span>•</span> {niceBytes(Number((file as any).size))}
                            </div>
                            <XHorizontal
                                alignItems="center"
                                className="remove"
                                onClick={fileRemover}
                            >
                                <RemoveIcon />
                            </XHorizontal>
                        </XHorizontal>
                    </FileItem>
                )}
        </>
    );
};
