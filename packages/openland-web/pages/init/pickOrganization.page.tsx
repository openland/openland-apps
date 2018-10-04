import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { withMyOrganizations } from '../../api/withMyOrganizations';
import { XTable } from 'openland-x/XTable';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { withQueryLoader } from '../../components/withQueryLoader';

export default withAppBase('Pick Org', withMyOrganizations(withQueryLoader((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.pick_organization.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Pick Organization">
                <MessagePage>
                    <MessagePageContent title={InitTexts.pick_organization.title}>
                        <XTable>
                            <XTable.Body>
                                {props.data.myOrganizations.map((v) => (
                                    <XTable.Row onClick={() => switchOrganization(v.id, props.router.query.redirect)}>
                                        <XTable.Cell>
                                            {v.name}
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
})));