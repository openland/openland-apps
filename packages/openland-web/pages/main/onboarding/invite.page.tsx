import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { Scaffold } from '../../../components/Scaffold';
import { XSContainer } from 'openland-xs/XSContainer';
import { XSDialog } from 'openland-xs/XSDialog';
import { XSDialogTitle } from 'openland-xs/XSDialogTitle';
import { XButton } from 'openland-x/XButton';
import { XSNaivgationView } from 'openland-xs/XSNavigationView';

export default withApp('Invite', 'viewer', () => {
    return (
        <Scaffold>
            <Scaffold.Content>
                <XSContainer>
                    <XSDialog>
                        <XSDialogTitle>Invite people</XSDialogTitle>
                        <XSNaivgationView />
                        {/* <XButton text="Invite to my organization" />
                        <XButton text="Invite other organization" /> */}
                    </XSDialog>
                </XSContainer>
            </Scaffold.Content>
        </Scaffold>
    );
});