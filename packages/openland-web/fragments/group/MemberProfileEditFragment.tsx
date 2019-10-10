import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { UTextArea } from 'openland-web/components/unicorn/UTextArea';
import {
    MatchmakingRoom_matchmakingRoom_myProfile_answers_MultiselectMatchmakingAnswer,
    MatchmakingRoom_matchmakingRoom_myProfile_answers_TextMatchmakingAnswer,
    MatchmakingRoomSave_matchmakingRoomSave_questions_MultiselectMatchmakingQuestion,
    MatchmakingRoomSave_matchmakingRoomSave_questions_TextMatchmakingQuestion,
} from 'openland-api/Types';

type textAnswerType = MatchmakingRoom_matchmakingRoom_myProfile_answers_TextMatchmakingAnswer;
type textQuestionType = MatchmakingRoomSave_matchmakingRoomSave_questions_TextMatchmakingQuestion;
type tagAnswerType = MatchmakingRoom_matchmakingRoom_myProfile_answers_MultiselectMatchmakingAnswer;
type tagQuestionType = MatchmakingRoomSave_matchmakingRoomSave_questions_MultiselectMatchmakingQuestion;

export const MemberProfileEditFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const chatId = unicorn && unicorn.query.id;
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;
    const myProfile = data && data.myProfile && data.myProfile.user;
    const myAnswers = data && data.myProfile && data.myProfile.answers;

    if (!myProfile && !myAnswers) {
        return null;
    }

    const myTagsAnswer = myAnswers!.find(
        i => i.__typename === 'MultiselectMatchmakingAnswer',
    ) as tagAnswerType;

    const tagsQuestion = data!.questions!.find(
        i => i.__typename === 'MultiselectMatchmakingQuestion',
    ) as tagQuestionType;

    const myLookingForAnswer = myAnswers!.find(
        i => i.__typename === 'TextMatchmakingAnswer' && i.question.title === 'Looking for',
    ) as textAnswerType;

    const lookingForQuestion = data!.questions!.find(
        i => i.__typename === 'TextMatchmakingQuestion' && i.title === 'Looking for',
    ) as textQuestionType;

    const myCanHelpAnswer = myAnswers!.find(
        i => i.__typename === 'TextMatchmakingAnswer' && i.question.title === 'Can help with',
    ) as textAnswerType;

    const canHelpQuestion = data!.questions!.find(
        i => i.__typename === 'TextMatchmakingQuestion' && i.title === 'Can help with',
    ) as textQuestionType;

    const [tagsAnswer, setTagsAnswer] = React.useState(
        myTagsAnswer ? myTagsAnswer!.tags! : undefined,
    );

    const [lookingFor, setLookingFor] = React.useState<string>(
        myLookingForAnswer ? myLookingForAnswer.answer : '',
    );

    const [canHelpWith, setCanHelpWith] = React.useState<string>(
        myCanHelpAnswer ? myCanHelpAnswer.answer : '',
    );

    const selectOptions: { value: string; label: string }[] = [];

    if (tagsQuestion && tagsQuestion.tags) {
        tagsQuestion.tags.map(i => {
            selectOptions.push({ value: i, label: i });
        });
    }

    const submitAction = async () => {
        type Answers =
            | { questionId: string; text: string }
            | { questionId: string; tags: string[] };

        const newAnswers: Answers[] = [];

        if (tagsAnswer && tagsAnswer.length) {
            newAnswers.push({ questionId: tagsQuestion.id, tags: tagsAnswer });
        }
        if (lookingFor.trim()) {
            newAnswers.push({
                questionId: lookingForQuestion.id,
                text: lookingFor.trim(),
            });
        }
        if (canHelpWith.trim()) {
            newAnswers.push({
                questionId: canHelpQuestion.id,
                text: canHelpWith.trim(),
            });
        }
        await client.mutateMatchmakingProfileFill({
            peerId: chatId,
            input: {
                answers: newAnswers,
            },
        });
        await client.refetchMatchmakingRoom({ peerId: chatId });
    };

    return (
        <Page track="my_member_profile" padded={true}>
            <UHeader title="Edit member profile" />
            <XView marginTop={20} marginBottom={32}>
                {tagsQuestion && (
                    <USelect
                        value={tagsAnswer ? tagsAnswer.map(i => i) : undefined}
                        options={selectOptions}
                        multi={true}
                        placeholder="Interested in"
                        onChange={(o: { value: string; label: string }[]) => {
                            if (o) {
                                const newTagsAnswers: string[] = [];
                                o.map(i => newTagsAnswers.push(i.value));
                                setTagsAnswer(newTagsAnswers);
                            }
                        }}
                    />
                )}
                <UTextArea
                    placeholder="Looking for"
                    value={lookingFor || ''}
                    onChange={setLookingFor}
                    marginTop={16}
                    height={100}
                />
                <UTextArea
                    placeholder="Can help with"
                    value={canHelpWith || ''}
                    onChange={setCanHelpWith}
                    marginTop={16}
                    height={100}
                />
            </XView>
            <UButton
                text="Save changes"
                size="large"
                square={true}
                alignSelf="flex-start"
                action={submitAction}
            />
        </Page>
    );
});
