import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XContent } from 'openland-x-layout/XContent';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { CreateWrapIntoState } from './signin/utils';

const WrapIntoState = CreateWrapIntoState({
    root: {
        mode: {
            type: 'select',
            value: [
                'sidebar',
                'headerWithSearch',
                'dialogHeader',
                'roomsWithSearch',
                'roomsSelectionMode',
            ],
            default: 'sidebar',
        },
    },
});

export default withApp('UI Framework - Mobile Navigation', 'viewer', props => {
    return (
        <DevDocsScaffold title="Mobile Navigation">
            <XContent>
                <WrapIntoState>
                    {({ branch, ...branchProps }: any) => {
                        return <div>{JSON.stringify(branchProps, null, 2)}</div>;
                    }}
                </WrapIntoState>
            </XContent>
        </DevDocsScaffold>
    );
});
