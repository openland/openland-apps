import { string } from 'prop-types';
import { AppStyles } from 'openland-mobile/styles/AppStyles';
import { AsyncStorage } from 'react-native';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { doSimpleHash } from 'openland-y-utils/hash';

export interface ConversationTheme {
    // not used for now
    bubbleColorIn: string;
    bubbleColorOut: string[];

    senderNameColor: string;
    senderNameColorOut: string;

    textColorIn: string;
    textColorOut: string;
    textColorSecondaryIn: string;
    textColorSecondaryOut: string;

    backgroundColor: string;

    linkColorIn: string;
    linkColorOut: string;

    timeColorIn: string;
    timeColorOut: string;

    reactionTextColorIn: string;
    reactionTextColorOut: string;

    spiral: boolean;
}

class DefaultConversationTheme implements ConversationTheme {
    bubbleColorIn = '#f3f5f7';
    bubbleColorOut = ['#1970ff', '#11b2ff'];

    senderNameColor = '#0084fe';
    senderNameColorOut = '#fff';

    textColorIn = '#000000';
    textColorOut = '#ffffff';
    textColorSecondaryIn = 'rgba(138,138,143, 0.7)';
    textColorSecondaryOut = 'rgba(255,255,255, 0.7)';

    backgroundColor = '#fff';

    linkColorIn = AppStyles.primaryColor;
    linkColorOut = '#fff';

    timeColorIn = 'rgba(138,138,143, 0.6)';
    timeColorOut = 'rgba(255,255,255, 0.7)';

    reactionTextColorIn = '#99a2b0';
    reactionTextColorOut = '#99a2b0';

    spiral = false;
}

export let getDefaultConversationTheme = (id: string) => {
    let res = new DefaultConversationTheme();
    return res;
    // disable for now
    // let colors = ZStyles.avatars[doSimpleHash(id) % ZStyles.avatars.length];
    // return { ...res, senderNameColor: colors.nameColor, bubbleColorOut: [colors.placeholderColorEnd, colors.placeholderColorStart] };
}

type ConversationThemeListener = (theme: ConversationTheme) => void;

class ConversationThemeResolverInner {
    listeners = new Map<string, Set<ConversationThemeListener>>();
    themes = new Map<string, ConversationTheme>();

    resolveTheme = async (id: string) => {
        let theme = this.themes.get(id);
        if (!theme) {
            theme = getDefaultConversationTheme(id);
            let savedThemeRawStr = await AsyncStorage.getItem('conversaton_theme_' + id);
            if (savedThemeRawStr) {
                let savedThemeRaw = JSON.parse(savedThemeRawStr);
                for (let key of Object.keys(theme)) {
                    if (typeof savedThemeRaw[key] === typeof theme[key]) {
                        theme[key] = savedThemeRaw[key];
                    }
                }
            }
        }
        return theme;
    }

    updateTheme = async (id: string, changes: Partial<ConversationTheme>) => {
        let current = await this.resolveTheme(id);
        let res = { ...current, ...changes };
        let listeners = this.listeners.get(id);
        if (listeners) {
            for (let l of listeners) {
                l(res);
            }
        }
        AsyncStorage.setItem('conversaton_theme_' + id, JSON.stringify(res));
    }

    subscribeTheme = async (conversationId: string, onThemeChanged: ConversationThemeListener) => {
        let conversationListeners = this.listeners.get(conversationId);
        if (!conversationListeners) {
            conversationListeners = new Set();
            this.listeners.set(conversationId, conversationListeners);
        }

        conversationListeners.add(onThemeChanged);
        onThemeChanged(await this.resolveTheme(conversationId));

        return (() => {
            this.listeners.get(conversationId)!.delete(onThemeChanged);
        })
    }
}

let conversationThemeResolver = new ConversationThemeResolverInner();
export class ConversationThemeResolver {

    static get = async (id: string) => {
        return await conversationThemeResolver.resolveTheme(id);
    }

    static subscribe = async (id: string, listener: ConversationThemeListener) => {
        return await conversationThemeResolver.subscribeTheme(id, listener);
    }

    static update = async (id: string, changes: Partial<ConversationTheme>) => {
        await conversationThemeResolver.updateTheme(id, changes);
    }
}