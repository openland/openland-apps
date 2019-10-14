import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { UTextArea } from 'openland-web/components/unicorn/UTextArea';

type mapType = Map<string, { title: string; question: string[] | string }>;

export const MemberProfileEditFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const chatId = unicorn && unicorn.query.id;
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;
    const myAnswers = data && data.myProfile && data.myProfile.answers;

    if (!data || !data.questions) {
        return null;
    }

    const [dataQuestions, setDataQuestions] = React.useState<mapType>(new Map());
    const [dataAnswers, setDataAnswers] = React.useState<mapType>(new Map());
    const [newAnswers, setNewAnswers] = React.useState<mapType>(dataAnswers);

    React.useEffect(
        () => {
            const newDataQuestions: mapType = new Map();
            const newDataAnswers: mapType = new Map();
            if (data.questions) {
                data.questions.forEach(i => {
                    if (i.__typename === 'TextMatchmakingQuestion') {
                        newDataQuestions.set(i.id, { title: i.title, question: i.title });
                    } else {
                        newDataQuestions.set(i.id, { title: i.title, question: i.tags });
                    }
                });
            }

            if (myAnswers) {
                myAnswers.forEach(i => {
                    if (i.__typename === 'TextMatchmakingAnswer') {
                        newDataAnswers.set(i.question.id, {
                            title: i.question.title,
                            question: i.answer,
                        });
                    } else {
                        newDataAnswers.set(i.question.id, {
                            title: i.question.title,
                            question: i.tags,
                        });
                    }
                });
            }
            setDataQuestions(newDataQuestions);
            setDataAnswers(newDataAnswers);
            setNewAnswers(newDataAnswers);
        },
        [data.questions, data.myProfile],
    );

    const getSelectOptions = (qid: string) => {
        const selectOptions: { value: string; label: string }[] = [];
        if (!!dataQuestions.get(qid) && typeof dataQuestions.get(qid)!.question !== 'string') {
            (dataQuestions.get(qid)!.question as string[]).map(i => {
                selectOptions.push({ value: i, label: i });
            });
        }

        return selectOptions;
    };

    const onChange = (d: { qid: string; title: string; question: string | string[] }) => {
        const newAnswersMap: mapType = new Map(newAnswers);
        if (typeof d.question === 'string') {
            newAnswersMap.set(d.qid, {
                title: d.title,
                question: d.question,
            });
        } else {
            newAnswersMap.set(d.qid, {
                title: d.title,
                question: d.question,
            });
        }
        setNewAnswers(newAnswersMap);
    };

    const submitAction = async () => {
        type submitAnswers =
            | { questionId: string; text: string }
            | { questionId: string; tags: string[] };

        const submitAnswers: submitAnswers[] = [];

        Array.from(newAnswers).forEach(i => {
            if (typeof i[1].question === 'string' && i[1].question.trim()) {
                submitAnswers.push({
                    questionId: i[0],
                    text: i[1].question.trim(),
                });
            } else if (typeof i[1].question !== 'string') {
                submitAnswers.push({
                    questionId: i[0],
                    tags: i[1].question,
                });
            }
        });
        await client.mutateMatchmakingProfileFill({
            peerId: chatId,
            input: {
                answers: submitAnswers,
            },
        });
        await client.refetchMatchmakingRoom({ peerId: chatId });
        await client.refetchMatchmakingProfile({
            peerId: chatId,
            uid: data.myProfile!.user.id,
        });
    };

    return (
        <Page track="my_member_profile" padded={true}>
            <UHeader title="Edit member profile" />
            <XView marginTop={20} marginBottom={32}>
                {Array.from(dataQuestions).map(i => {
                    if (typeof i[1].question === 'string') {
                        return (
                            <UTextArea
                                placeholder={i[1].title}
                                value={
                                    newAnswers.has(i[0])
                                        ? (newAnswers.get(i[0])!.question as string)
                                        : ''
                                }
                                onChange={val =>
                                    onChange({ qid: i[0], title: i[1].title, question: val })
                                }
                                marginTop={16}
                                height={100}
                                key={i[0]}
                            />
                        );
                    } else {
                        return (
                            <USelect
                                value={newAnswers.has(i[0]) ? newAnswers.get(i[0])!.question : []}
                                options={getSelectOptions(i[0])}
                                multi={true}
                                placeholder={i[1].title}
                                key={i[0]}
                                onChange={(val: []) => {
                                    if (val) {
                                        const newVal: string[] = [];
                                        val.forEach((j: { value: string; label: string }) =>
                                            newVal.push(j.value),
                                        );
                                        onChange({
                                            qid: i[0],
                                            title: i[1].title,
                                            question: newVal,
                                        });
                                    }
                                }}
                            />
                        );
                    }
                })}
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
