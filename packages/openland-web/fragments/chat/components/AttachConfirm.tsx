import * as React from 'react';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DocumentContent } from '../messenger/message/content/DocumentContent';
import { pluralForm } from 'openland-y-utils/plural';
import AlertBlanket from 'openland-x/AlertBlanket';
import { css, cx } from 'linaria';
import { XModalController } from 'openland-x/showModal';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { UploadCareUploading } from 'openland-web/utils/UploadCareUploading';
import { LocalImage } from 'openland-engines/messenger/types';
import AttachIcon from 'openland-icons/s/ic-attach-24-1.svg';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import DonationIcon from 'openland-icons/s/ic-donation-24.svg';
import { TextTitle1 } from 'openland-web/utils/TextStyles';

const imgClass = css`
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    align-self: center;
    cursor: pointer;
`;

const titleClass = css`
    padding: 20px 24px;
`;

let Img = React.memo((props: { file: File; onClick: (f: File) => void, onLoad: (img: LocalImage) => void, index: number; }) => {
    let ref = React.useRef<HTMLImageElement>(null);
    React.useEffect(() => {
        let reader = new FileReader();
        let image = new Image();
        image.onload = () => {
            const layout = layoutMedia(image.width || 0, image.height || 0, 392, 392, 32, 32);
            if (ref.current) {
                ref.current.src = reader.result as any;
                ref.current.width = layout.width;
                ref.current.height = layout.height;
                props.onLoad({ index: props.index, src: (reader.result as string), width: image.width, height: image.height });
            }
        };
        reader.onloadend = () => {
            image.src = reader.result as any;
        };
        reader.readAsDataURL(props.file);
    }, []);
    return <img className={imgClass} ref={ref} onClick={() => props.onClick(props.file)} />;
});

const Body = (props: { files: File[][]; onImageLoad: (img: LocalImage) => void; ctx: XModalController }) => {
    let { files, onImageLoad } = props;
    let [bodyFiles, setFiles] = React.useState(files[0]);

    // workaround - somehow DocumentContent is not recreating
    let filesRef = React.useRef(bodyFiles);

    filesRef.current = bodyFiles;
    let onClick = React.useCallback(
        (fileToRemove: File) => {
            let res = filesRef.current.filter(f => f !== fileToRemove);
            setFiles(res);
            files[0] = res;
            if (!res.length) {
                props.ctx.hide();
            }
        },
        [bodyFiles],
    );
    let hasPhoto = false;
    let hasFiles = false;
    let list = bodyFiles.map((f, i) => {
        let isImage = f.type.includes('image');
        hasPhoto = hasPhoto || isImage;
        hasFiles = hasFiles || !isImage;
        if (isImage) {
            return <Img key={f.name + f.size + f.lastModified} file={f} onClick={onClick} index={i} onLoad={onImageLoad} />;
        } else {
            return (
                <div
                    key={f.name + f.size + f.lastModified}
                    style={{ marginTop: 16, marginBottom: 16 }}
                >
                    <DocumentContent
                        onClick={() => onClick(f)}
                        file={{ fileMetadata: { name: f.name, size: f.size, mimeType: null } }}
                    />
                </div>
            );
        }
    });

    let title = `Share ${
        hasPhoto && !hasFiles
            ? pluralForm(bodyFiles.length, ['a photo', bodyFiles.length + ' photos'])
            : pluralForm(bodyFiles.length, ['a file', bodyFiles.length + ' files'])
        }`;

    return (
        <>
            <span className={cx(TextTitle1, titleClass)}>{title}</span>
            <XScrollView3 maxHeight={500} paddingHorizontal={24} useDefaultScroll={true}>
                {list}
                <div style={{ height: 16 }} />
            </XScrollView3>
        </>
    );
};

const MAX_FILE_SIZE = 1e8;
export const showAttachConfirm = (
    files: File[],
    callback: (files: { file: UploadCareUploading, localImage?: LocalImage }[]) => void,
    onFileUploadingProgress?: (filename?: string) => void,
    onFileUploadingEnd?: () => void,
) => {
    let tooBig = false;
    let filesFiltered = files.filter(f => {
        let b = f.size > MAX_FILE_SIZE;
        tooBig = tooBig || b;
        return !b;
    });

    let filesRes = [[...filesFiltered]];
    const uploading = filesFiltered.map(f => new UploadCareUploading(f));

    let loadedImages: LocalImage[] = [];
    let saveImage = (img: LocalImage) => {
        loadedImages[img.index] = img;
    };

    if (filesFiltered.length > 0) {
        AlertBlanket.builder()
            .body(ctx => <Body files={filesRes} onImageLoad={saveImage} ctx={ctx} />)
            .action('Send', async () => {
                await callback(uploading.map((u, i) => ({ file: u, localImage: loadedImages[i] })).filter(({ file }) => filesRes[0].includes(file.getSourceFile())));

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

            })
            .show();
    }

    if (tooBig) {
        AlertBlanket.alert('Files bigger than 100mb are not supported yet.');
    }
};

const attachButtonContainer = css`
    flex-shrink: 0;
`;

const AttachMenu = (props: { ctx: UPopperController, hideDonation: boolean, onAttachClick: () => void, onDonationClick: () => void }) => {
    let builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Photo or video',
        icon: <MediaIcon />,
        onClick: props.onAttachClick,
    });
    builder.item({
        title: 'Document',
        icon: <FileIcon />,
        onClick: props.onAttachClick,
    });
    if (!props.hideDonation) {
        builder.item({
            title: 'Donation',
            icon: <DonationIcon />,
            onClick: props.onDonationClick,
        });
    }

    return builder.build(props.ctx, 200);
};

interface AttachConfirmButtonProps {
    hideDonation: boolean;
    onAttachClick: () => void;
    onDonationClick: () => void;
}

export const AttachConfirmButton = (props: AttachConfirmButtonProps) => {
    const [active, show] = usePopper({ placement: 'top-start' }, ctx => <AttachMenu ctx={ctx} onAttachClick={props.onAttachClick} onDonationClick={props.onDonationClick} hideDonation={props.hideDonation} />);

    return (
        <div className={attachButtonContainer}>
            <UIconButton active={active} icon={<AttachIcon />} onClick={show} />
        </div>
    );
};
