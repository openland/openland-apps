import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withApp } from '../../components/withApp';
import { withProfileCreate } from '../../api/withProfileCreate';
import { InitTexts } from './_text';
import { delayForewer } from 'openland-y-utils/timer';
import * as Cookie from 'js-cookie';
import {
    WebSignUpContainer,
    RoomSignupContainer,
    CreateProfileFormInner,
} from './components/SignComponents';

export const CreateProfileForm = withProfileCreate((props: any) => {
    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }
    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';
    const roomView = props.roomView;
    const router = props.router;
    const prefill = props.data.prefill;
    const createProfile = props.createProfile;
    const Container = roomView ? RoomSignupContainer : WebSignUpContainer;

    if (props.loading) {
        return <div />;
    }
    return (
        <Container>
            <CreateProfileFormInner
                {...{
                    roomView,
                    prefill,
                    usePhotoPrefill,
                    defaultAction: async (data: any) => {
                        await createProfile({ variables: data });
                        let redirect = router.query.redirect;
                        window.location.href = redirect ? redirect : '/';
                        await delayForewer();
                    },
                }}
            />
        </Container>
    );
});

export default withApp('CreateProfile', 'viewer', props => {
    return (
        <>
            <XDocumentHead
                title={InitTexts.create_profile.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <CreateProfileForm />
        </>
    );
});
