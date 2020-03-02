import '../../init';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { XView } from 'react-mental';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { Page } from 'openland-unicorn/Page';
import { XDialogProviderComponent } from 'openland-x/XDialogProvider';
import IcBack from 'openland-icons/s/ic-back-24.svg';

export function DevToolsScaffold(props: {
    title?: string;
    children?: any;
    bottomOffset?: boolean;
    hideSidebar?: boolean;
}) {
    return (
        <>
            {props.title !== undefined && <XDocumentHead title={props.title} />}
            <XDialogProviderComponent />

            <XView flexGrow={1} flexDirection="row">
                {props.hideSidebar !== true && (
                    <XView width="300px" backgroundColor="var(--backgroundTertiary)">
                        <UListGroup header="Super">
                            <UListItem title="Back to mail" path="/mail" icon={<IcBack />} />
                            <UListItem title="Edit collections" path="/super/collections" />
                            <UListItem title="Edit choice" path="/super/choice" />
                            <UListItem title="Users" path="/super/users" />
                            <UListItem title="Mails" path="/super/mails" />
                            <UListItem title="Admins" path="/super/admins" />
                            <UListItem
                                title="Stats"
                                path="https://logs.openland.io/app/kibana#/dashboard/3ca91120-f946-11e8-aa74-4b89079261c0?_g=(filters%3A!(('%24state'%3A(store%3AglobalState)%2Cmeta%3A(alias%3A'test%20acccs%20(hl)'%2Cdisabled%3A!f%2Cindex%3Ab3bf80a0-db87-11e8-9410-7338f67f9eca%2Ckey%3Abody.uid%2Cnegate%3A!t%2Cparams%3A!('4'%2C'101'%2C'21'%2C'1002'%2C'31'%2C'40')%2Ctype%3Aphrases%2Cvalue%3A'4%2C%20101%2C%2021%2C%201%2C002%2C%2031%2C%2040')%2Cquery%3A(bool%3A(minimum_should_match%3A1%2Cshould%3A!((match_phrase%3A(body.uid%3A'4'))%2C(match_phrase%3A(body.uid%3A'101'))%2C(match_phrase%3A(body.uid%3A'21'))%2C(match_phrase%3A(body.uid%3A'1002'))%2C(match_phrase%3A(body.uid%3A'31'))%2C(match_phrase%3A(body.uid%3A'40'))))))%2C('%24state'%3A(store%3AglobalState)%2Cmeta%3A(alias%3A'test%20accs%20(msgs)'%2Cdisabled%3A!f%2Cindex%3Ac91953d0-f6f9-11e8-aa74-4b89079261c0%2Ckey%3Auid%2Cnegate%3A!t%2Cparams%3A!('5'%2C'101'%2C'21'%2C'1002'%2C'31'%2C'40')%2Ctype%3Aphrases%2Cvalue%3A'5%2C%20101%2C%2021%2C%201%2C002%2C%2031%2C%2040')%2Cquery%3A(bool%3A(minimum_should_match%3A1%2Cshould%3A!((match_phrase%3A(uid%3A'5'))%2C(match_phrase%3A(uid%3A'101'))%2C(match_phrase%3A(uid%3A'21'))%2C(match_phrase%3A(uid%3A'1002'))%2C(match_phrase%3A(uid%3A'31'))%2C(match_phrase%3A(uid%3A'40')))))))%2CrefreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cmode%3Aquick%2Cto%3Anow))"
                            />
                            <UListItem
                                title="Organizations (dont'n touch)"
                                path="/super/organizations"
                            />
                        </UListGroup>
                    </XView>
                )}
                <XView flexGrow={1}>
                    <Page track={'DevToolsScaffold'} scroll="enable">
                        {props.title !== undefined && <UListHeader text={props.title} />}
                        <XView paddingHorizontal={16} flexGrow={1}>
                            {props.children}
                        </XView>
                    </Page>
                </XView>
            </XView>
        </>
    );
}
