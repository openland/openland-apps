import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import Glamorous from 'glamorous';
import ShortcutsIcon from 'openland-icons/ic-attach-shortcuts-3.svg';
import { XLink } from 'openland-x/XLink';
import { UploadContext } from '../../../modules/FileUploading/UploadContext';
import { showShortcutsHelp } from '../../showShortcutsHelp';

const FileInput = Glamorous.input({
    display: 'none',
});

export const AttachmentButton = Glamorous(XLink)<{ enabled?: boolean }>(props => ({
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    opacity: !props.enabled ? 0.7 : undefined,
    cursor: !props.enabled ? 'default !important' : 'pointer',
    '&:first-child': {
        marginLeft: 6,
    },
    '@media (max-width: 1230px)': {
        fontSize: 0,
        '& > svg': {
            marginRight: '0!important',
        },
    },
    '&:hover': {
        textDecoration: 'none',
        color: !props.enabled ? '#a3acb8' : 'rgba(0, 0, 0, 0.5)',
        backgroundColor: !props.enabled ? 'transparent' : 'rgba(0, 0, 0, 0.03)',
        '& > svg > *': {
            fill: !props.enabled ? '#c1c7cf' : 'rgba(0, 0, 0, 0.3)',
        },
    },
    '&.shortcuts-button > svg, &.document-button > svg': {
        marginTop: 1,
        marginBottom: -1,
    },
    '& > svg': {
        flexShrink: 0,
        marginRight: 10,
        '& > *': {
            fill: !props.enabled ? '#c1c7cf' : 'rgba(0, 0, 0, 0.2)',
        },
    },
}));

export const PhotoButton = ({
    enabled,
    minimal,
    onClick,
}: {
    enabled?: boolean;
    minimal?: boolean;
    onClick: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
}) => {
    return (
        <AttachmentButton onClick={!enabled ? undefined : onClick} enabled={enabled}>
            <PhotoIcon />
            {!minimal && <span>Photo</span>}
        </AttachmentButton>
    );
};

export const DocumentButton = ({
    enabled,
    minimal,
    onClick,
}: {
    enabled?: boolean;
    minimal?: boolean;
    onClick: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
}) => {
    return (
        <AttachmentButton
            onClick={!enabled ? undefined : onClick}
            enabled={enabled}
            className="document-button"
        >
            <FileIcon />
            {!minimal && <span>Document</span>}
        </AttachmentButton>
    );
};

export const ShortcutsButton = () => {
    return (
        <AttachmentButton enabled className="shortcuts-button" onClick={showShortcutsHelp}>
            <ShortcutsIcon />
            <span>Shortcuts</span>
        </AttachmentButton>
    );
};

export const AttachmentButtons = ({ enabled }: { enabled?: boolean }) => {
    const fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    const { handleDrop } = React.useContext(UploadContext);
    const fileSelector = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleInputChange = (e: any) => {
        handleDrop(e.target.files[0]);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    return (
        <XHorizontal separator="none">
            <FileInput type="file" innerRef={fileInput} onChange={handleInputChange} />
            <PhotoButton enabled={enabled} onClick={!enabled ? undefined : fileSelector} />
            <DocumentButton enabled={enabled} onClick={!enabled ? undefined : fileSelector} />
            <ShortcutsButton />
        </XHorizontal>
    );
};
