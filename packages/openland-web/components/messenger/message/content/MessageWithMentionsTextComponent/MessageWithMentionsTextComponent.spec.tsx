import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MessageWithMentionsTextComponent } from './MessageWithMentionsTextComponent';
import { sergeyLapinUser } from 'openland-web/pages/dev/ui/messenger/fixtureData';

const renderToJson = (reactElem: any) => renderer.create(reactElem).toJSON();

describe.only('MessageTextComponent', () => {
    it('should render simple text - just text', () => {
        expect(
            renderToJson(<MessageWithMentionsTextComponent text="text" alphaMentions={[]} />),
        ).toMatchSnapshot();
    });

    it('should render simple text - with @', () => {
        expect(
            renderToJson(
                <MessageWithMentionsTextComponent text="@Sergey Lapin" alphaMentions={[]} />,
            ),
        ).toMatchSnapshot();
    });

    it('should render simple text - has alphaMentions, no @', () => {
        expect(
            renderToJson(
                <MessageWithMentionsTextComponent
                    text="no match"
                    alphaMentions={[{ __typename: 'UserMention', user: sergeyLapinUser }]}
                />,
            ),
        ).toMatchSnapshot();
    });

    it('should render mention', () => {
        expect(
            renderToJson(
                <MessageWithMentionsTextComponent
                    text="@Sergey Lapin"
                    alphaMentions={[{ __typename: 'UserMention', user: sergeyLapinUser }]}
                />,
            ),
        ).toMatchSnapshot();
    });
});
