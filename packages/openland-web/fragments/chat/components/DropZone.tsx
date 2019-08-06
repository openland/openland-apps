import * as React from 'react';
import { css } from 'linaria';
import IconUpload from 'openland-icons/s/ic-drop-72.svg';
import { TextTitle1 } from 'openland-web/utils/TextStyles';

const dropZoneClass = css`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.92);
    color: #969AA3; // ThemeDefault.foregroundTertiary
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: color 250ms cubic-bezier(.29, .09, .24, .99);
`;

const iconContainer = css`
    position: relative;
    display: flex;
    background-color: #969AA3; // ThemeDefault.foregroundTertiary
    color: #1885F2; // ThemeDefault.foregroundTertiary
    height: 72px;
    border-radius: 72px;
    margin-bottom: 24px;
    transition: background-color 250ms cubic-bezier(.29, .09, .24, .99);
`;

const iconContainerAnim = css`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #1885F2; // ThemeDefault.foregroundTertiary
    opacity: 0;
    height: 72px;
    border-radius: 72px;
    transform: scale(1);
    z-index: 2;
    transition: transform 300ms ease, opacity 150ms cubic-bezier(.29, .09, .24, .99);
`;
export const DropZone = (props: { onDrop: (files: File[]) => void }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const iconContainerRef = React.useRef<HTMLDivElement>(null);
    const iconContainerAnimRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let pendingClose = false;
        let onDragStart = (ev: any) => {
            if (ev.dataTransfer.types[0] !== 'Files') {
                return;
            }
            pendingClose = false;
            ev.preventDefault();
            if (containerRef.current) {
                containerRef.current.style.display = 'flex';
            }
        };

        let onDropWindow = (ev: any) => {
            ev.preventDefault();
        };
        let onDragEnd = () => {
            pendingClose = true;
            setTimeout(() => {
                if (pendingClose && containerRef.current) {
                    containerRef.current.style.display = 'none';
                }
            }, 50);
        };
        window.addEventListener('dragover', onDragStart);
        window.addEventListener('dragstart', onDragStart);

        window.addEventListener('drop', onDropWindow);

        window.addEventListener('dragend', onDragEnd);
        window.addEventListener('dragexit', onDragEnd);
        window.addEventListener('mouseout', onDragEnd);
        return () => {
            window.removeEventListener('dragover', onDragStart);
            window.removeEventListener('dragstart', onDragStart);

            window.removeEventListener('drop', onDropWindow);

            window.removeEventListener('dragend', onDragEnd);
            window.removeEventListener('dragexit', onDragEnd);
            window.removeEventListener('mouseout', onDragEnd);

        };
    }, []);

    const onDragOver = React.useCallback((ev: React.DragEvent) => {
        if (containerRef.current) {
            containerRef.current.style.color = '#000';
        }
        if (iconContainerRef.current) {
            iconContainerRef.current.style.backgroundColor = '#1885F2';
        }
        if (iconContainerAnimRef.current) {
            iconContainerAnimRef.current.style.transform = 'scale(1.2)';
            iconContainerAnimRef.current.style.opacity = '0.5';
        }

    }, []);
    const onDragLeave = React.useCallback(() => {
        if (containerRef.current) {
            containerRef.current.style.color = '#969AA3';
        }
        if (iconContainerRef.current) {
            iconContainerRef.current.style.backgroundColor = '#969AA3';
        }
        if (iconContainerAnimRef.current) {
            iconContainerAnimRef.current.style.transform = 'scale(1)';
            iconContainerAnimRef.current.style.opacity = '0';
        }
    }, []);

    const onDrop = React.useCallback((ev: React.DragEvent) => {
        let files: FileList | undefined = ev.dataTransfer.files;
        if (files && files.length && props.onDrop) {
            let res = [];
            for (let i = 0; i < files.length; i++) {
                res.push(files[i]);
            }
            props.onDrop(res);
        }
    }, []);
    return (
        <div ref={containerRef} className={dropZoneClass} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>

            <div ref={iconContainerRef} className={iconContainer}>
                <div ref={iconContainerAnimRef} className={iconContainerAnim} />
                <IconUpload style={{ zIndex: 3 }} />
            </div>
            <div className={TextTitle1}>Drop here to send</div>
        </div>
    );
};