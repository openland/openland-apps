import * as React from 'react';
import { MessageWithMentionsTextComponent } from './XMention';
import { toContentState, toHTML, htmlMessageToDbFormat } from './conversion';
import * as renderer from 'react-test-renderer';

const testFromHtmlToDraftEditorStateAndBack = (htmlFixture: any) => {
    const contentState = toContentState(htmlFixture);
    const htmlOut = toHTML(contentState);
    expect(htmlOut).toBe(htmlFixture);
};

describe.only('XRichComponent', () => {
    it('converts one mention with span', () => {
        testFromHtmlToDraftEditorStateAndBack(
            '<p><span data-mention-id="123">@Sergey Lapin</span></p>',
        );
    });

    it('converts two mention with span', () => {
        testFromHtmlToDraftEditorStateAndBack(
            '<p><span data-mention-id="123">@Sergey Lapin</span> <span data-mention-id="456">@Other Guy</span></p>',
        );
    });

    it('html to db format', () => {
        const str =
            '<p><span data-mention-id="123">@Sergey Lapin</span> 123 <span data-mention-id="456">@Other Guy</span></p>';

        const res = htmlMessageToDbFormat(str);

        expect(res).toEqual({
            mentions: ['123', '456'],
            text: '@Sergey Lapin 123 @Other Guy',
        });
    });

    it('db format to react component', () => {
        expect(
            renderer
                .create(
                    <MessageWithMentionsTextComponent
                        text={'@Sergey Lapin 123 @Other Guy'}
                        mentions={[
                            { id: '123', name: '@Sergey Lapin' } as any,
                            { id: '456', name: '@Other Guy' } as any,
                        ]}
                    />,
                )
                .toJSON(),
        ).toMatchSnapshot();
    });
});
