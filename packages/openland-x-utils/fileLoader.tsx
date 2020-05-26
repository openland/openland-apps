import * as React from 'react';

export const fileLoader = (src?: string | null, abort?: boolean) => {
    const [progress, setProgress] = React.useState(0);
    const [fileUrl, setFileUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        const xhr = new XMLHttpRequest();
        if (src) {
            xhr.responseType = 'blob';
            xhr.onprogress = (event) => {
                setProgress(Math.round((event.loaded / event.total) * 100));
            };
            xhr.onload = () => {
                if (xhr.status === 200) {
                    setFileUrl(window.URL.createObjectURL(xhr.response));
                }
            };
            xhr.open('GET', src, true);
            xhr.send();
        } else {
            xhr.abort();
        }
    }, [src]);

    return [progress, fileUrl] as [number, string | undefined | null];
};
