import * as React from 'react';
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

import { mapToObj, saveToLocalStorage, getFromLocalStorage } from './utils';

type questionT = MatchmakingRoom_matchmakingRoom_questions;
type textQuestionT = MatchmakingRoom_matchmakingRoom_questions_TextMatchmakingQuestion;
type multiQuestionT = MatchmakingRoom_matchmakingRoom_questions_MultiselectMatchmakingQuestion;

interface QuestionComponentProps {
    question: questionT;
    onSubmit: (data: string[] | string) => void;
}

const QuestionComponent = (props: QuestionComponentProps) => {
    const textQuestion =
        props.question.__typename === 'TextMatchmakingQuestion' &&
        (props.question as textQuestionT);
    const multiSelectQuestion =
        props.question.__typename === 'MultiselectMatchmakingQuestion' &&
        (props.question as multiQuestionT);

    const [text, setText] = React.useState('');
    const [tags, setTags] = React.useState<Set<string> | null>(null);

    const onTagClick = (tag: string) => {
        let newTags = tags || new Set<string>();
        newTags.has(tag) ? newTags.delete(tag) : newTags.add(tag);
        setTags(newTags);
    };

    const onSubmit = () => {
        if (!!text.trim()) {
            props.onSubmit(text);
        }

        if (tags) {
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

const MatchmakingComponent = React.memo(() => {
    const [answers, setAnswers] = React.useState<Map<string, string[] | string> | null>(null);
    const router = React.useContext(XViewRouterContext)!;
    const unicorn = useUnicorn();
    const peerId = unicorn.query.roomId;
    const page = unicorn.query.res;

    const client = useClient();
    const questions = client.useMatchmakingRoom({ peerId: peerId }).matchmakingRoom;

    let current: questionT | undefined = undefined;

    if (questions && questions.questions && questions.questions.length) {
        current = questions.questions[page];
    }

    if (!current) {
        return null;
    }

    React.useEffect(
        () => {
            let lastData = getFromLocalStorage(`matchmaiking_${peerId}`);
            if (lastData) {
                setAnswers(lastData);
            }
        },
        [page],
    );

    const doSubmit = (data: string[] | string) => {
        let newAnswers = answers || new Map<string, string[] | string>();
        newAnswers.set(current!.id, data);
        setAnswers(newAnswers);
        saveToLocalStorage(`matchmaiking_${peerId}`, mapToObj(newAnswers));
        router.navigate(`/matchmaking/${peerId}/ask/${Number(page) + 1}`);
    };

    console.log(answers);

    return <QuestionComponent question={current} onSubmit={doSubmit} />;
});

export const MatchmakingFragment = React.memo(() => {
    return (
        <Page>
            <UHeader title="Matchmaking" appearance="wide" />
            <MatchmakingComponent />
        </Page>
    );
});
