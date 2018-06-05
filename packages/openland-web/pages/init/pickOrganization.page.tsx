import '../../globals';
import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { withDebugAccounts } from '../../api';
import { XTable } from 'openland-x/XTable';
import * as Cookie from 'js-cookie';

function pickOrganization(id: string) {
    Cookie.set('x-openland-org', id);
    window.location.href = '/';
}

export default withAppBase(withDebugAccounts((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="Organization?" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Pick Organization">
                <MessagePage>
                    <MessagePageContent title="Please, pick organization">
                        <XTable>
                            <XTable.Body>
                                {props.data.orgs.map((v) => (
                                    <XTable.Row onClick={() => pickOrganization(v.id)}>
                                        <XTable.Cell>
                                            {v.title}
                                        </XTable.Cell>
                                    </XTable.Row>
                                ))}
                            </XTable.Body>
                        </XTable>
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
}));