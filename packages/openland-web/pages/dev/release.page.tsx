import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';

import { withApp } from 'openland-web/components/withApp';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { useClient } from 'openland-api/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { ReleasePlatform } from 'openland-api/spacex.types';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { XScrollView3 } from 'openland-x/XScrollView3';

import { DevToolsScaffold } from './components/DevToolsScaffold';
import DateTimeFormatter from 'openland-y-runtime/DateTimeFormatter';

const { formatDateTime } = DateTimeFormatter;

const notesColumn = css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const AppReleasesFragment = React.memo(() => {
    const versionFieldRef = React.useRef<HTMLInputElement>(null);
    const notesFieldRef = React.useRef<HTMLInputElement>(null);

    const form = useForm();
    const platformField = useField<ReleasePlatform>('platformField', ReleasePlatform.IOS, form);
    const versionField = useField('versionField', '', form);
    const notesField = useField('notesField', '', form);

    const client = useClient();
    const releases = client.useAppReleases({ platform: platformField.value }, { fetchPolicy: 'cache-and-network' }).appReleases;

    const onSave = React.useCallback(async () => {
        await form.doAction(async () => {
            if (!versionField.value.trim()) {
                if (versionFieldRef.current) {
                    versionFieldRef.current.focus();
                    return;
                }
            }

            if (!notesField.value.trim()) {
                if (notesFieldRef.current) {
                    notesFieldRef.current.focus();
                    return;
                }
            }

            await client.mutateAddAppRelease({
                platform: platformField.value,
                version: versionField.value,
                notes: notesField.value,
            });
            await client.refetchAppReleases({ platform: platformField.value });
        });
    }, [platformField.value, versionField.value, notesField.value]);

    return (
        <XView>
            <USelectField
                label="Platform"
                field={platformField}
                optionRender={(option) => <XView padding={12}>{option.label}</XView>}
                useMenuPortal={true}
                marginTop={16}
                options={Object.keys(ReleasePlatform).map((platform) => ({
                    value: platform,
                    label: platform,
                }))}
            />
            <XView flexDirection="row">
                <UInputField
                    field={versionField}
                    label="Version"
                    marginTop={16}
                    marginRight={16}
                    ref={versionFieldRef}
                    width={100}
                    maxLength={8}
                />
                <UInputField
                    field={notesField}
                    label="Notes"
                    marginTop={16}
                    ref={notesFieldRef}
                    flexGrow={1}
                />
            </XView>
            <UButton
                text="Add release"
                style="primary"
                size="large"
                marginTop={16}
                alignSelf="flex-end"
                onClick={onSave}
                loading={form.loading}
            />
            <XView flexDirection="row" marginTop={16} {...TextStyles.Title3} color="var(--foregroundPrimary)">
                <XView width={90}>Version</XView>
                <XView width={130}>Date</XView>
                <XView>Notes</XView>
            </XView>
            <XScrollView3 color="var(--foregroundPrimary)" marginTop={4}>
                {releases.slice().reverse().map((appRelease) => (
                    <XView flexDirection="row" {...TextStyles.Body}>
                        <XView width={90}>{appRelease.version}</XView>
                        <XView width={130}>{formatDateTime(Number(appRelease.date))}</XView>
                        <div className={notesColumn}>{appRelease.notes}</div>
                    </XView>
                ))}
            </XScrollView3>
        </XView>
    );
});

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
    return (
        <DevToolsScaffold title="Add last release">
            <AppReleasesFragment />
        </DevToolsScaffold>
    );
});
