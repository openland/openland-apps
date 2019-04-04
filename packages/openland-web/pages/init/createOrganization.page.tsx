import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/UserInfo';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { delayForewer } from 'openland-y-utils/timer';
import {
    WebSignUpContainer,
    RoomSignupContainer,
    CreateOrganizationFormInner,
} from './components/SignComponents';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import * as Cookie from 'js-cookie';
import { useIsMobile } from 'openland-web/hooks';
import { withRouter } from 'openland-x-routing/withRouter';
import { useClient } from 'openland-web/utils/useClient';

const OrganizationsSelectorOptionsFetcher = (props: {
    children: any;
    variables: {
        all: boolean;
        prefix: string;
        sort: string;
    };
}) => {
    const client = useClient();

    const data = client.useWithoutLoaderExploreOrganizations(
        props.variables,
        //     {
        //     fetchPolicy: 'network-only',
        // }
    );

    if (!data) {
        return null;
    }

    const children = props.children as Function;

    return (
        <>
            {children({
                data:
                    !data || !data.items
                        ? []
                        : data.items.edges
                              .filter(({ node }: any) => {
                                  return node.status === 'activated';
                              })
                              .map(({ node: { id, name } }: any) => {
                                  return { value: id, label: name };
                              }),
                loading: false,
            })}
        </>
    );
};

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
        const { organizations, roomView, onPrefixChanges, createOrganization, router } = this.props;

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
                                name: data.name,
                                id: data.id,
                            },
                        },
                    });
                    switchOrganization(res.data.organization.id, router.query.redirect);
                    await delayForewer();
                }}
            />
        );
    }
}

class CreateOrganizationPrefixHolderRoot extends React.Component<
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
        const roomView = this.props.roomView || Cookie.get('x-openland-invite');
        return (
            <OrganizationsSelectorOptionsFetcherInnerAny
                {...{
                    ...this.props,
                    roomView,
                    organizations,
                    onPrefixChanges: this.onPrefixChanges,
                }}
            />
        );
    };

    render() {
        const props = this.props;
        const roomView = props.roomView;

        const Container = roomView ? RoomSignupContainer : WebSignUpContainer;

        return (
            <Container pageMode="CreateOrganization">
                <OrganizationsSelectorOptionsFetcher
                    variables={{
                        all: true,
                        prefix: this.state.organizationPrefix,
                        sort: JSON.stringify([
                            { featured: { order: 'desc' } },
                            { createdAt: { order: 'desc' } },
                        ]),
                    }}
                >
                    {this.renderOrganizationsSelectorOptionsFetcherInner}
                </OrganizationsSelectorOptionsFetcher>
            </Container>
        );
    }
}

const CreateOrganizationPrefixHolder = (props: any) => {
    const client = useClient();
    let roomView = Cookie.get('x-openland-invite') || false;
    const [isMobile] = useIsMobile();

    if (isMobile) {
        roomView = false;
    }

    const createOrganization = async ({ variables }: { variables: any }) => {
        await client.mutateCreateOrganization(variables);
    };

    return (
        <CreateOrganizationPrefixHolderRoot
            {...props}
            roomView={roomView}
            createOrganization={createOrganization}
        />
    );
};

export const CreateOrganizationForm = withRouter(withUserInfo(CreateOrganizationPrefixHolder));

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
