import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withApp } from '../../components/withApp';
import { withCreateOrganization } from '../../api/withCreateOrganization';
import { withRouter } from 'next/router';
import { withUserInfo } from '../../components/UserInfo';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { delayForewer } from 'openland-y-utils/timer';
import { sanitizeIamgeRef } from '../../utils/sanitizer';
import {
    SignContainer,
    RoomSignup,
    CreateOrganizationFormInner,
} from './components/SignComponents';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

const OrganizationsSelectorOptionsFetcher = withExploreOrganizations(
    withQueryLoader(props => {
        const children = props.children as Function;
        return (
            <>
                {children(
                    props.data.items!!.edges.map(
                        ({ node: { id, name } }: any) => {
                            return { value: id, label: name };
                        },
                    ),
                )}
            </>
        );
    }),
);

export const CreateOrganizationForm = withCreateOrganization(
    withRouter(
        withUserInfo((props: any) => {
            const roomView = props.roomView;
            const Container = roomView ? RoomSignup : SignContainer;

            return (
                <Container>
                    <OrganizationsSelectorOptionsFetcher
                        variables={{
                            prefix: '',
                            sort: JSON.stringify([]),
                        }}
                    >
                        {(organizations: any) => (
                            <CreateOrganizationFormInner
                                organizations={organizations}
                                roomView={roomView}
                                defaultAction={async (data: any) => {
                                    let res = await props.createOrganization({
                                        variables: {
                                            input: {
                                                personal: false,
                                                name: data.input.name,
                                                website: data.input.website,
                                                photoRef: sanitizeIamgeRef(
                                                    data.input.photoRef,
                                                ),
                                            },
                                        },
                                    });
                                    switchOrganization(
                                        res.data.createOrganization.id,
                                        props.router.query.redirect,
                                    );
                                    await delayForewer();
                                }}
                            />
                        )}
                    </OrganizationsSelectorOptionsFetcher>
                </Container>
            );
        }),
    ),
);

import { withExploreOrganizations } from '../../api/withExploreOrganizations';
import { withQueryLoader } from '../../components/withQueryLoader';

export default withApp('Create Organization', 'viewer', props => {
    if (!canUseDOM) {
        return (
            <XDocumentHead
                title={InitTexts.create_organization.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
        );
    }
    return (
        <>
            <XDocumentHead
                title={InitTexts.create_organization.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <CreateOrganizationForm />
        </>
    );
});
