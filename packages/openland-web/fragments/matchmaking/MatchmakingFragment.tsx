import * as React from 'react';
import { css, cx } from 'linaria';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XView, XViewRouterContext } from 'react-mental';
import AlertBlanket from 'openland-x/AlertBlanket';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextBody, TextTitle1, TextTitle3 } from 'openland-web/utils/TextStyles';
import { UTextArea } from 'openland-web/components/unicorn/UTextArea';
import {
    MatchmakingRoom_matchmakingRoom_questions,
    MatchmakingRoom_matchmakingRoom_questions_TextMatchmakingQuestion,
    MatchmakingRoom_matchmakingRoom_questions_MultiselectMatchmakingQuestion,
} from 'openland-api/Types';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';

interface TextComponentProps {
    placeholder: string;
    onSubmit: (t: string) => void;
    defaultValue: string | null;
}

const TextComponent = (props: TextComponentProps) => {
    const [text, setText] = React.useState('');

    React.useEffect(
        () => {
            if (!!props.defaultValue) {
                setText(props.defaultValue);
            }
        },
        [props.defaultValue],
    );

    return (
        <XView flexGrow={1}>
            <XView flexGrow={1}>
                <UTextArea
                    alignSelf="center"
                    height={190}
                    maxWidth={368}
                    width="100%"
                    value={text}
                    placeholder={props.placeholder}
                    onChange={setText}
                />
            </XView>
            <UButton
                alignSelf="center"
                size="large"
                text="Continue"
                square={true}
                onClick={!text.trim() ? undefined : () => props.onSubmit(text.trim())}
                disable={!text.trim()}
                marginBottom={60}
                marginTop={20}
            />
        </XView>
    );
};

const tagsContainer = css`
    display: flex;
    flex-wrap: wrap;
    max-width: 315px;
    align-self: center;
`;

const tagContainer = css`
    align-self: flex-start;
    cursor: pointer;
    margin: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: #e2f3ff;
    color: #248bf2;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    line-height: 40px;
    height: 40px;
    transition: color 0.08s ease-in, all 0.15s ease;
    &:hover {
        opacity: 0.8;
    }
`;

const tagContainerSelected = css`
    color: #fff;
    background-color: #0084fe;
`;

interface TagsComponentProps {
    tags: string[];
    defaultValue: string[] | null;
    onSubmit: (t: string[]) => void;
}

const TagsComponent = (props: TagsComponentProps) => {
    const [tags, setTags] = React.useState<Set<string>>(new Set());

    React.useEffect(
        () => {
            if (!!props.defaultValue) {
                setTags(new Set(props.defaultValue));
            }
        },
        [props.defaultValue],
    );

    const onTagClick = (tag: string) => {
        let newTags = new Set<string>(tags);
        newTags.has(tag) ? newTags.delete(tag) : newTags.add(tag);
        setTags(newTags);
    };

    return (
        <XView flexGrow={1}>
            <XView flexGrow={1}>
                <div className={tagsContainer}>
                    {props.tags.map((i, j) => (
                        <div
                            className={cx(tagContainer, tags.has(i) && tagContainerSelected)}
                            key={'_tag' + j}
                            onClick={() => onTagClick(i)}
                        >
                            {i}
                        </div>
                    ))}
                </div>
            </XView>
            <UButton
                alignSelf="center"
                size="large"
                text="Continue"
                square={true}
                onClick={!tags.size ? undefined : () => props.onSubmit(Array.from(tags))}
                disable={!tags.size}
                marginBottom={60}
                marginTop={20}
            />
        </XView>
    );
};

const descriptionContainer = css`
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const titleStyle = css`
    color: var(--foregroundPrimary);
    display: flex;
    justify-content: center;
`;

const subtitleStyle = css`
    color: var(--foregroundSecondary);
    display: flex;
    justify-content: center;
    margin-top: 8px;
`;

type questionT = MatchmakingRoom_matchmakingRoom_questions;
type textQuestionT = MatchmakingRoom_matchmakingRoom_questions_TextMatchmakingQuestion;
type multiQuestionT = MatchmakingRoom_matchmakingRoom_questions_MultiselectMatchmakingQuestion;

interface QuestionComponentProps {
    question: questionT;
    onSubmit: (data: string[] | string | null) => void;
    defaultValue?: string[] | string | null;
}

const skipStyle = css`
    cursor: pointer;
    color: var(--foregroundSecondary);
`;

const TitleRender = (props: { onSkip: () => void }) => {
    const onSkip = () => {
        AlertBlanket.builder()
            .title('Are you sure you want to skip?')
            .message('Eto ne po-pacanski, bro')
            .action(
                'Skip',
                async () => {
                    await props.onSkip();
                },
                'danger',
            )
            .show();
    };
    return (
        <XView flexGrow={1} flexDirection="row" justifyContent="flex-end" alignItems="center">
            <div onClick={onSkip} className={cx(TextTitle3, skipStyle)}>
                Skip
            </div>
        </XView>
    );
};

const QuestionComponent = (props: QuestionComponentProps) => {
    const textQuestion =
        props.question.__typename === 'TextMatchmakingQuestion' &&
        (props.question as textQuestionT);
    const multiSelectQuestion =
        props.question.__typename === 'MultiselectMatchmakingQuestion' &&
        (props.question as multiQuestionT);

    const onTextSubmit = (t: string) => {
        props.onSubmit(t);
    };

    const onTagsSubmit = (t: string[]) => {
        props.onSubmit(t);
    };

    const onSkip = () => {
        props.onSubmit(null);
    };

    return (
        <Page flexGrow={1} track="matchmaking_question" padded={true}>
            <UHeader titleView={textQuestion ? <TitleRender onSkip={onSkip} /> : null} />
            <div className={descriptionContainer}>
                <div className={cx(TextTitle1, titleStyle)}>{props.question.title}</div>
                {props.question.subtitle && (
                    <div className={cx(TextBody, subtitleStyle)}>{props.question.subtitle}</div>
                )}
            </div>
            {textQuestion && (
                <TextComponent
                    placeholder={props.question.title}
                    onSubmit={onTextSubmit}
                    defaultValue={props.defaultValue as string | null}
                />
            )}
            {multiSelectQuestion && (
                <TagsComponent
                    defaultValue={props.defaultValue as string[]}
                    tags={multiSelectQuestion.tags}
                    onSubmit={onTagsSubmit}
                />
            )}
        </Page>
    );
};

const MatchmakingRootComponent = React.memo(
    (props: { conversation: ConversationEngine; chatId: string; page: string }) => {
        const engine = props.conversation.matchmakingEngine;
        const router = React.useContext(XViewRouterContext)!;

        const client = useClient();
        const data = client.useMatchmakingRoom({ peerId: props.chatId }).matchmakingRoom;
        const haveQuestions = !!(data && data.questions && data.questions.length);

        let currentQuestion: questionT | undefined = undefined;
        let nextQuestion: questionT | undefined = undefined;

        if (haveQuestions) {
            data!.questions!.map((i, j) => {
                if (i.id === props.page) {
                    currentQuestion = i;
                    if (data!.questions![j + 1]) {
                        nextQuestion = data!.questions![j + 1];
                    }
                    return;
                }
            });
        }
        if (!currentQuestion) {
            return null;
        }

        const submitAction = async () => {
            await client.mutateMatchmakingProfileFill({
                peerId: props.chatId,
                input: {
                    answers: engine.getAnswers(),
                },
            });
            await client.refetchMatchmakingRoom({ peerId: props.chatId });
            await router.navigate(`/matchmaking/${props.chatId}/created`);
        };

        const doSubmit = (answer: string[] | string | null) => {
            engine.addAnswer(new Map().set(currentQuestion!.id, answer));
            if (nextQuestion) {
                router.navigate(`/matchmaking/${props.chatId}/ask/${nextQuestion.id}`);
            } else {
                submitAction();
            }
        };

        return (
            <QuestionComponent
                question={currentQuestion}
                onSubmit={doSubmit}
                defaultValue={engine.getState().answers.get(currentQuestion!.id)}
            />
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
