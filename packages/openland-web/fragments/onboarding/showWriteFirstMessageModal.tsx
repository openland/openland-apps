import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css } from 'linaria';
import { XImage } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalController } from 'openland-x/showModal';

const textAlignClassName = css`
    text-align: center;
`;

type SelectedType = {
    value: string; label: string
};

const WriteFirstMessageModal = React.memo((props: { ctx: XModalController }) => {
    const router = React.useContext(XViewRouterContext);
    const [items, setItems] = React.useState<DialogDataSourceItem[]>([]);
    const [selected, setSelected] = React.useState<SelectedType | null>(null);
    const messenger = React.useContext(MessengerContext);
    const dataSource = React.useMemo(() => messenger.dialogList.dataSource, [messenger]);

    React.useEffect(() => {
        if (!selected) {
            dataSource.needMore();
            dataSource.dumbWatch(() => {
                let itms = dataSource
                    .getItems()
                    .filter((d) => (d.kind === 'GROUP' || d.kind === 'PUBLIC') && !d.isChannel);
                setItems(itms);
                if (itms.length) {
                    setSelected({ value: itms[0].key, label: itms[0].title });
                }
            });
        }
    }, [items]);

    const goToChat = React.useCallback(() => {
        if (selected && router) {
            // todo set draft somehow
            // setDraftMessage(selected.key, 'Hi @All! I am ~role~ at ~organization~. We do ~this and that~. Our top priority at the moment is ~achieve something~. Does anyone has any advice or connections for us?', [{ __typename: 'MessageSpanAllMention', offset: 3, length: 4 } as any as UserWithOffset]);
            router.navigate('/mail/' + selected.value);
            props.ctx.hide();
        }
    }, [selected]);

    console.log(selected);

    return (
        <XView
            flexDirection="row"
            position={'relative'}
            flexGrow={1}
            justifyContent={'center'}
            paddingHorizontal={20}
            paddingBottom={80}
        >
            <XView position="fixed" top={19} left={32}>
                <XImage src="/static/landing/logotype.svg" width={145} height={42} />
            </XView>
            <XView
                flexGrow={0}
                flexShrink={0}
                alignItems="center"
                justifyContent="center"
                width="100%"
                flexDirection="column"
            >
                <XView
                    fontSize={24}
                    fontWeight="600"
                    color="#000"
                    width="100%"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={12}
                >
                    <span className={textAlignClassName}>Get help from Openland community</span>
                </XView>
                <XView
                    fontSize={16}
                    color="#000"
                    width="100%"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={12}
                    marginBottom={36}
                    lineHeight={1.6}
                    maxWidth={300}
                >
                    <span className={textAlignClassName}>
                        Choose a chat and share your challenges
                    </span>
                </XView>

                <XView minWidth={360} marginBottom={40}>
                    {selected && (
                        <USelect
                            label="Chats"
                            value={selected}
                            onChange={(v: SelectedType) => setSelected(v)}
                            options={items.map((i: DialogDataSourceItem) => ({
                                value: i.key,
                                label: i.title,
                            }))}
                        />
                    )}
                </XView>
                <UButton text="Go to chat" size="large" onClick={goToChat} />
            </XView>
        </XView>
    );
});

export function showWriteFirstMessageModal() {
    showModalBox({ fullScreen: true }, (ctx) => (
        <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
            <WriteFirstMessageModal ctx={ctx} />
        </XScrollView3>
    ));
}
