import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XView, XViewRouterContext } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-web/utils/useClient';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { UButton } from 'openland-web/components/unicorn/UButton';

import {
    MatchmakingRoom_matchmakingRoom_questions,
    MatchmakingRoom_matchmakingRoom_questions_TextMatchmakingQuestion,
    MatchmakingRoom_matchmakingRoom_questions_MultiselectMatchmakingQuestion,
} from 'openland-api/Types';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';

type questionT = MatchmakingRoom_matchmakingRoom_questions;
type textQuestionT = MatchmakingRoom_matchmakingRoom_questions_TextMatchmakingQuestion;
type multiQuestionT = MatchmakingRoom_matchmakingRoom_questions_MultiselectMatchmakingQuestion;

interface QuestionComponentProps {
    question: questionT;
    onSubmit: (data: string[] | string) => void;
    defaultValue?: string[] | string;
}

const QuestionComponent = (props: QuestionComponentProps) => {
    const textQuestion =
        props.question.__typename === 'TextMatchmakingQuestion' &&
        (props.question as textQuestionT);
    const multiSelectQuestion =
        props.question.__typename === 'MultiselectMatchmakingQuestion' &&
        (props.question as multiQuestionT);

    const [text, setText] = React.useState('');
    const [tags, setTags] = React.useState<Set<string>>(new Set());

    const onTagClick = (tag: string) => {
        let newTags = new Set<string>(tags);
        newTags.has(tag) ? newTags.delete(tag) : newTags.add(tag);
        setTags(newTags);
    };

    React.useEffect(
        () => {
            if (typeof props.defaultValue === 'string') {
                setText(props.defaultValue);
            } else {
                setTags(new Set(props.defaultValue));
            }
        },
        [props.defaultValue],
    );

    const onSubmit = () => {
        if (!!text.trim()) {
            console.log(text);
            props.onSubmit(text);
        }

        if (tags.size) {
            props.onSubmit(Array.from(tags));
        }
    };

    return (
        <XView alignItems="center">
            <XView marginBottom={30}>{props.question.title}</XView>
            {textQuestion && <UInput value={text} onChange={setText} />}
            {multiSelectQuestion &&
                multiSelectQuestion.tags.map((i, j) => (
                    <div
                        key={'_tag' + j}
                        onClick={() => onTagClick(i)}
                        style={{ backgroundColor: !!(tags && tags.has(i)) ? '#eee' : '#fff' }}
                    >
                        {i}
                    </div>
                ))}
            <UButton
                text="Continue"
                onClick={onSubmit}
                disable={text ? !text.trim() : !(tags && tags.size)}
            />
        </XView>
    );
};

const MatchmakingRootComponent = React.memo(
    (props: { conversation: ConversationEngine; chatId: string; page: string }) => {
        const engine = props.conversation.matchmakingEngine;
        const router = React.useContext(XViewRouterContext)!;

        const client = useClient();
        const data = client.useMatchmakingRoom({ peerId: props.chatId }).matchmakingRoom;
        const haveQuestions = !!(data && data.questions && data.questions.length);

        let current: questionT | undefined = undefined;

        if (haveQuestions) {
            current = data!.questions!.find(i => i.id === props.page);
        }
        if (!current) {
            return null;
        }

        const doSubmit = (d: string[] | string) => {
            let lastAnswers = engine.getState().answers;
            let newAnswers = new Map(lastAnswers);
            newAnswers.set(current!.id, d);
            engine.setAnswer(newAnswers);
            router.navigate(`/matchmaking/${props.chatId}/ask/${current!.id}`);
        };

        return (
            <Page>
                <UHeader title="Matchmaking" appearance="wide" />
                <QuestionComponent
                    question={current}
                    onSubmit={doSubmit}
                    defaultValue={engine.getState().answers.get(current.id)}
                />
            </Page>
        );
    },
);

class MatchmakingComponent extends React.PureComponent<{
    messenger: MessengerEngine;
    chatId: string;
    page: string;
}> {
    private conversation: ConversationEngine | null;

    constructor(props: { messenger: MessengerEngine; chatId: string; page: string }) {
        super(props);
        this.conversation = null;
        this.conversation = props.messenger.getConversation(props.chatId);
    }

    componentDidMount() {
        if (!this.conversation) {
            throw Error('conversation should be defined here');
        }
    }

    render() {
        if (!this.conversation) {
            return null;
        }
        return (
            <MatchmakingRootComponent
                conversation={this.conversation}
                chatId={this.props.chatId}
                page={this.props.page}
            />
        );
    }
}

export const MatchmakingFragment = React.memo(() => {
    let messenger = React.useContext(MessengerContext);
    const unicorn = useUnicorn();
    const chatId = unicorn.query.roomId;
    const page = unicorn.query.res;
    return <MatchmakingComponent messenger={messenger} chatId={chatId} page={page} />;
});
