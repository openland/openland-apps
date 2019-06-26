import * as React from 'react';
import { pages, pagesT } from './pages';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { AcceptInvitePage } from './accept-invite.page';
import { AskActivationPage } from './ask-activation-code.page';
import { AskEmailPage } from './ask-email.page';
import { CreateNewAccountPage } from './create-new-account.page';
import { EnterYourOrganizationPage } from './enter-your-organization.page';
import { IntroduceYourselfPage } from './introduce-yourself.page';

export default () => {
    let router = React.useContext(XRouterContext)!;
    let page: pagesT = pages.createNewAccount;

    if (router.path.includes('accept-invite')) {
        page = pages.acceptInvite;
    } else if (router.path.includes('ask-activation-code')) {
        page = pages.askActivationCode;
    } else if (router.path.includes('ask-email')) {
        page = pages.askEmail;
    } else if (router.path.includes('create-new-account')) {
        page = pages.createNewAccount;
    } else if (router.path.includes('enter-your-organization')) {
        page = pages.enterYourOrganization;
    } else if (router.path.includes('introduce-yourself')) {
        page = pages.introduceYourself;
    }

    return (
        <>
            {page === pages.acceptInvite && <AcceptInvitePage />}
            {page === pages.askActivationCode && <AskActivationPage />}
            {page === pages.askEmail && <AskEmailPage />}
            {page === pages.createNewAccount && <CreateNewAccountPage />}
            {page === pages.enterYourOrganization && <EnterYourOrganizationPage />}
            {page === pages.introduceYourself && <IntroduceYourselfPage />}
        </>
    );
};
