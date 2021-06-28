import * as React from 'react';
import { Platform, View, Text, Image } from 'react-native';
import { delay } from 'openland-y-utils/timer';
import { ZButton } from 'openland-mobile/components/ZButton';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { SAnimatedShadowView } from 'react-native-fast-animations';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { SAnimated } from 'react-native-fast-animations';
import { formatError } from 'openland-y-forms/errorHandling';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { showBlanketModal } from 'openland-mobile/components/showBlanketModal';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useText } from 'openland-mobile/text/useText';
import { QueryCacheProvider } from '@openland/spacex';
import { GQLClientContext, useClient } from 'openland-api/useClient';
import { getClient } from 'openland-mobile/utils/graphqlClient';

interface DeleteChatComponentProps {
    chatId: string;
    userName: string;
    hide: () => void;
}

const DeleteChatComponent = React.memo((props: DeleteChatComponentProps) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const { t } = useText();
    const [oneSide, setOneSide] = React.useState(true);
    const [state, setState] = React.useState<'initial' | 'done' | 'error'>('initial');
    const [isActionInProgress, setActionInProgress] = React.useState(false);
    const key = randomKey();

    const contentView = new SAnimatedShadowView(key + '--ctns', { opacity: 1 });
    const overlayView = new SAnimatedShadowView(key + '--overlay', { opacity: 0 });

    const onDelete = React.useCallback(async () => {
        await client.mutateChatDelete({ chatId: props.chatId, oneSide: oneSide });
        props.hide();
    }, [oneSide]);

    const onSuccess = React.useCallback(async () => {
        setState('done');
        SAnimated.beginTransaction();
        if (Platform.OS === 'ios') {
            SAnimated.setPropertyAnimator((name, prop, from, to) => {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            });
        } else {
            SAnimated.setPropertyAnimator((name, prop, from, to) => {
                SAnimated.timing(name, {
                    property: prop,
                    from: from,
                    to: to,
                    easing: 'material',
                });
            });
        }

        contentView.opacity = 0;
        overlayView.opacity = 1;

        SAnimated.commitTransaction(async () => {
            await delay(250);
            props.hide();
        });
    }, []);

    const onError = React.useCallback(async (e: Error) => {
        new AlertBlanketBuilder().alert(formatError(e));
        props.hide();
    }, []);

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor:
                    state === 'error' ? theme.accentNegative : theme.backgroundSecondary,
                borderRadius: RadiusStyles.Large,
            }}
        >
            <SAnimated.View
                name={key + '--ctns'}
                style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderRadius: 16,
                }}
            >
                <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 }}>
                    <Text
                        style={{
                            ...TextStyles.Title2,
                            marginBottom: 4,
                            color: theme.foregroundPrimary,
                        }}
                        allowFontScaling={false}
                    >
                        {t('conversationDelete', 'Delete conversation')}
                    </Text>
                    <Text
                        style={{
                            ...TextStyles.Body,
                            color: theme.foregroundPrimary,
                        }}
                        allowFontScaling={false}
                    >
                        {t(
                            'conversationDeleteDescription',
                            'Are you sure you want to delete conversation? This cannot be undone.',
                        )}
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 8 }}>
                    <ZListItem
                        text={t('conversationDeleteBoth', {
                            userName: props.userName,
                            defaultValue: 'Delete for me and {{userName}}',
                        })}
                        checkmark={!oneSide}
                        checkmarkType="checkbox"
                        onPress={() => setOneSide(!oneSide)}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        alignSelf: 'flex-end',
                        marginTop: 16,
                        paddingHorizontal: 24,
                        paddingBottom: 24,
                    }}
                >
                    <View style={{ width: 8 }} />
                    <ZButton
                        style="secondary"
                        title={t('cancel', 'Cancel')}
                        enabled={!isActionInProgress}
                        onPress={async () => {
                            props.hide();
                        }}
                    />
                    <View style={{ width: 8 }} />
                    <ZButton
                        style="danger"
                        title={t('delete', 'Delete')}
                        enabled={!isActionInProgress}
                        action={onDelete}
                        onActionStart={() => setActionInProgress(true)}
                        onActionSuccess={onSuccess}
                        onActionError={onError}
                    />
                </View>
            </SAnimated.View>
            <View style={{ position: 'absolute', alignSelf: 'center' }} pointerEvents="none">
                <SAnimated.View name={key + '--overlay'} style={{ opacity: 0 }}>
                    <View
                        style={{
                            borderRadius: 40,
                            width: 40,
                            height: 40,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                borderRadius: 36,
                                width: 36,
                                height: 36,
                                backgroundColor: '#69d06d',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={require('assets/ic-checkmark.png')} />
                        </View>
                    </View>
                </SAnimated.View>
            </View>
        </View>
    );
});

export const showDeleteChatConfirmation = (chatId: string, userName: string) => {
    showBlanketModal(
        (ctx) => (
            <GQLClientContext.Provider value={getClient()}>
                <QueryCacheProvider>
                    <DeleteChatComponent chatId={chatId} userName={userName} hide={ctx.hide} />
                </QueryCacheProvider>
            </GQLClientContext.Provider>
        ),
        {
            ignoreSafeArea: true,
        },
    );
};
