import { string } from 'prop-types';
import { AppStyles } from 'openland-mobile/styles/AppStyles';
import { AsyncStorage } from 'react-native';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { doSimpleHash } from 'openland-y-utils/hash';
import { DefaultTheme } from 'openland-web/modules/theme/ThemeContext';

export interface ConversationTheme {
    // conversation
    mainColor: string;
    chatBackgroundColor: string;
    spiral: boolean;

    // messages
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

    // service messages
    serviceTextColor: string

}

export class DefaultConversationTheme implements ConversationTheme {
    mainColor = '#0084fe';
    chatBackgroundColor = 'white';
    spiral = false;

    bubbleColorIn = '#f3f5f7';
    bubbleColorOut = ['#1970ff', '#11b2ff'];

    senderNameColor = '#0084fe';
    senderNameColorOut = '#fff';

    textColorIn = '#000000';
    textColorOut = '#ffffff';
    textColorSecondaryIn = 'rgba(138,138,143, 0.7)';
    textColorSecondaryOut = 'rgba(255,255,255, 0.7)';

    backgroundColor = '#fff';

    linkColorIn = '#0084fe';
    linkColorOut = '#fff';

    timeColorIn = 'rgba(138,138,143, 0.6)';
    timeColorOut = 'rgba(255,255,255, 0.7)';

    reactionTextColorIn = '#99a2b0';
    reactionTextColorOut = '#99a2b0';

    serviceTextColor = '#8a8a8f';

}

let getDefaultConversationTheme = (id: string) => {
    return new DefaultConversationTheme();
    // disable for now
    // let colors = ZStyles.avatars[doSimpleHash(id) % ZStyles.avatars.length];
    // return { ...res, senderNameColor: colors.nameColor, bubbleColorOut: [colors.placeholderColorEnd, colors.placeholderColorStart] };
}

type ConversationThemeListener = (theme: ConversationTheme) => void;

class ConversationThemeResolverInner {
    listeners = new Map<string, Set<ConversationThemeListener>>();
    themes = new Map<string, ConversationTheme>();
    defaulThemes = new Map<string, ConversationTheme>();

    getCachedOrDefault = (id: string) => {
        let theme = this.themes.get(id);
        if (!theme) {
            theme = this.defaulThemes.get(id);
        }
        if (!theme) {
            theme = getDefaultConversationTheme(id);
            this.defaulThemes.set(id, theme);
        }

        return theme;
    }

    resolveTheme = async (id: string) => {
        let theme = this.themes.get(id);
        if (!theme) {
            theme = this.getCachedOrDefault(id);
            this.themes.set(id, theme);
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

    static getCachedOrDefault = (id: string) => {
        return conversationThemeResolver.getCachedOrDefault(id);
    }

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