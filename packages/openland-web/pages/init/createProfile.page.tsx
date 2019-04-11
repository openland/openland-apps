import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withApp } from '../../components/withApp';
import { CreateProfileInput } from 'openland-api/Types';
import { InitTexts } from './_text';
import { delayForewer } from 'openland-y-utils/timer';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import * as Cookie from 'js-cookie';
import {
    WebSignUpContainer,
    RoomSignupContainer,
    CreateProfileFormInner,
} from './components/SignComponents';
import { useIsMobile } from 'openland-web/hooks';
import { useClient } from 'openland-web/utils/useClient';

const CreateProfileFormRoot = ({ roomView }: { roomView: boolean }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }

    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';

    const data = client.useProfilePrefill();

    const createProfile = async ({
        variables,
    }: {
        variables: {
            input: CreateProfileInput;
        };
    }) => {
        await client.mutateProfileCreate(variables);
        await client.refetchAccount();
    };

    const Container = roomView ? RoomSignupContainer : WebSignUpContainer;

    const prefill = usePhotoPrefill ? data.prefill : null;

    return (
        <Container pageMode="CreateProfile">
            <CreateProfileFormInner
                {...{
                    roomView,
                    prefill,

                    defaultAction: async (submitData: { input: CreateProfileInput }) => {
                        await createProfile({ variables: submitData });
                        let redirect = router.query.redirect;
                        window.location.href = redirect ? redirect : '/';
                        await delayForewer();
                    },
                }}
            />
        </Container>
    );
};

const CreateProfileForm = ({ roomView }: { roomView: boolean }) => {
    const [isMobile] = useIsMobile();

    if (isMobile) {
        roomView = false;
    }

    return <CreateProfileFormRoot roomView={roomView} />;
};

export default withApp('CreateProfile', 'viewer', () => {
    const fromRoom = Cookie.get('x-openland-invite');
    return (
        <>
            <XDocumentHead
                title={InitTexts.create_profile.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <CreateProfileForm roomView={!!fromRoom} />
        </>
    );
});
