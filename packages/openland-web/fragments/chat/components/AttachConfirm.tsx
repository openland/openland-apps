import * as React from 'react';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DocumentContent } from '../messenger/message/content/DocumentContent';
import { pluralForm } from 'openland-y-utils/plural';
import AlertBlanket from 'openland-x/AlertBlanket';
import { css } from 'linaria';
import { XModalController } from 'openland-x/showModal';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { UploadCareUploading } from 'openland-web/utils/UploadCareUploading';

const imgClass = css`
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
`;

const titleClass = css`
    padding-top: 30px;
    padding-bottom: 20px;
    padding-left: 40px;
    font-weight: 600;
    font-size: 36px;
`;

let Img = React.memo((props: { file: File, onClick: (f: File) => void }) => {
    let ref = React.useRef<HTMLImageElement>(null);
    React.useEffect(() => {
        let reader = new FileReader();
        let image = new Image();
        image.onload = () => {
            const layout = layoutMedia(
                image.width || 0,
                image.height || 0,
                680,
                360,
                32,
                32,
            );
            if (ref.current) {
                ref.current.src = reader.result as any;
                ref.current.width = layout.width;
                ref.current.height = layout.height;
            }
        };
        reader.onloadend = () => {
            image.src = reader.result as any;

        };
        reader.readAsDataURL(props.file);
    }, []);
    return <img className={imgClass} ref={ref} onClick={() => props.onClick(props.file)} />;
});

const Body = (props: { files: File[][], ctx: XModalController }) => {
    let { files } = props;
    let [bodyFiles, setFiles] = React.useState(files[0]);

    // workaround - somehow DocumentContent is not recreating
    let filesRef = React.useRef(bodyFiles);

    filesRef.current = bodyFiles;
    let onClick = React.useCallback((fileToRemove: File) => {
        let res = filesRef.current.filter(f => f !== fileToRemove);
        setFiles(res);
        files[0] = res;
        if (!res.length) {
            props.ctx.hide();
        }
    }, [bodyFiles]);
    let hasPhoto = false;
    let hasFiles = false;
    let list = bodyFiles.map((f, i) => {

        let isImage = f.type.includes('image');
        hasPhoto = hasPhoto || isImage;
        hasFiles = hasFiles || !isImage;
        if (isImage) {
            return <Img key={f.name + f.size + f.lastModified} file={f} onClick={onClick} />;
        } else {
            return <div key={f.name + f.size + f.lastModified} style={{ marginTop: 16, marginBottom: 16 }}><DocumentContent onClick={() => onClick(f)} file={{ fileMetadata: { name: f.name, size: f.size } }} /></div>;
        }

    });

    let title = `Share ${hasPhoto && !hasFiles ? pluralForm(bodyFiles.length, ['a photo', bodyFiles.length + ' photos']) : pluralForm(bodyFiles.length, ['a file', bodyFiles.length + ' files'])}`;

    return (
        <>
            <span className={titleClass}>{title}</span>
            <XScrollView3 maxHeight={500} paddingHorizontal={40} >
                {list}
                <div style={{ height: 16 }} />
            </XScrollView3>
        </>
    );
};

export const showAttachConfirm = (files: File[], callback: (files: UploadCareUploading[]) => void) => {
    let filesRes = [[...files]];
    const uploading = files.map(f => new UploadCareUploading(f));

    AlertBlanket
        .builder()
        .body(ctx => <Body files={filesRes} ctx={ctx} />)
        .action('Send', async () => { await callback(uploading.filter(u => filesRes[0].includes(u.getSourceFile()))); })
        .show();
};