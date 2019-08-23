// tslint:disable
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
// import { XTable } from 'openland-x/XTable';
import { XSwitcher } from 'openland-x/XSwitcher';
// import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XView } from 'react-mental';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { useClient } from 'openland-web/utils/useClient';
import { XInput } from 'openland-x/XInput';
import { SuperAccounts_superAccounts } from 'openland-api/Types';
// import { XDate } from 'openland-x/XDate';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XModalFooter } from 'openland-x-modal/XModal';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { InputField } from 'openland-web/components/InputField';
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
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    <InputField title={'Organization Name'} field={titleField} size="large" />
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
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
                <XInput value={value} onChange={searchField} placeholder="search" />
            </XView>
            <XButton text="search" style="primary" onClick={onClick} />
            {value && (
                <XView marginLeft={16}>
                    <XButton text="clear search" onClick={clearSearch} />
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
    ds.initialize(nodes.map(v => ({ ...v, key: v.id })), true, true)
    let dsw = new DataSourceWindow(ds, 50);

    const renderLoading = React.useMemo(() => {
        return () => {
            return (
                <XView flexDirection="column" alignItems="center" justifyContent="center" height={80}>
                    <XLoader />
                </XView>
            );
        };
    }, []);

    let renderItem = (item: SuperAccounts_superAccounts & { key: string }) => {
        return <XView maxWidth={600} flexDirection="row">
            <XView flexGrow={1}>
                <UOrganizationView
                    organization={{ id: item.id, name: item.title, __typename: 'Organization', photo: null, shortname: null, about: null, isCommunity: false }}

                />
            </XView >
            <XButton
                path={'/super/orgs/' + item.id}
                style="ghost"
                text="Settings"
                flexShrink={0}
            />
            <XButton
                path={'/directory/o/' + item.orgId}
                style="ghost"
                text="Profile"
                flexShrink={0}
            />
        </XView>

    }
    return (
        <XListView itemHeight={50} loadingHeight={200} dataSource={dsw} renderLoading={renderLoading} renderItem={renderItem} />
    );
    return null;
}

export default withApp('Super Organizations', 'super-admin', () => {
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
            <XHeader text="Organizations" description={orgs.length + ' total'}>
                <XButton text="Add organization" onClick={() => showAddAccountFormModal()} />
            </XHeader>
            <SearchInput onClick={searchTextFilter} />
            <XView marginLeft={24}>
                <XSwitcher style="flat">
                    <XSwitcher.Item
                        query={{ field: 'orgState' }}
                        counter={orgs.filter(o => o.state === 'ACTIVATED').length}
                    >
                        ACTIVATED
                    </XSwitcher.Item>
                    <XSwitcher.Item
                        query={{ field: 'orgState', value: 'PENDING' }}
                        counter={orgs.filter(o => o.state === 'PENDING').length}
                    >
                        PENDING
                    </XSwitcher.Item>
                    <XSwitcher.Item
                        query={{
                            field: 'orgState',
                            value: 'SUSPENDED',
                        }}
                        counter={orgs.filter(o => o.state === 'SUSPENDED').length}
                    >
                        SUSPENDED
                    </XSwitcher.Item>
                </XSwitcher>
            </XView>
            <FilteredOptions orgsCurrentTab={orgsCurrentTab} searchValue={searchValue} />

            <XView>

            </XView>
        </DevToolsScaffold>
    );
});
