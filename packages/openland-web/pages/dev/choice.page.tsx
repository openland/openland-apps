import * as React from 'react';
import { withApp } from '../../components/withApp';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';
import { SuperAdminRole } from 'openland-api/spacex.types';
import { XView } from 'react-mental';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { showModalBox } from 'openland-x/showModalBox';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { TextLabel1, TextTitle1, TextLabel2 } from 'openland-web/utils/TextStyles';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    const client = useClient();
    const superAdmins = client.useSuperAdmins().superAdmins;
    return (
        <DevToolsScaffold title="Super Admins">
            <XView flexDirection="row" alignItems="center">
                <XView flexGrow={1}>
                    <span className={TextTitle1}>Super Admins</span>
                    <span className={TextLabel2}>{superAdmins.length + ' total'}</span>
                </XView>
            </XView>
            <XScrollView3>
                <XView maxWidth={600}>
                    choice
                </XView>
            </XScrollView3>
        </DevToolsScaffold>
    );
});
