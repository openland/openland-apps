import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { MainLayout } from '../../../components/MainLayout';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { SearchBox } from '../../../pages/main/directory/components/SearchBox';
import { Navigation } from '../../../pages/main/directory/components/Navigation';
import { SortPicker } from '../../../pages/main/directory/sortPicker';
import { CreateWrapIntoState } from './signin/utils';
import { XSubHeader } from 'openland-x/XSubHeader';

const WrapIntoState = CreateWrapIntoState({
    root: {
        mode: {
            type: 'select',
            value: [
                'sidebar',
                'headerWithSearch',
                'dialogHeader',
                'directoryWithSearch',
                'directorySelectionMode',
            ],
            default: 'sidebar',
        },
    },
});

export default withApp('UI Framework - Mobile Navigation', 'viewer', props => {
    const query = '';
    const onQueryChange = () => {
        //
    };
    const placeholder = 'Search organizations';
    const sorterTitle = 'All organizations';
    const sort = '';
    const onPick = () => {
        //
    };

    return (
        <DevDocsScaffold title="Mobile Navigation">
            <XContent>
                <WrapIntoState>
                    {({ branch, ...branchProps }: any) => {
                        if (branchProps.mode === 'directorySelectionMode') {
                            return (
                                <MainLayout>
                                    <MainLayout.Menu>
                                        <Navigation route="Organizations" />
                                    </MainLayout.Menu>
                                    <MainLayout.Content>
                                        <XVertical separator={0}>
                                            <SearchBox
                                                value={query}
                                                onChange={onQueryChange}
                                                placeholder="Search organizations"
                                            />

                                            <XSubHeader
                                                title="All organizations"
                                                right={
                                                    <SortPicker
                                                        sort={{
                                                            orderBy: 'orderBy',
                                                            featured: true,
                                                        }}
                                                        onPick={onPick}
                                                    />
                                                }
                                                paddingBottom={12}
                                            />
                                        </XVertical>
                                    </MainLayout.Content>
                                </MainLayout>
                            );
                        }

                        return <div>{JSON.stringify(branchProps, null, 2)}</div>;
                    }}
                </WrapIntoState>
            </XContent>
        </DevDocsScaffold>
    );
});
