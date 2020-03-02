import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInput, UInputField } from 'openland-web/components/unicorn/UInput';
import { XView } from 'react-mental';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { useClient } from 'openland-api/useClient';
import { SuperAccounts_superAccounts } from 'openland-api/spacex.types';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { DataSource } from 'openland-y-utils/DataSource';
import { XLoader } from 'openland-x/XLoader';
import { XListView } from 'openland-web/components/XListView';

const AddAccountForm = ({ hide }: { hide: () => void }) => {
    const client = useClient();

    const form = useForm();
    const titleField = useField('input.title', '', form);

    const add = () =>
        form.doAction(async () => {
            await client.mutateSuperAccountAdd({
                title: titleField.value,
            });

            await client.refetchSuperAccounts();

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XView flexGrow={1}>
                <UInputField label="Organization Name" field={titleField} />
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton
                    text="Add"
                    style="primary"
                    size="large"
                    onClick={add}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

export const showAddAccountFormModal = () => {
    showModalBox(
        {
            title: 'Add new organization',
        },
        ctx => {
            return <AddAccountForm hide={ctx.hide} />;
        },
    );
};

const SearchInput = (props: { onClick: (data: string) => void }) => {
    const [value, searchHandler] = React.useState('');
    const searchField = (data: string) => {
        searchHandler(data);
    };
    const onClick = () => {
        props.onClick(value);
    };
    const clearSearch = () => {
        searchHandler('');
        props.onClick('');
    };
    return (
        <XView flexShrink={0} paddingHorizontal={24} flexDirection="row" alignItems="center">
            <XView marginRight={16} flexGrow={1}>
                <UInput value={value} onChange={searchField} label="search" />
            </XView>
            <UButton text="search" style="primary" onClick={onClick} />
            {value && (
                <XView marginLeft={16}>
                    <UButton text="clear search" onClick={clearSearch} />
                </XView>
            )}
        </XView>
    );
};

interface FilteredOptionsProps {
    orgsCurrentTab: SuperAccounts_superAccounts[];
    searchValue: string;
}

const FilteredOptions = (props: FilteredOptionsProps) => {
    let nodes = props.orgsCurrentTab;
    if (props.searchValue) {
        nodes = nodes.filter(o => o.title.toLowerCase().match(props.searchValue.toLowerCase()));
    }

    let ds = new DataSource(() => [], () => []);
    ds.initialize(nodes.map(v => ({ ...v, key: v.id })), true, true);
    let dsw = new DataSourceWindow(ds, 50);

    const renderLoading = React.useMemo(() => {
        return () => {
            return (
                <XView
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height={80}
                >
                    <XLoader loading={true} />
                </XView>
            );
        };
    }, []);

    let renderItem = (item: SuperAccounts_superAccounts & { key: string }) => {
        return (
            <XView maxWidth={600} flexDirection="row">
                <XView flexGrow={1}>
                    <UOrganizationView
                        organization={{
                            id: item.id,
                            name: item.title,
                            __typename: 'Organization',
                            photo: null,
                            shortname: null,
                            about: null,
                            isCommunity: false,
                            membersCount: 0,
                        }}
                    />
                </XView>
                <XView flexDirection="row" alignItems="center">
                    <UButton
                        path={'/super/orgs/' + item.id}
                        style="secondary"
                        text="Settings"
                        flexShrink={0}
                        size="small"
                    />
                    <UButton
                        path={'/directory/o/' + item.orgId}
                        style="secondary"
                        text="Profile"
                        flexShrink={0}
                        size="small"
                    />
                </XView>
            </XView>
        );
    };
    return (
        <XListView
            itemHeight={50}
            loadingHeight={200}
            dataSource={dsw}
            renderLoading={renderLoading}
            renderItem={renderItem}
        />
    );
};

export default withApp('Super Organizations', ['super-admin', 'software-developer'], () => {
    const [searchValue, setSearchValue] = React.useState('');
    const client = useClient();
    const orgs = client.useSuperAccounts().superAccounts;

    const router = useXRouter();
    const orgsCurrentTab = orgs
        .filter(o => o.state === (router.query.orgState || 'ACTIVATED'))
        .sort((a, b) => {
            let date1 = new Date(a.createdAt || '');
            let date2 = new Date(b.createdAt || '');
            return date2 > date1 ? 1 : -1;
        });

    const searchTextFilter = (data: string) => {
        setSearchValue(data);
    };

    return (
        <DevToolsScaffold title="Organizations">
            <div onClick={() => showAddAccountFormModal()}>Add organization</div>
            <UButton text="Add organization" onClick={() => showAddAccountFormModal()} />
            <SearchInput onClick={searchTextFilter} />
            <XView marginLeft={24}>
                {/*<XSwitcher style="flat">*/}
                {/*    <XSwitcher.Item*/}
                {/*        query={{ field: 'orgState' }}*/}
                {/*        counter={orgs.filter(o => o.state === 'ACTIVATED').length}*/}
                {/*    >*/}
                {/*        ACTIVATED*/}
                {/*    </XSwitcher.Item>*/}
                {/*    <XSwitcher.Item*/}
                {/*        query={{ field: 'orgState', value: 'PENDING' }}*/}
                {/*        counter={orgs.filter(o => o.state === 'PENDING').length}*/}
                {/*    >*/}
                {/*        PENDING*/}
                {/*    </XSwitcher.Item>*/}
                {/*    <XSwitcher.Item*/}
                {/*        query={{*/}
                {/*            field: 'orgState',*/}
                {/*            value: 'SUSPENDED',*/}
                {/*        }}*/}
                {/*        counter={orgs.filter(o => o.state === 'SUSPENDED').length}*/}
                {/*    >*/}
                {/*        SUSPENDED*/}
                {/*    </XSwitcher.Item>*/}
                {/*</XSwitcher>*/}
            </XView>
            <FilteredOptions orgsCurrentTab={orgsCurrentTab} searchValue={searchValue} />

            <XView />
        </DevToolsScaffold>
    );
});
