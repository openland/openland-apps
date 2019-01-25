export type MentionSpan =
    | {
          type: 'text';
          text: string;
      }
    | {
          type: 'user';
          text: string;
          user: any;
      };

function extractMentions(mentions: any, alphaMentions: any): { user: any; match: string }[] {
    let res = [];
    if (alphaMentions) {
        res = alphaMentions
            .filter(({ __typename }: any) => {
                return __typename === 'UserMention';
            })
            .map((item: any) => {
                return { user: item.user, match: item.user.name };
            });
    } else if (mentions) {
        res = mentions.map((v: any) => ({ user: v, match: v.name }));
    }
    return res;
}

export function preprocessMentions(src: string, simpleMentions: any, alphaMentions: any) {
    // Convert mention arguments
    let mentions = extractMentions(simpleMentions, alphaMentions);
    if (mentions.length === 0) {
        return [
            {
                type: 'text',
                text: src,
            },
        ] as MentionSpan[];
    }

    let res: MentionSpan[] = [];
    let offset = 0;
    outer: while (offset < src.length) {
        // Search for mentions
        let mentionStart = src.indexOf('@', offset);
        if (mentionStart >= 0) {
            // Trying to match mention
            for (let m of mentions) {
                if (src.startsWith(m.match, mentionStart + 1)) {
                    // Unprocessed text before mention
                    if (mentionStart > offset) {
                        res.push({
                            type: 'text',
                            text: src.substring(offset, mentionStart),
                        });
                    }

                    // Mention itself
                    res.push({
                        type: 'user',
                        text: src.substring(mentionStart + 1, mentionStart + 1 + m.match.length),
                        user: m.user,
                    });

                    // Move offset
                    offset = mentionStart + m.match.length + 1;

                    continue outer;
                }
            }

            // Move offset
            offset = mentionStart + 1;
        } else {
            break;
        }
    }

    // Remaining text
    if (offset < src.length) {
        res.push({ type: 'text', text: src.substring(offset) });
    }

    return res;
}
