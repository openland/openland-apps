import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XView } from 'react-mental';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { useClient } from 'openland-web/utils/useClient';
import { MutationFunc } from 'react-apollo';
import { XInput } from 'openland-x/XInput';
import { SuperAccounts_superAccounts } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';

const AddAccountForm = () => {
    const client = useClient();

    const mutate = async ({ variables: { title } }: { variables: { title: string } }) => {
        await client.mutateSuperAccountAdd({
            title,
        });

        await client.refetchSuperAccounts();
    };

    return (
        <XModalForm
            title="Add new organization"
            target={<XButton text="Add organization" />}
            submitMutation={mutate as MutationFunc<{}>}
            mutationDirect={true}
            actionName="Add"
        >
            <XFormField title="Organization Name">
                <XForm.Text field="title" />
            </XFormField>
        </XModalForm>
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

class FilteredOptions extends React.Component<FilteredOptionsProps> {
    shouldComponentUpdate(nextProps: FilteredOptionsProps) {
        if (this.props.orgsCurrentTab !== nextProps.orgsCurrentTab) {
            return true;
        } else {
            return this.props.searchValue !== nextProps.searchValue;
        }
    }

    render() {
        const { props } = this;
        let nodes = props.orgsCurrentTab;
        if (props.searchValue) {
            nodes = nodes.filter(o => o.title.toLowerCase().match(props.searchValue.toLowerCase()));
        }
        return (
            <>
                {nodes.map((v, i) => (
                    <XTable.Row key={v.orgId + i} noHover={true}>
                        <XTable.Cell>{v.title}</XTable.Cell>
                        <XTable.Cell>{v.state}</XTable.Cell>
                        <XTable.Cell>
                            <XDate value={v.createdAt || ''} format="date" />
                            <span>&nbsp;</span>
                            <XDate value={v.createdAt || ''} format="time" />
                        </XTable.Cell>
                        <XTable.Cell>
                            <XHorizontal justifyContent="flex-end">
                                <XButton
                                    path={'/super/orgs/' + v.id}
                                    style="ghost"
                                    text="Settings"
                                    flexShrink={0}
                                />
                                <XButton
                                    path={'/directory/o/' + v.orgId}
                                    style="ghost"
                                    text="Profile"
                                    flexShrink={0}
                                />
                            </XHorizontal>
                        </XTable.Cell>
                    </XTable.Row>
                ))}
            </>
        );
    }
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
                <AddAccountForm />
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
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Title</XTable.Cell>
                    <XTable.Cell>State</XTable.Cell>
                    <XTable.Cell>Created</XTable.Cell>
                    <XTable.Cell>{}</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    <FilteredOptions orgsCurrentTab={orgsCurrentTab} searchValue={searchValue} />
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
});
