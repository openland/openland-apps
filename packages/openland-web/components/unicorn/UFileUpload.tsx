import * as React from 'react';
import * as UploadCare from 'uploadcare-widget';

export interface UFileUploadRenderProps {
    dataTestId?: string;
    doUpload: () => void;
    doClear: () => void;
    isLoading: boolean;
    progress: number;
    value?: UploadedFile | null;
}

export interface UImageCropT {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface UUploadCareImageCrop {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface UFileUploadProps {
    dataTestId?: string;
    component: React.ComponentType<UFileUploadRenderProps>;
    cropParams?: string;

    value?: UploadedFile | null;
    onChange?: (file: UploadedFile | null) => void;

    initialUrl?: string | null;

    imageOnly?: boolean;
}

export interface UploadedFile {
    isImage: boolean;
    uuid: string;
    crop: UUploadCareImageCrop | null;
    width: number | null;
    height: number | null;
    name: string | null;
    size: string | null;
}

export const UFileUpload = (props: UFileUploadProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<UploadedFile | null>(props.value || null);
    const [progress, setProgress] = React.useState<number>(0);

    const doStartUpload = (file: UploadCare.File) => {
        setIsLoading(true);
        file.progress(p => {
            setProgress(p.progress);
        });
        file.done(f => {
            let fileu: UploadedFile = {
                isImage: f.isImage,
                uuid: f.uuid,
                crop: f.crop ? f.crop : null,
                width: (f.originalImageInfo && f.originalImageInfo.width) || null,
                height: (f.originalImageInfo && f.originalImageInfo.height) || null,
                name: f.name,
                size: f.size,
            };
            setIsLoading(false);
            setProgress(1);
            setValue(fileu);
            if (props.onChange) {
                props.onChange(fileu);
            }
        });
    };

    const doUpload = () => {
        let file = value;
        let uploaded = file
            ? UploadCare.fileFrom(
                  'uploaded',
                  file.crop
                      ? 'https://ucarecdn.com/' +
                        file.uuid +
                        `/-/crop/${file.crop.width}x${file.crop.height}/${file.crop.left},${
                            file.crop.top
                        }/`
                      : file.uuid,
              )
            : null;
        let dialog = UploadCare.openDialog(uploaded, {
            publicKey: 'b70227616b5eac21ba88',
            imagesOnly: props.imageOnly !== false,
            crop: props.cropParams,
            imageShrink: '1024x1024',
        });
        dialog.done(r => {
            doStartUpload(r);
        });
    };

    const doClear = () => {
        setIsLoading(false);
        setValue(null);
        if (props.onChange) {
            props.onChange(null);
        }
    };

    const Component = props.component;

    return (
        <Component
            dataTestId={props.dataTestId}
            value={value}
            isLoading={isLoading}
            doClear={doClear}
            doUpload={doUpload}
            progress={progress}
        />
    );
};