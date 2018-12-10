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
    WebSignUpContainer,
    RoomSignupContainer,
    CreateOrganizationFormInner,
} from './components/SignComponents';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withExploreOrganizations } from '../../api/withExploreOrganizations';
import * as Cookie from 'js-cookie';

const OrganizationsSelectorOptionsFetcher = withExploreOrganizations(props => {
    const children = props.children as Function;

    return (
        <>
            {children({
                data:
                    !props.data || !props.data.items
                        ? []
                        : props.data.items.edges.map(
                              ({ node: { id, name } }: any) => {
                                  return { value: id, label: name };
                              },
                          ),
                loading: false,
            })}
        </>
    );
});

class OrganizationsSelectorOptionsFetcherInner extends React.Component<
    {
        organizations: any;
        roomView: any;
        onPrefixChanges: any;
        createOrganization: any;
        router: any;
    },
    {
        lastLoadedOrganizations: any;
    }
> {
    componentWillReceiveProps(nextProps: any) {
        this.setState({
            lastLoadedOrganizations: nextProps.organizations,
        });
    }

    render() {
        const {
            organizations,
            roomView,
            onPrefixChanges,
            createOrganization,
            router,
        } = this.props;

        const fetchedOrPrevOrganizations = organizations.loading
            ? this.state.lastLoadedOrganizations
            : organizations;
        return (
            <CreateOrganizationFormInner
                organizations={fetchedOrPrevOrganizations}
                onPrefixChanges={onPrefixChanges}
                roomView={roomView}
                defaultAction={async (data: any) => {
                    let res = await createOrganization({
                        variables: {
                            input: {
                                personal: false,
                                name: data.input.name,
                                website: data.input.website,
                                photoRef: sanitizeIamgeRef(data.input.photoRef),
                            },
                        },
                    });
                    switchOrganization(
                        res.data.createOrganization.id,
                        router.query.redirect,
                    );
                    await delayForewer();
                }}
            />
        );
    }
}

class CreateOrganizationPrefixHolder extends React.Component<
    any,
    { organizationPrefix: string; lastLoadedOrganizations: any[] }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            organizationPrefix: '',
            lastLoadedOrganizations: [],
        };
    }

    onPrefixChanges = (organizationPrefix: any) => {
        this.setState({
            organizationPrefix,
        });
    };

    renderOrganizationsSelectorOptionsFetcherInner = (organizations: any) => {
        const OrganizationsSelectorOptionsFetcherInnerAny = OrganizationsSelectorOptionsFetcherInner as any;
        return (
            <OrganizationsSelectorOptionsFetcherInnerAny
                {...{
                    ...this.props,
                    organizations,
                    onPrefixChanges: this.onPrefixChanges,
                }}
            />
        );
    };

    render() {
        const props = this.props;
        const roomView = props.roomView || Cookie.get('x-openland-invite');

        const Container = roomView ? RoomSignupContainer : WebSignUpContainer;

        return (
            <Container>
                <OrganizationsSelectorOptionsFetcher
                    variables={{
                        prefix: this.state.organizationPrefix,
                        sort: JSON.stringify([]),
                    }}
                >
                    {this.renderOrganizationsSelectorOptionsFetcherInner}
                </OrganizationsSelectorOptionsFetcher>
            </Container>
        );
    }
}

export const CreateOrganizationForm = withCreateOrganization(
    withRouter(withUserInfo(CreateOrganizationPrefixHolder)),
);

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
