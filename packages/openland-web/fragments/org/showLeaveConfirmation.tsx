import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { Organization_organization } from 'openland-api/spacex.types';
import { MessengerEngine } from 'openland-engines/MessengerEngine';

export const showLeaveConfirmation = (organization: Organization_organization, messenger: MessengerEngine, onLeave: (id: string) => void) => {
    const { id, name, isCommunity } = organization;
    const client = messenger.client;
    const user = messenger.user;
    const typeString = isCommunity ? 'community' : 'organization';

    const builder = new AlertBlanketBuilder;

    builder.title(`Leave ${typeString}`);
    builder.message(`Are you sure you want to leave? You will lose access to all internal chats at ${name}. You can only join ${name} by invitation in the future.`);
    builder.action(`Leave`, async () => {
        await client.mutateOrganizationMemberRemove({
            userId: user.id,
            organizationId: id,
        });

        onLeave(user.id);

        await client.refetchMyOrganizations();
        await client.refetchAccount();
    }, 'danger');

    builder.show();
};