import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css } from 'linaria';
import { XImage } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { SelectWithDropdown } from 'openland-web/pages/main/mail/SelectWithDropdown';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalController } from 'openland-x/showModal';

const textAlignClassName = css`
    text-align: center;
`;

const WriteFirstMessageModal = (props: { ctx: XModalController }) => {
    const router = React.useContext(XViewRouterContext);
    const [items, setItems] = React.useState([] as DialogDataSourceItem[]);
    const [selected, setSelected] = React.useState<DialogDataSourceItem>();
    const messenger = React.useContext(MessengerContext);
    const dataSource = React.useMemo(() => messenger.dialogList.dataSource, [messenger]);

    React.useEffect(() => {
        dataSource.needMore();
        dataSource.dumbWatch(() => {
            let itms = dataSource
                .getItems()
                .filter(d => (d.kind === 'GROUP' || d.kind === 'PUBLIC') && !d.isChannel);
            setItems(itms);
            if (itms.length) {
                setSelected(itms[0]);
            }
        });
    }, []);

    const goToChat = React.useCallback(
        () => {
            if (selected && router) {
                // todo set draft somehow
                // setDraftMessage(selected.key, 'Hi @All! I am ~role~ at ~organization~. We do ~this and that~. Our top priority at the moment is ~achieve something~. Does anyone has any advice or connections for us?', [{ __typename: 'MessageSpanAllMention', offset: 3, length: 4 } as any as UserWithOffset]);
                router.navigate('/mail/' + selected.key);
                props.ctx.hide();
            }
        },
        [selected],
    );

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
                        <SelectWithDropdown
                            title="Chats"
                            value={selected}
                            onChange={setSelected}
                            selectOptions={items.map(i => ({
                                value: i,
                                label: i.title,
                                labelShort: i.title,
                                subtitle: '',
                            }))}
                        />
                    )}
                </XView>
                <UButton text="Go to chat" size="large" onClick={goToChat} />
            </XView>
        </XView>
    );
};

export function showWriteFirstMessageModal() {
    showModalBox({ fullScreen: true }, ctx => (
        <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
            <WriteFirstMessageModal ctx={ctx} />
        </XScrollView3>
    ));
}
