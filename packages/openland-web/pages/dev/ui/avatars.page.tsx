import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UAvatarUploadBasic } from 'openland-web/components/unicorn/UAvatarUpload';
import { UploadedFile } from 'openland-x/files/XFileUpload';

const AvatarComponent = () => {
    const [newPhoto, setNewPhoto] = React.useState<UploadedFile | null>(null);

    const onChange = (file: UploadedFile) => {
        setNewPhoto(file);
    };

    return (
        <UAvatarUploadBasic
            cropParams="1:1"
            onChange={onChange}
            value={newPhoto}
        />
    );
};

export default withApp('Avatars', 'viewer', props => {
    return (
        <DevDocsScaffold title="Avatars">
            <AvatarComponent />
        </DevDocsScaffold>
    );
});
