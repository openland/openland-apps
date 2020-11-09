import * as React from 'react';
import { DocumentContent } from '../messenger/message/content/DocumentContent';
import { plural } from 'openland-y-utils/plural';
import AlertBlanket from 'openland-x/AlertBlanket';
import { css, cx } from 'linaria';
import { XModalController } from 'openland-x/showModal';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { UploadCareUploading, isFileImage } from 'openland-web/utils/UploadCareUploading';
import { LocalImage } from 'openland-engines/messenger/types';
import AttachIcon from 'openland-icons/s/ic-attach-24-1.svg';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import DonationIcon from 'openland-icons/s/ic-donation-24.svg';
import ClearIcon from 'openland-icons/s/ic-clear-16.svg';
import CloseIcon from 'openland-icons/s/ic-close-24.svg';
import { TextTitle1 } from 'openland-web/utils/TextStyles';
import { XView } from 'react-mental';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { fileListToArray } from './DropZone';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { AutoCompleteComponent, AutoCompleteComponentRef, useInputAutocompleteHanlders } from './SendMessageComponent';
import { URickInput, URickInputInstance, URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { extractTextAndMentions } from 'openland-web/utils/convertTextAndMentions';
import { MAX_FILES_PER_MESSAGE, MentionToSend } from 'openland-engines/messenger/MessageSender';
import { UToast } from 'openland-web/components/unicorn/UToast';
import { useClient } from 'openland-api/useClient';
import { RoomPico_room_PrivateRoom, RoomPico_room_SharedRoom } from 'openland-api/spacex.types';

const MAX_FILE_SIZE = 1e8;

const imgClass = css`
    position: relative;
    border-radius: 8px;
    flex: 1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    &:not(:last-child) {
        margin-bottom: 16px;
    }
`;

const titleClass = css`
    position: relative;
    padding: 20px 24px;
`;

const imageColumn = css`
    height: 240px;
    flex: 1;

    &:not(:last-child) {
        margin-right: 16px;
    }
`;

const clearContainerStyle = css`
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

const clearContainerIconStyle = css`
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

const docStyle = css`
    pointer-events: none;
`;

const docCloseStyle = css`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
`;

const mentionsStyle = css`
    max-height: 140px;
    left: 24px;
    right: 24px;
    && {
        bottom: 100%;
    }
`;

const inputStyle = css`
    max-height: 250px;
`;

const toastStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const useAttachButtonHandlers = (props: { onAttach: (files: File[], isImage: boolean) => void }) => {
    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const documentInputRef = React.useRef<HTMLInputElement>(null);
    const onAttachClick = React.useCallback((type: 'image' | 'document') => {
        if (type === 'image') {
            imageInputRef.current?.click();
        } else {
            documentInputRef.current?.click();
        }
    }, []);

    const onInputChange = (isImage: boolean) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onAttach) {
            props.onAttach(fileListToArray(e.target.files).filter(f => isImage ? isFileImage(f) : true), isImage);
        }
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
        if (documentInputRef.current) {
            documentInputRef.current.value = '';
        }
    };
    const inputElements = (
        <>
            <input
                ref={imageInputRef}
                type="file"
                accept="image/gif, image/jpeg, image/jpg, image/png, image/webp"
                multiple={true}
                style={{ display: 'none' }}
                onChange={onInputChange(true)}
            />
            <input
                ref={documentInputRef}
                type="file"
                multiple={true}
                style={{ display: 'none' }}
                onChange={onInputChange(false)}
            />
        </>
    );
    return {
        onAttachClick,
        inputElements,
    };
};

let Img = React.memo((props: {
    file: File;
    index: number;
    imagesCount: number;
    onClick: (f: File) => void,
    onLoad: (file: File, img: LocalImage) => void,
}) => {
    let ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let reader = new FileReader();
        let image = new Image();
        image.onload = () => {
            const layout = layoutMedia(image.width || 0, image.height || 0, 392, 392, 32, 32);
            if (ref.current) {
                ref.current.style.backgroundImage = `url(${reader.result})`;
                props.onLoad(props.file, { index: props.index, src: (reader.result as string), width: layout.width, height: layout.height });
            }
        };
        reader.onloadend = () => {
            image.src = reader.result as any;
        };
        reader.readAsDataURL(props.file);
    }, []);

    return (
        <div className={imgClass} ref={ref}>
            <div
                className={clearContainerStyle}
                onClick={(e) => {
                    e.stopPropagation();
                    props.onClick(props.file);
                }}
            >
                <div className={clearContainerIconStyle}>
                    <UIcon icon={<ClearIcon />} size={24} color="var(--foregroundContrast)" />
                </div>
            </div>
        </div>
    );
});

const Body = (props: {
    chatId?: string;
    isImage?: boolean;
    files: File[];
    addFile: (f: File) => string | File;
    removeFile: (f: File) => void;
    onImageLoad: (file: File, img: LocalImage) => void;
    onTextChange: (text: URickTextValue | undefined) => void;
    onFileTypeChange: (hasImages: boolean) => void;
    ctx: XModalController;
    confirm: () => void;
    errorText?: string;
}) => {
    let { files, addFile, removeFile, isImage, onImageLoad, onTextChange, onFileTypeChange } = props;
    let [bodyFiles, setFiles] = React.useState(files);
    let client = useClient();
    let [room, setRoom] = React.useState<RoomPico_room_PrivateRoom | RoomPico_room_SharedRoom | null>(null);
    let [errorText, setErrorText] = React.useState(props.errorText);

    React.useEffect(() => {
        (async () => {
            if (props.chatId) {
                setRoom((await client.queryRoomPico({ id: props.chatId })).room);
            }
        })();
    }, [props.chatId]);

    let onClick = React.useCallback(
        (fileToRemove: File) => {
            let res = bodyFiles.filter(f => f !== fileToRemove);
            if (!res.length) {
                props.ctx.hide();
            } else {
                setFiles(res);
                removeFile(fileToRemove);
            }
        },
        [bodyFiles],
    );
    let { documents, imageColumns } = bodyFiles.reduce((acc, f, i, { length }) => {
        if (isImage) {
            let el = <Img key={f.name + f.size + f.lastModified} file={f} onClick={onClick} index={i} imagesCount={bodyFiles.length} onLoad={onImageLoad} />;
            if (acc.imageColumns.length < 2) {
                acc.imageColumns.push([el]);
            } else if (i === 2) {
                acc.imageColumns[1].push(el);
            } else if (i === 3) {
                let prevLast = acc.imageColumns[1].pop();
                acc.imageColumns[0].push(prevLast!);
                acc.imageColumns[1].push(el);
            }
        } else {
            acc.documents.push(
                <div
                    key={f.name + f.size + f.lastModified}
                    style={{ position: 'relative', marginBottom: i !== length - 1 ? 16 : 0 }}
                >
                    <DocumentContent
                        className={docStyle}
                        file={{ fileMetadata: { name: f.name, size: f.size, mimeType: null } }}
                    />
                    <div className={docCloseStyle}>
                        <UIconButton icon={<CloseIcon />} color="var(--foregroundSecondary)" onClick={() => onClick(f)} />
                    </div>
                </div>
            );
        }
        return acc;
    }, { imageColumns: [] as (JSX.Element[])[], documents: [] as JSX.Element[] });

    let title = `Send ${plural(bodyFiles.length, ['item', 'items'])}`;
    const hasImages = imageColumns.length > 0;

    const handleAttach = (filesToAdd: File[]) => {
        let addedFiles = filesToAdd.map(addFile);
        let successfullyAdded = addedFiles.filter(x => typeof x !== 'string') as File[];
        let errors = addedFiles.filter(x => typeof x === 'string') as string[];
        if (errors.length > 0) {
            setErrorText(errors[0]);
        }
        setFiles(prevFiles => prevFiles.concat(successfullyAdded));
    };
    const { inputElements, onAttachClick } = useAttachButtonHandlers({ onAttach: handleAttach });
    let inputRef = React.useRef<URickInputInstance>(null);
    let suggestRef = React.useRef<AutoCompleteComponentRef>(null);
    const {
        prefixes,
        activeWord,
        onWordChange,
        onUserPicked,
        onEmojiPicked,
        onPressUp,
        onPressDown,
        onPressTab,
        onPressEnter,
    } = useInputAutocompleteHanlders({ inputRef, suggestRef });

    let handlePressEnter = () => {
        let handled = onPressEnter();
        if (handled) {
            return true;
        }
        return true;
    };

    useShortcuts([{
        keys: ['Escape'],
        callback: () => {
            if (suggestRef.current?.isActive()) {
                return false;
            }
            props.ctx.hide();
            return true;
        },
    }, {
        keys: ['Enter'],
        callback: (ev: KeyboardEvent) => {
            if (ev.shiftKey) {
                return;
            }
            if (activeWord && suggestRef.current?.isActive() && (activeWord.startsWith('@') || activeWord.startsWith(':'))) {
                return false;
            }
            props.confirm();
            return true;
        },
    }]);

    React.useEffect(() => {
        onFileTypeChange(hasImages);
    }, [documents, imageColumns]);

    return (
        <>
            <span className={cx(TextTitle1, titleClass)}>
                {title}
                <UToast
                    isVisible={!!errorText}
                    text={errorText}
                    autoclose={true}
                    className={toastStyle}
                    closeCb={() => setErrorText('')}
                />
            </span>
            <XView paddingHorizontal={24}>
                {imageColumns.length > 0 ? (
                    <XView flexDirection="row">
                        {imageColumns.map((column, i) => (
                            <div className={cx('x', imageColumn)} key={column.length + i}>
                                {column}
                            </div>
                        ))}
                    </XView>
                ) : documents}
            </XView>
            <XView flexDirection="row" paddingVertical={16} paddingHorizontal={24}>
                <XView flexShrink={0} marginRight={16}>
                    {inputElements}
                    <UIconButton icon={<AttachIcon />} onClick={() => onAttachClick(hasImages ? 'image' : 'document')} />
                </XView>
                <Deferred>
                    <AutoCompleteComponent
                        onSelected={onUserPicked}
                        onEmojiSelected={onEmojiPicked}
                        groupId={props.chatId}
                        activeWord={activeWord}
                        isChannel={!!(room?.__typename === 'SharedRoom' && room.isChannel)}
                        isPrivate={room?.__typename === 'PrivateRoom'}
                        ref={suggestRef}
                        containerClassName={mentionsStyle}
                    />
                </Deferred>
                <URickInput
                    ref={inputRef}
                    className={inputStyle}
                    placeholder="Add a note"
                    autofocus={true}
                    autocompletePrefixes={prefixes}
                    onAutocompleteWordChange={onWordChange}
                    onPressUp={onPressUp}
                    onPressDown={onPressDown}
                    onPressTab={onPressTab}
                    onPressEnter={handlePressEnter}
                    onFilesPaste={handleAttach}
                    onContentChange={onTextChange}
                />
            </XView>
        </>
    );
};

export const showAttachConfirm = ({
    files,
    chatId,
    isImage,
    onSubmit: callback,
    onFileUploadingProgress,
    onFileUploadingEnd,
    onCancel,
}: {
    files: File[],
    onSubmit: (files: { file: UploadCareUploading, localImage?: LocalImage }[], text: string | undefined, mentions: MentionToSend[] | undefined, hasImages: boolean) => void,
    chatId?: string,
    isImage?: boolean,
    onFileUploadingProgress?: (filename?: string) => void,
    onFileUploadingEnd?: () => void,
    onCancel?: () => void,
}) => {
    let tooBig = false;
    let filesRes = files.filter(f => {
        let b = f.size > MAX_FILE_SIZE;
        tooBig = tooBig || b;
        return !b;
    }).slice(0, MAX_FILES_PER_MESSAGE);
    let errorText = tooBig
        ? 'Files bigger than 100mb are not supported yet'
        : files.length > 4
            ? 'Maximum 4 attachments'
            : undefined;

    let uploading = filesRes.map(f => new UploadCareUploading(f));
    let addUpload = (file: File): string | File => {
        let isBig = file.size > MAX_FILE_SIZE;
        if (isBig) {
            return 'Files bigger than 100mb are not supported yet';
        }
        if (filesRes.length === 4) {
            return 'Maximum 4 attachments';
        }

        uploading.push(new UploadCareUploading(file));
        filesRes.push(file);
        return file;
    };
    let removeUpload = (file: File) => {
        filesRes = filesRes.filter(f => f !== file);
    };

    let imagesPreviews: Map<File, LocalImage> = new Map();
    let savePreview = (file: File, img: LocalImage) => {
        imagesPreviews.set(file, img);
    };
    let messageInfo: { hasImages: boolean, inputValue: URickTextValue | undefined } = { hasImages: false, inputValue: undefined };
    let setInputText = (inputValue: URickTextValue | undefined) => {
        messageInfo.inputValue = inputValue;
    };
    let setHasImages = (hasImages: boolean) => {
        messageInfo.hasImages = hasImages;
    };
    let isUploading = false;

    if (filesRes.length > 0) {
        let builder = AlertBlanket.builder()
            .width(528)
            .hideOnEscape(false)
            .confirmOnEnter(false)
            .body((ctx, confirm) => (
                <Body
                    chatId={chatId}
                    files={filesRes.slice()}
                    addFile={addUpload}
                    removeFile={removeUpload}
                    onImageLoad={savePreview}
                    onTextChange={setInputText}
                    onFileTypeChange={setHasImages}
                    ctx={ctx}
                    confirm={confirm}
                    errorText={errorText}
                    isImage={isImage}
                />
            ))
            .action('Send', async () => {
                if (isUploading) {
                    return;
                }
                isUploading = true;
                let uploadedFiles = uploading.filter(file => filesRes.includes(file.getSourceFile())).map((u, i) => ({ file: u, localImage: imagesPreviews.get(filesRes[i]) }));
                let { text, mentions } = messageInfo.inputValue ? extractTextAndMentions(messageInfo.inputValue) : { text: undefined, mentions: undefined };
                await callback(uploadedFiles, text, mentions, isImage === undefined ? messageInfo.hasImages : isImage);

                const { name } = await uploading[0].fetchInfo();

                // TODO watch all the uploadings, not just the first one
                uploading[0].watch(({ status }) => {
                    if (status === 0) {
                        if (onFileUploadingProgress) {
                            onFileUploadingProgress(name);
                        }
                    }
                    if (status === 2) {
                        if (onFileUploadingEnd) {
                            onFileUploadingEnd();
                        }
                    }
                });

            });
        if (onCancel) {
            builder.onCancel(onCancel);
        }
        builder.show();
    }
};

const attachButtonContainer = css`
    flex-shrink: 0;
`;

const AttachMenu = (props: { ctx: UPopperController, hideDonation: boolean, onAttachClick: (type: 'image' | 'document') => void, onDonationClick: () => void }) => {
    let builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Photo',
        icon: <MediaIcon />,
        onClick: () => props.onAttachClick('image'),
    });
    builder.item({
        title: 'Document or video',
        icon: <FileIcon />,
        onClick: () => props.onAttachClick('document'),
    });
    if (!props.hideDonation) {
        builder.item({
            title: 'Donation',
            icon: <DonationIcon />,
            onClick: props.onDonationClick,
        });
    }

    return builder.build(props.ctx, 206);
};

interface AttachConfirmButtonProps {
    hideDonation: boolean;
    onAttach: (files: File[], isImage: boolean) => void;
    onDonate: () => void;
}

export const AttachConfirmButton = (props: AttachConfirmButtonProps) => {
    const {
        onAttachClick,
        inputElements,
    } = useAttachButtonHandlers({ onAttach: props.onAttach });

    const [active, show] = usePopper({ placement: 'top-start' }, ctx => <AttachMenu ctx={ctx} onAttachClick={onAttachClick} onDonationClick={props.onDonate} hideDonation={props.hideDonation} />);

    return (
        <div className={attachButtonContainer}>
            {inputElements}
            <UIconButton active={active} icon={<AttachIcon />} onClick={show} />
        </div>
    );
};
