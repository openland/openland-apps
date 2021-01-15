import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { Text, View } from 'react-native';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { ZUserView } from 'openland-mobile/components/ZUserView';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { useClient } from 'openland-api/useClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';

interface OthersUsersWrapperProps {
    children?: any;
    onUserPress: (id: string) => void;
    useAsync: boolean;
    theme: ThemeGlobal;
    mId: string;
}

interface OtherUsersContentProps {
    onUserPress: (id: string) => void;
    mId: string;
    ctx: ZModalController;
}

const OtherUsersContent = React.memo((props: OtherUsersContentProps) => {
    const client = useClient();
    const message = client.useMessageMultiSpan({ id: props.mId || '' }).message;

    if (!message) {
        return null;
    }
    // TODO: remove this when cache-and-network be work!
    React.useLayoutEffect(() => {
        (async () => {
            await client.refetchMessageMultiSpan({ id: props.mId || '' });
        })();
    }, []);

    const findSpans = message.spans.find((i) => i.__typename === 'MessageSpanMultiUserMention');

    return (
        <>
            {findSpans &&
                findSpans.__typename === 'MessageSpanMultiUserMention' &&
                findSpans.users && (
                    <View style={{ flexGrow: 1 }}>
                        {findSpans.users.map((u) => (
                            <ZUserView
                                key={'user-' + u.id}
                                user={u}
                                onPress={(id) => {
                                    props.ctx.hide();
                                    props.onUserPress(id);
                                }}
                            />
                        ))}
                    </View>
                )}
        </>
    );
});

export const OthersUsersWrapper = React.memo((props: OthersUsersWrapperProps) => {
    const handlePress = () => {
        let builder = new ActionSheetBuilder();

        builder.view((ctx: ZModalController) => (
            <React.Suspense
                fallback={
                    <View style={{ height: 40 }}>
                        <ZLoader />
                    </View>
                }
            >
                <OtherUsersContent onUserPress={props.onUserPress} mId={props.mId} ctx={ctx} />
            </React.Suspense>
        ));

        builder.cancelable(false);
        builder.show();
    };

    return props.useAsync ? (
        <ASText
            key={'service_text'}
            color={props.theme.foregroundSecondary}
            fontWeight={FontStyles.Weight.Bold}
            fontSize={13}
            lineHeight={18}
            marginLeft={6}
            marginRight={6}
            onPress={() => handlePress()}
        >
            {props.children}
        </ASText>
    ) : (
            <Text
                key={'service_text'}
                style={{
                    color: props.theme.foregroundSecondary,
                    fontWeight: FontStyles.Weight.Bold,
                    fontSize: 13,
                    lineHeight: 18,
                    marginLeft: 6,
                    marginRight: 6,
                }}
                onPress={() => handlePress()}
                allowFontScaling={false}
            >
                {props.children}
            </Text>
        );
});
