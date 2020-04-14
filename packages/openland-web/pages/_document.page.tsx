import * as React from 'react';
import Document, {
    Head,
    Main,
    NextScript,
    DocumentProps,
    NextDocumentContext,
} from 'next/document';
import { renderStaticOptimized } from 'glamor/server';
import { buildConfig } from '../config';
import { saveConfig } from 'openland-x-config';
import { createClientWeb } from 'openland-api/createClientWeb';

let config = buildConfig();
const openland = createClientWeb();

type MetaTagsInfoT = {
    title?: string;
    url?: string;
    description?: string;
    image?: string;
};
const MetaTags = ({
    title = 'Openland · Inspiring chat communities',
    description = 'Join Openland to connect with inspiring people, learn, get help, or start your own community.',
    image = 'https://cdn.openland.com/shared/og/og-global.png',
    url,
}: MetaTagsInfoT) => {
    return (
        <>
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
                name="msapplication-TileImage"
                content="/static/img/favicon/ms-icon-144x144.png?v=2"
            />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@openland" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </>
    );
};

interface MetaTagsDescriptors {
    [key: string]: {
        title?: string;
        description?: string;
        image?: string;
    };
}

const matchMetaTags: MetaTagsDescriptors = {
    '/': {
        title: 'Openland · Inspiring chat communities',
        description:
            'Discover and join communities for your industry, role, skills, interests, and location.',
        image: 'https://cdn.openland.com/shared/og/og-find.png',
    },
    '/start': {
        title: 'Openland · Modern platform for chat communities',
        description:
            'Openland is an all-in-one platform for building great communities. Start your community in seconds and grow fast with built-in viral growth tools.',
        image: 'https://cdn.openland.com/shared/og/og-build.png',
    },
    '/about': {
        title: 'About Openland',
        description:
            'Openland is a modern platform fo chat communities. Join Openland to connect with inspiring people, learn, get help, or start your own community.',
    },
    '/terms': {
        title: 'Openland · Terms of service',
        description:
            'Review terms and conditions for using Openland websites, mobile apps, and other associated services.',
    },
    '/privacy': {
        title: 'Openland · Privacy policy',
        description:
            'Understand how Openland uses your personal information and how you can control it.',
    },
};

export default class OpenlandDocument extends Document {
    static async getInitialProps(props: NextDocumentContext) {
        const page = props.renderPage();
        const styles = renderStaticOptimized(() => page.html || '');

        let inviteKey;
        let collectionId;
        let metaTagsInfo;
        if (props && props.req && (props.req as any).originalUrl) {
            const originalUrl = (props.req as any).originalUrl;

            metaTagsInfo = matchMetaTags[originalUrl] || {};

            let urlPrefix = 'https://openland.com';

            if (process.env.APP_ENVIRONMENT === 'next') {
                urlPrefix = 'https://next.openland.com';
            }

            if (originalUrl.startsWith('/invite/')) {
                inviteKey = originalUrl.slice('/invite/'.length);
            } else if (originalUrl.startsWith('/joinChannel/')) {
                inviteKey = originalUrl.slice('/joinChannel/'.length);
            } else if (originalUrl.startsWith('/discover/collections/')) {
                collectionId = originalUrl.slice('/discover/collections/'.length);
            }

            if (inviteKey) {
                // room meta tags
                const resolvedInvite = await openland.queryResolvedInvite({
                    key: inviteKey,
                }, { fetchPolicy: 'network-only' });

                if (
                    resolvedInvite &&
                    resolvedInvite.invite &&
                    resolvedInvite.invite.__typename === 'AppInvite'
                ) {
                    metaTagsInfo = {
                        image: 'https://cdn.openland.com/shared/og/og-global.png',
                    };
                } else if (
                    resolvedInvite &&
                    resolvedInvite.invite &&
                    resolvedInvite.invite.__typename === 'RoomInvite'
                ) {
                    const room = resolvedInvite.invite.room;
                    const roomSocialImage = await openland.queryRoomSocialImage({ roomId: room.id });

                    let roomImage;

                    if (room.socialImage) {
                        roomImage = room.socialImage;
                    } else if (roomSocialImage.roomSocialImage) {
                        roomImage = roomSocialImage.roomSocialImage;
                    } else if (room.photo && !room.photo.startsWith('ph://')) {
                        roomImage = room.photo;
                    } else {
                        roomImage = 'https://cdn.openland.com/shared/og/og-global.png';
                    }

                    metaTagsInfo = {
                        title: `${room.title} on Openland`,
                        url: urlPrefix + originalUrl,
                        description: room.description || 'Join Openland and find inspiring communities',
                        image: roomImage,
                    };
                }
            } else if (collectionId) {
                try {
                    let res = await openland.queryDiscoverCollectionShort({ id: collectionId });
                    let collection = res.discoverCollection;

                    if (collection) {
                        const { image: { uuid, crop }, title } = collection;
                        let imageLink = 'https://ucarecdn.com/' + uuid + '/';
                        if (crop) {
                            imageLink += `-/crop/${crop.w}x${crop.h}/${crop.x},${crop.y}/`;
                        }

                        metaTagsInfo = {
                            title,
                            url: urlPrefix + originalUrl,
                            description: 'Collection of Openland chats on the topic',
                            image: imageLink || 'https://cdn.openland.com/shared/og/og-global.png',
                        };
                    }
                } catch (e) {
                    // noop
                }
            } else {
                // probably user meta tags needed
                const linkSegments = originalUrl.split('/');

                if (linkSegments.length === 2) {
                    const probableShortname = linkSegments[1];

                    const shortnameData = await openland.queryResolveShortName({ shortname: probableShortname });

                    if (shortnameData.item) {
                        // default meta tags
                        metaTagsInfo = matchMetaTags[originalUrl] || {};

                        // user or group exists
                        if (shortnameData.item.__typename === 'User') {
                            const { user } = await openland.queryUserPico({ userId: shortnameData.item.id });

                            metaTagsInfo = {
                                title: `${user.name} on Openland`,
                                url: urlPrefix + originalUrl,
                                description: `${user.firstName} uses Openland. Want to reach them? Join Openland and write a message `,
                                image: user.photo || 'https://cdn.openland.com/shared/og/og-global.png',
                            };
                        } else if (shortnameData.item.__typename === 'SharedRoom') {
                            const { room, roomSocialImage } = await openland.queryRoomMetaPreview({ id: shortnameData.item.id });

                            if (room?.__typename === 'SharedRoom') {
                                let roomImage;

                                if (room.socialImage) {
                                    roomImage = room.socialImage;
                                } else if (roomSocialImage) {
                                    roomImage = roomSocialImage;
                                } else if (room.photo && !room.photo.startsWith('ph://')) {
                                    roomImage = room.photo;
                                } else {
                                    roomImage = 'https://cdn.openland.com/shared/og/og-global.png';
                                }

                                metaTagsInfo = {
                                    title: `${room.title} on Openland`,
                                    url: urlPrefix + originalUrl,
                                    description: room.description || 'Join Openland and find inspiring communities',
                                    image: roomImage,
                                };
                            }
                        }
                    }
                }
            }
        }

        return {
            ...page,
            metaTagsInfo,
            inviteKey,
            glamCss: styles.css,
            ids: styles.ids,
        };
    }

    constructor(props: DocumentProps) {
        super(props);
        const { __NEXT_DATA__, ids } = props as any;
        if (ids) {
            __NEXT_DATA__.ids = (this.props as any).ids;
        }
    }

    render() {
        return (
            <html>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="theme-color" content="#1790ff" />
                    <meta name="application-name" content="Openland" />
                    <meta name="apple-mobile-web-app-title" content="Openland" />
                    {process.env.APP_ENVIRONMENT !== 'next' && (
                        <meta name="apple-itunes-app" content="app-id=1435537685" />
                    )}

                    {/* ORDER IS IMPORTANT! */}
                    <link
                        rel="apple-touch-icon"
                        sizes="57x57"
                        href="/static/img/favicon/apple-icon-57x57.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="60x60"
                        href="/static/img/favicon/apple-icon-60x60.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href="/static/img/favicon/apple-icon-72x72.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href="/static/img/favicon/apple-icon-76x76.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href="/static/img/favicon/apple-icon-114x114.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href="/static/img/favicon/apple-icon-120x120.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href="/static/img/favicon/apple-icon-144x144.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href="/static/img/favicon/apple-icon-152x152.png?v=2"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/img/favicon/apple-icon-180x180.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/static/img/favicon/android-icon-192x192.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href="/static/img/favicon/favicon-96x96.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        className="favicon"
                        href="/static/img/favicon/favicon-32x32.png?v=2"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        className="favicon"
                        href="/static/img/favicon/favicon-16x16.png?v=2"
                    />
                    <link rel="manifest" href="/static/img/favicon/manifest.json?v=2" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta
                        name="msapplication-TileImage"
                        content="/static/img/favicon/ms-icon-144x144.png?v=2"
                    />

                    <MetaTags
                        {...((this.props as any).metaTagsInfo
                            ? (this.props as any).metaTagsInfo
                            : {})}
                    />

                    <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />

                    {/* Styles */}
                    {/* <link rel="stylesheet" href="https://cdn.openland.com/shared/emoji/sprites/joypixels-sprite-64.css" />
                    <link rel="stylesheet" href="https://cdn.openland.com/shared/emoji/sprites/joypixels-sprite-32.css" /> */}
                    <link
                        rel="stylesheet"
                        href="https://cdn.openland.com/shared/emoji/sprites/joypixels-sprite-24.css"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese"
                        rel="stylesheet"
                    />
                    <link rel="stylesheet" href="/static/css/x.css?v=12" />

                    <style dangerouslySetInnerHTML={{ __html: (this.props as any).glamCss }} />

                    {/* Stripe (Can't be bundled) */}
                    <script src="https://js.stripe.com/v3/" />

                    {/* Config */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                "window.GLAMOR_IDS='" +
                                JSON.stringify((this.props as any).ids) +
                                "'",
                        }}
                    />

                    {/* <script src="/static/bns.js" /> */}
                    <script dangerouslySetInnerHTML={{ __html: saveConfig(config) }} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: 'window.initial = JSON.stringify(window.history.state)',
                        }}
                    />

                    <script src="https://apis.google.com/js/api.js" />
                </Head>

                <body>
                    <Main />
                    <div className="main_scripts">
                        <NextScript />
                    </div>
                    <div
                        style={{
                            position: 'fixed',
                            height: 16,
                            top: 0,
                            width: '100vw',
                            pointerEvents: 'none',
                            zIndex: 100,
                        }}
                        id="progress_container"
                    />

                    {/* Required for logo gradients to work when logo is used multiple times */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 0 0" style={{ position: 'fixed', top: '0' }}>
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="959.977"
                                y1="32.8002"
                                x2="234.863"
                                y2="794.492"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#FEC519" />
                                <stop offset="0.278985" stopColor="#E62E5C" />
                                <stop offset="0.760754" stopColor="#45A3E6" />
                                <stop offset="1" stopColor="#5CE6C3" />
                            </linearGradient>
                        </defs>
                    </svg>
                </body>
            </html>
        );
    }
}
