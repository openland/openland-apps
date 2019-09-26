import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { InputField } from 'openland-web/components/InputField';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalFooterButton } from 'openland-web/components/XModalFooterButton';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XCheckbox } from 'openland-x/XCheckbox';
import { showModalBox } from 'openland-x/showModalBox';

const MakeFeaturedModal = (props: {
    ctx: XModalController;
    roomId: string;
    userId: string;
}) => {
    const { ctx, roomId, userId } = props;
    const client = useClient();
    const form = useForm();
    const userBadge = client.useSuperBadgeInRoom(
        { roomId, userId },
        { fetchPolicy: 'cache-and-network' },
    ).superBadgeInRoom;
    const [featured, setFeatured] = React.useState<boolean>(!!userBadge);
    const descriptionField = useField('input.description', userBadge ? userBadge.name : '', form, [
        {
            checkIsValid: value => value.trim().length > 0,
            text: "Description can't be empty",
        },
        {
            checkIsValid: value => value.trim().length <= 40,
            text: 'Max length: 40 characters',
        },
    ]);

    const onSave = () => {
        form.doAction(async () => {
            if (featured) {
                await client.mutateSuperBadgeCreateToRoom({
                    name: descriptionField.value,
                    userId,
                    roomId,
                });
            } else {
                if (userBadge) {
                    await client.mutateSuperBadgeUnsetToRoom({
                        userId,
                        roomId,
                        badgeId: userBadge.id,
                    });
                }
            }

            ctx.hide();
        });
    };

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden">
                <XModalContent>
                    <XCheckbox
                        label={featured ? 'Featured' : 'Not featured'}
                        checked={featured}
                        onChange={() => setFeatured(!featured)}
                        switcher={true}
                    />
                    {featured && (
                        <XView marginTop={20}>
                            <InputField
                                title="Description"
                                field={descriptionField}
                                setFocusOnError={true}
                                maxLength={40}
                            />
                        </XView>
                    )}
                </XModalContent>
                <XModalFooter>
                    <XModalFooterButton text="Cancel" style="ghost" onClick={() => ctx.hide()} />
                    <XModalFooterButton text="Save" style="primary" onClick={onSave} />
                </XModalFooter>
            </XView>
        </>
    );
};

export const showMakeFeaturedModal = (roomId: string, userId: string) => {
    showModalBox(
        {
            title: 'Member featuring',
        },
        ctx => {
            return <MakeFeaturedModal ctx={ctx} userId={userId} roomId={roomId} />;
        },
    );
};