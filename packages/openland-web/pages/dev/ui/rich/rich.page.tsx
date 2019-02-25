import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { MessageComposeComponentDraft } from 'openland-web/fragments/MessageComposeComponent/MessageComposeComponentDesktop';
import { XView } from 'react-mental';
import {
    DesktopSendMessage,
    TextInputWrapper,
} from 'openland-web/fragments/MessageComposeComponent/SendMessage/DesktopSendMessage';
import { MobileSendMessage } from 'openland-web/fragments/MessageComposeComponent/SendMessage/MobileSendMessage';
import { DumpSendMessagePropsT } from 'openland-web/fragments/MessageComposeComponent/DumpSendMessage';
import { XRichTextInput } from 'openland-x/XRichTextInput';

// Things to check:
// 1) focus test
// 2) backspace all - write test
// 3) test mobile well

// Idea:
// put old/new/contentEditabale on same screen
// turn on and turn off feature support

// TODO:
// 0) wrap up and finalize UI with mentions list (use simple input stub)
// 1) mentions support
// 2) emojies support
// 3) support paste files
// 4) emoji picker
//

const OldDesktopSendMessage = ({
    inputValue,
    handleChange,
    inputRef,
    handleSend,
    handleDrop,
    mentionsState,
}: DumpSendMessagePropsT) => {
    return (
        <TextInputWrapper>
            <XRichTextInput
                flexGrow={1}
                mentionsData={mentionsState!!.mentionsData}
                placeholder="Write a message..."
                onChange={handleChange}
                onSubmit={handleSend}
                ref={inputRef}
                value={inputValue}
                onPasteFile={handleDrop}
            />
        </TextInputWrapper>
    );
};

export default withApp('UI Framework - Rich Input', 'viewer', () => {
    return (
        <DevDocsScaffold title="Rich Input">
            <XContent>
                <XView>
                    <XView height={50} alignSelf="center" justifyContent="center">
                        Old
                    </XView>
                    <MessageComposeComponentDraft
                        isActive={true}
                        TextInputComponent={OldDesktopSendMessage}
                        variables={{
                            conversationId: 'k4awPklKWOSaM0ExJb15CnjEdQ',
                            organizationId: null,
                            roomId: 'k4awPklKWOSaM0ExJb15CnjEdQ',
                        }}
                    />

                    <XView height={50} alignSelf="center" justifyContent="center">
                        New
                    </XView>
                    <MessageComposeComponentDraft
                        isActive={true}
                        TextInputComponent={DesktopSendMessage}
                        variables={{
                            conversationId: 'k4awPklKWOSaM0ExJb15CnjEdQ',
                            organizationId: null,
                            roomId: 'k4awPklKWOSaM0ExJb15CnjEdQ',
                        }}
                    />
                    <XView height={50} alignSelf="center" justifyContent="center">
                        Content Editable
                    </XView>
                    <MessageComposeComponentDraft
                        isActive={true}
                        TextInputComponent={MobileSendMessage}
                        variables={{
                            conversationId: 'k4awPklKWOSaM0ExJb15CnjEdQ',
                            organizationId: null,
                            roomId: 'k4awPklKWOSaM0ExJb15CnjEdQ',
                        }}
                    />
                </XView>
            </XContent>
        </DevDocsScaffold>
    );
});
