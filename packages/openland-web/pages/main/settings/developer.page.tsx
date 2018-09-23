import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { Navigation } from './_navigation';
import { XContent } from 'openland-x-layout/XContent';
import { withPersonalTokens } from '../../../api/withPersonalTokents';

export default withApp('DevCenter', 'viewer', withPersonalTokens((props) => {
    return (
        <Navigation title="Development Center">
            <XContent>
                {props.data.devPersonalTokens.map((v) => (
                    <div>{v.token}</div>
                ))}
            </XContent>
        </Navigation>
    );
}));