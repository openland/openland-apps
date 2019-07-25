import * as React from 'react';
import {
    OrganizationMemberRole,
    OrganizationMembers_organization_members,
} from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';
import { XText } from 'openland-x/XText';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-x-modal/XModal';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SelectWithDropdown } from 'openland-web/pages/main/mail/SelectWithDropdown';

interface PermissionsModalProps {
    orgName: string;
    orgId: string;
    member: OrganizationMembers_organization_members;
}

export const PermissionsModal = (props: PermissionsModalProps & { hide: () => void }) => {
    const client = useClient();

    const { member } = props;
    const form = useForm();

    const roleField = useField('input.role', member.role, form);

    return (
        <XView borderRadius={8}>
            <XView marginTop={30} />
            <XModalContent>
                <SelectWithDropdown
                    title="Community type"
                    value={roleField.value}
                    onChange={roleField.input.onChange}
                    selectOptions={[
                        {
                            value: 'ADMIN',
                            label: TextProfiles.Organization.roles.ADMIN,
                        },
                        {
                            value: 'MEMBER',
                            label: TextProfiles.Organization.roles.MEMBER,
                        },
                    ]}
                />
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={props.hide} />
                </XView>
                <XButton
                    text={'Change role'}
                    style="danger"
                    size="large"
                    onClick={async () => {
                        await client.mutateOrganizationChangeMemberRole({
                            memberId: member.user.id,
                            newRole: roleField.value as OrganizationMemberRole,
                            organizationId: props.orgId,
                        });

                        await client.refetchOrganization({
                            organizationId: props.orgId,
                        });

                        props.hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showRoleOrgMemberModal = (props: PermissionsModalProps): void => {
    showModalBox(
        {
            title: TextProfiles.Organization.members.changeRole.title(
                props.member.user.name,
                props.orgName,
            ),
        },
        ctx => <PermissionsModal {...props} hide={ctx.hide} />,
    );
};

interface RemoveJoinedModalProps {
    orgName: string;
    orgId: string;
    member: OrganizationMembers_organization_members;
}

export const RemoveJoinedModal = (props: RemoveJoinedModalProps & { hide: () => void }) => {
    const client = useClient();

    const { member } = props;

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XText>
                    {TextProfiles.Organization.members.remove.text(
                        member.user.firstName,
                        props.orgName,
                    )}
                </XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={props.hide} />
                </XView>
                <XButton
                    text={TextProfiles.Organization.members.remove.submit}
                    style="danger"
                    size="large"
                    onClick={async () => {
                        await client.mutateOrganizationRemoveMember({
                            memberId: member.user.id,
                            organizationId: props.orgId,
                        });

                        await client.refetchOrganization({ organizationId: props.orgId });

                        props.hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showRemoveOrgMemberModal = (props: RemoveJoinedModalProps): void => {
    showModalBox(
        {
            title: TextProfiles.Organization.members.remove.title(
                props.member.user.name,
                props.orgName,
            ),
        },
        ctx => <RemoveJoinedModal {...props} hide={ctx.hide} />,
    );
};