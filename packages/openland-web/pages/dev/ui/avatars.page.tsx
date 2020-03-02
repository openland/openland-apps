import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UploadedFile } from 'openland-web/components/unicorn/UFileUpload';
import { UAvatarUploadBasic } from 'openland-web/components/unicorn/UAvatarUpload';

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

export default withApp('Avatars', ['super-admin', 'software-developer'], props => {
    return (
        <DevDocsScaffold title="Avatars">
            <AvatarComponent />
        </DevDocsScaffold>
    );
});
