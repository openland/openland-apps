import * as React from 'react';
import { DirectoryNavigation } from './components/DirectoryNavigation';
import { withApp } from 'openland-web/components/withApp';

export default withApp('Communities', 'viewer', () => {
    return <DirectoryNavigation>stub</DirectoryNavigation>;
});
