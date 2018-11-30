import * as React from 'react';
import { MessageWithMentionsTextComponent } from './XMention';
import { toContentState, toHTML, htmlMessageToDbFormat } from './conversion';
import * as renderer from 'react-test-renderer';

const testFromHtmlToDraftEditorStateAndBack = (htmlFixture: any) => {
    const contentState = toContentState(htmlFixture);
    const htmlOut = toHTML(contentState);
    expect(htmlOut).toBe(htmlFixture);
};

const dbFormat = {
    mentions: [
        {
            id: '123',
            name: 'Sergey Lapin',
            isYou: true,
        },
        {
            id: '456',
            name: 'Other Guy',
            isYou: false,
        },
    ],
    text: '@Sergey Lapin 123 @Other Guy',
};

describe.only('XRichComponent', () => {
    it('converts one mention with span', () => {
        testFromHtmlToDraftEditorStateAndBack(
            '<p><span data-mention-id="123" data-mention-is-you="true">@Sergey Lapin</span></p>',
        );
    });

    it('converts two mention with span', () => {
        testFromHtmlToDraftEditorStateAndBack(
            '<p><span data-mention-id="123" data-mention-is-you="true">@Sergey Lapin</span> <span data-mention-id="456" data-mention-is-you="false">@Other Guy</span></p>',
        );
    });

    it('html to db format', () => {
        const str =
            '<p><span data-mention-id="123" data-mention-is-you="true">@Sergey Lapin</span> 123 <span data-mention-id="456" data-mention-is-you="false">@Other Guy</span></p>';

        const res = htmlMessageToDbFormat(str);

        expect(res).toEqual(dbFormat);
    });

    // it('db format to react component', () => {
    //     expect(
    //         renderer
    //             .create(
    //                 <MessageWithMentionsTextComponent
    //                     {...{
    //                         ...dbFormat,
    //                         mentions: dbFormat.mentions.map(
    //                             (mention: any) => mention as any,
    //                         ),
    //                     }}
    //                 />,
    //             )
    //             .toJSON(),
    //     ).toMatchSnapshot();
    // });
});
