import * as React from 'react';
import Head from 'next/head';
import { withRouter } from './withRouter';
import * as Cookie from 'js-cookie';
import { withUser } from '../openland-web/api/withUserSimple';
import { withOrganization } from '../openland-web/api/withOrganizationSimple';
import { withChannelInviteInfo } from '../openland-web/api/withChannelInviteInfo';

interface OpenGraphObject {
    title?: string | null;
    description?: string | null;
    image?: string | null;
}

let DEFAULT_OG: OpenGraphObject = {
    title: 'Openland Messenger — A better way to work with people outside of your organization',
    description: 'Openland is a professional messenger built for productivity and speed. Create a profile, discover new connections, create chat rooms for every task, and get things done faster than ever before.',
    image: 'https://openland.com/img/og-messenger-4.jpg'
};

const SmartHead = (props: { og?: OpenGraphObject, url?: string }) => {
    let og = props.og || DEFAULT_OG;

    return (
        <Head>
            <title key="page_title">{og.title || DEFAULT_OG.title}</title>
            <meta key="og_url" property="og:url" content={props.url || ''} />
            {og.title && <meta key="og_title" property="og:title" content={og.title} />}
            {og.description && <meta key="og_description" property="og:description" content={og.description} />}
            {og.image && <meta key="og_img" property="og:image" content={og.image} />}
        </Head>
    );
};

const UserSmartHead = withUser(withRouter((props) => {
    let user = props.data.user;

    if (user) {
        let computedOG: OpenGraphObject = {
            title: user.name + ' — Openland',
            description: user.about || 'Connect with ' + user.name + ' via Openland, a professional messaging service built for productivity and speed.',
            image: user.photo
        };

        return <SmartHead og={computedOG} url={props.router.href} />;
    } else {
        return <SmartHead url={props.router.href} />;
    }
}));

const OrgSmartHead = withOrganization(withRouter((props) => {
    let org = props.data.organization;

    if (org) {
        let description = org.isCommunity
            ? 'Join ' + org.name + ' community conversations at Openland, a professional messaging service built for productivity and speed.'
            : 'Connect with ' + org.name + ' via Openland, a professional messaging service built for productivity and speed.';

        let computedOG: OpenGraphObject = {
            title: org.name + ' — Openland',
            description: org.about || description,
            image: org.photo
        };

        return <SmartHead og={computedOG} url={props.router.href} />;
    } else {
        return <SmartHead url={props.router.href} />;
    }
}));

const ChannelInviteSmartHead = withChannelInviteInfo(withRouter((props) => {
    if (props.data.invite && props.data.invite.channel) {
        let channel = props.data.invite.channel;
        let computedOG: OpenGraphObject = {
            title: channel.title + ' — Private Community at Openland',
            description: channel.description || 'Openland is a professional messaging service built for productivity and speed. It’s time to move away from endless meetings, disorganized email threads, disconnected team chats, and work invasion in your personal social media. With Openland you can manage all your professional communications in one messaging inbox.',
            image: channel.socialImage || channel.photo || DEFAULT_OG.image
        };

        return <SmartHead og={computedOG} url={props.router.href} />;
    } else {
        return <SmartHead url={props.router.href} />;
    }
}));

export const XDocumentHead = withRouter<{ title?: string | string[], titleWithoutReverse?: boolean, titleSocial?: string | null, imgCloud?: string | null, imgUrl?: string | null }>((props) => {
    if (Cookie.get('x-openland-token')) {
        let parts = ['Openland'];
        if (typeof (props.title) === 'string') {
            parts = ['Openland', props.title];
        } else if (Array.isArray(props.title)) {
            parts = ['Openland', ...props.title];
        } else {
            parts = ['Openland'];
        }
        let title = props.titleWithoutReverse ? parts.join(' · ') : parts.reverse().join(' · ');

        let img = 'https://openland.com/img/og-messenger-3.png';
        if (props.imgUrl) {
            img = props.imgUrl;
        } else if (props.imgCloud) {
            img = 'https://ucarecdn.com/' + props.imgCloud;
        }

        return (
            <Head>
                <title key="page_title">{title}</title>
                <meta key="og_title" property="og:title" content={props.titleSocial ? props.titleSocial : title} />
                <meta key="og_url" property="og:url" content={props.router.href} />
                <meta key="og_description" property="og:description" content="All-in-one solution for land acquisition" />
                <meta key="og_img" property="og:image" content={img} />
            </Head>
        );
    } else {
        let p = props.router.path;

        if (p.startsWith('/directory/u/') || p.startsWith('/mail/u/')) {
            return <UserSmartHead />;
        }

        if (p.startsWith('/directory/o/') || p.startsWith('/directory/c/') || p.startsWith('/mail/o/')) {
            return <OrgSmartHead />;
        }

        if (p.startsWith('/joinChannel/') || p.startsWith('/joinChannel/')) {
            return <ChannelInviteSmartHead />;
        }

        return <SmartHead url={props.router.href} />;
    }
});