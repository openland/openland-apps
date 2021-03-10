import * as React from 'react';
import { AuthRouter } from './AuthRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { ThemeProvider } from 'openland-x-utils/useTheme';
import { UserInfoProvider } from 'openland-web/components/UserInfo';
import { MessengerProvider } from 'openland-web/fragments/chat/messenger/MessengerProvider';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { PushEngineComponent } from 'openland-web/modules/push/PushEngineComponent';
import { useClient } from 'openland-api/useClient';
import { UnicornSplash } from 'openland-x/XLoader';
import {
    highlightSecretOption,
    showFeaturedIconOption,
    largeEmojiOption,
} from 'openland-web/modules/appearance/stored-options';

interface ChatSearchState {
    chatId: string | null;
    initialQuery?: string;
}

interface ChatSearchContextProps {
    chatSearchState: ChatSearchState;
    setChatSearchState: (chatSearchState: ChatSearchState) => void;
}

export const ChatSearchContext = React.createContext<ChatSearchContextProps | null>(null);

export const AppContainer = (props: { children: any }) => {
    const client = useClient();
    const data = client.useAccount({ suspense: false, fetchPolicy: 'network-only' });
    const [chatSearchState, setChatSearchState] = React.useState<ChatSearchState>({
        chatId: null,
    });

    React.useEffect(() => {
        if (localStorage.getItem('interactive_app_theme') === 'LIGHT') {
            document.documentElement.classList.add('light');
        }
        if (localStorage.getItem('interactive_app_theme') === 'DARK') {
            document.documentElement.classList.add('dark');
        }
        const removeAllAccentClasses = () => {
            document.documentElement.classList.remove(
                'red',
                'orange',
                'green',
                'cyan',
                'purple',
                'pink',
                'grey',
            );
        };
        if (localStorage.getItem('interactive_app_accent') === 'RED') {
            removeAllAccentClasses();
            document.documentElement.classList.add('red');
        }
        if (localStorage.getItem('interactive_app_accent') === 'ORANGE') {
            removeAllAccentClasses();
            document.documentElement.classList.add('orange');
        }
        if (localStorage.getItem('interactive_app_accent') === 'GREEN') {
            removeAllAccentClasses();
            document.documentElement.classList.add('green');
        }
        if (localStorage.getItem('interactive_app_accent') === 'CYAN') {
            removeAllAccentClasses();
            document.documentElement.classList.add('cyan');
        }
        if (localStorage.getItem('interactive_app_accent') === 'PURPLE') {
            removeAllAccentClasses();
            document.documentElement.classList.add('purple');
        }
        if (localStorage.getItem('interactive_app_accent') === 'PINK') {
            removeAllAccentClasses();
            document.documentElement.classList.add('pink');
        }
        if (localStorage.getItem('interactive_app_accent') === 'GREY') {
            removeAllAccentClasses();
            document.documentElement.classList.add('grey');
        }
        if (localStorage.getItem('interactive_app_accent') === 'BLUE') {
            removeAllAccentClasses();
        }
        if (showFeaturedIconOption.isEnabled()) {
            document.documentElement.classList.remove('hide-featured-icon');
        } else {
            document.documentElement.classList.add('hide-featured-icon');
        }
        if (highlightSecretOption.isEnabled()) {
            document.documentElement.classList.add('highlight-secret-chat');
        } else {
            document.documentElement.classList.remove('highlight-secret-chat');
        }
        if (largeEmojiOption.isEnabled()) {
            document.documentElement.classList.remove('regular-emoji-size');
        } else {
            document.documentElement.classList.add('regular-emoji-size');
        }
    }, []);

    if (!data) {
        return <UnicornSplash />;
    }

    let hasMessenger = canUseDOM && !!data.me && data.sessionState.isCompleted;
    return (
        <React.Suspense fallback={<UnicornSplash />}>
            <PushEngineComponent enable={hasMessenger} />
            <XDocumentHead title={[]} />
            <UserInfoProvider
                sessionState={data.sessionState}
                user={data.me}
                organization={data.me && data.me.primaryOrganization}
                profile={data.myProfile}
                roles={data.myPermissions.roles}
            >
                <ThemeProvider>
                    <AuthRouter>
                        <ChatSearchContext.Provider value={{ chatSearchState, setChatSearchState }}>
                            <MessengerProvider user={hasMessenger ? data.me!! : undefined}>
                                {props.children}
                            </MessengerProvider>
                        </ChatSearchContext.Provider>
                    </AuthRouter>
                </ThemeProvider>
            </UserInfoProvider>
        </React.Suspense>
    );
};

AppContainer.displayName = 'AppContainer';
