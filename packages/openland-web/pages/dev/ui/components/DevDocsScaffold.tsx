import '../../../init';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { XView } from 'react-mental';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { Page } from 'openland-unicorn/Page';
import { XDialogProviderComponent } from 'openland-x/XDialogProvider';

export function DevDocsScaffold(props: {
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
                        <UListGroup header="UI">
                            <UListItem title="Typography" path="/ui" />
                            <UListItem title="List items" path="/ui/list" />
                            <UListItem title="Buttons" path="/ui/buttons" />
                            <UListItem title="Inputs" path="/ui/inputs" />
                            <UListItem title="Checkbox" path="/ui/checkbox" />
                            <UListItem title="Modals" path="/ui/modals" />
                            <UListItem title="Rick Input" path="/ui/rick" />
                            <UListItem title="Shortcuts" path="/ui/shortcuts" />
                            <UListItem title="Video" path="/ui/video" />
                            <UListItem title="Avatars" path="/ui/avatars" />
                        </UListGroup>
                    </XView>
                )}
                <XView flexGrow={1}>
                    <Page>
                        {props.title !== undefined && <UListHeader text={props.title} />}
                        <XView paddingHorizontal={16}>
                            {props.children}
                        </XView>
                    </Page>
                </XView>
            </XView>
        </>
    );
}
