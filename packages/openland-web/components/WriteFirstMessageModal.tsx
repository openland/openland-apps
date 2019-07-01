import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XImage } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { SelectWithDropdown } from 'openland-web/pages/main/mail/SelectWithDropdown';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import { setDraftMessage } from 'openland-web/fragments/MessageComposeComponent/hooks/useDraft/DraftStore';

const textAlignClassName = css`
    text-align: center;
`;

export const WriteFirstMessageModal = () => {
    const modal = React.useContext(XModalBoxContext);
    const router = React.useContext(XRouterContext)!;
    const isMobile = useIsMobile() || undefined;
    const [items, setItems] = React.useState([] as DialogDataSourceItem[]);
    const [selected, setSelected] = React.useState<DialogDataSourceItem>();
    let messenger = React.useContext(MessengerContext);
    let dataSource = React.useMemo(() => messenger.dialogList.dataSource, [messenger]);

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

    let goToChat = React.useCallback(
        async () => {
            if (selected) {
                setDraftMessage(selected.key, 'blah blah', []);
                router.push('/mail/' + selected.key);
                if (modal) {
                    modal.close();
                }
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
            paddingLeft={isMobile ? 40 : 0}
            paddingRight={isMobile ? 40 : 0}
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
                    <span className={textAlignClassName}>Start a conversation</span>
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
                        Share what you do and ask for help here will be more text
                    </span>
                </XView>

                <XView minWidth={360} marginBottom={40}>
                    {selected && (
                        <SelectWithDropdown
                            title="Chats"
                            value={selected}
                            selectOptions={items.map(i => ({
                                value: i,
                                label: i.title,
                                labelShort: i.title,
                                subtitle: '',
                            }))}
                            onChange={setSelected}
                        />
                    )}
                </XView>

                <XButton text="Go to chat" style="primary" size="large" onClick={goToChat} />
            </XView>
        </XView>
    );
};
