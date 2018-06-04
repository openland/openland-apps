import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XFileUpload } from './XFileUpload';

export interface XImageUploadProps {
    crop?: string;
    uuid?: string | null;
    onChanged?: (uuid: string | null) => void;
}

export function XImageUpload(props: XImageUploadProps) {
    return (
        <XFileUpload
            {...props}
            component={(rp) => {
                return (
                    <div style={{ paddingBottom: 8 }}>
                        <div>
                            <XButton onClick={rp.doUpload} loading={rp.isLoading} style="primary" text="Upload logo" />
                            {rp.uuid && <XButton onClick={rp.doClear} text="Remove logo" style="danger" />}
                        </div>
                        {rp.uuid && (
                            <div style={{ marginTop: 8, width: 200, height: 200 }}>
                                <XCloudImage src={rp.uuid} maxHeight={200} maxWidth={200} resize="fit" />
                            </div>
                        )}
                    </div>
                );
            }} />
    );
}