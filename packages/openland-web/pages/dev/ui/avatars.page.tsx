import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { UploadedFile } from 'openland-x/files/XFileUpload';

const AvatarComponent = () => {
    const [newPhoto, setNewPhoto] = React.useState<UploadedFile | null>(null);

    const onChange = (file: UploadedFile) => {
        // console.log(file);
        setNewPhoto(file);
    };

    return (
        <XAvatarUpload
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
