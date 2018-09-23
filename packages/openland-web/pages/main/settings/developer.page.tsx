import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { Navigation } from './_navigation';
import { withPersonalTokens } from '../../../api/withPersonalTokents';
import { XSGroup } from 'openland-xs/XSGroup';
import { XSHeader } from 'openland-xs/XSHeader';
import { XSGroupItem } from 'openland-xs/XSGroupItem';
import { XSContainer } from 'openland-xs/XSContainer';

export default withApp('DevCenter', 'viewer', withPersonalTokens((props) => {
    return (
        <Navigation title="Development Center">
            <XSContainer>
                <XSHeader
                    title="Development Center"
                    subtitle="Personal access tokens are used to access the Openland API on your behalf."
                />
                <XSGroup title="Personal access tokens">
                    {props.data.devPersonalTokens.map((v) => (
                        <XSGroupItem key={v.id} title={v.token} />
                    ))}
                    <XSGroupItem title="Create token" appearance="action" />
                </XSGroup>
            </XSContainer>
        </Navigation>
    );
}));