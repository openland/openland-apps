import { prepareDiscoverStatus } from './Discover';

export type Tag = { id: string, title: string, score: number };
export type TagGroup = { id: string, title?: string, tags: Tag[], score: number };
export type Page = { id: string, title: string, subtitle?: string, groups: TagGroup[], rootGroups: string[], tagToGroupModel: { tagId: string, groupId: string }[] };
type PageModel = { title: string, subtitle?: string, tagGroups: (string | { title: string, groups: string[] })[] };

const _data = `Name,all triggers,Link,Role,Profession,Industry,Goal,Engeneer_sub,IT_sub
Founder Chats,"Founder, ",https://next.openland.com/mail/ZYx4d9K6kjIZ5jo6r69zc4AX3v,Founder,,,,,
HR Tech Founders,"Founder, Engineer, Recruiter, IT, HR, ",https://next.openland.com/mail/0DW7dl3rzJFvjn5m0vELuxA3Xq,Founder,"Engineer,Recruiter","HR,IT",,,
Welcome Guide,"Founder, ",https://next.openland.com/mail/7Vd4aLWmZzHaX9waypnocXM9PZ,Founder,,,,,
YC Applicants Help,"Founder, Investor, ",https://next.openland.com/mail/1pm4Xrl3AMf1EjPWlX5oHdz7KY,"Founder,Investor",,,Fundraising,,
Remote Engineers,"Engineer, Recruiter, IT, ",https://next.openland.com/mail/61MyVnm7YDfzqmJvMzR6Ul6RXb,,"Engineer,Recruiter",IT,Recruitment,,
Openland Tech,"Engineer, IT, ",https://next.openland.com/mail/LOLqoerbADtq4xDP0dBzuwJwx3,,Engineer,IT,,,
Proptech,"Real Estate, ",https://next.openland.com/mail/EQvPJ1LaODS1WAAx65wVI3m55l,,,Real Estate,,,
Frontend,"Engineer, ",https://next.openland.com/mail/D4KeQl0V7xhJYmRpqWABflZZWM,,Engineer,,,Frontend,
FoundationDB,"Engineer, ",https://next.openland.com/mail/Y96dY7aO1DsL0B9rVQrrUml5q5,,Engineer,,,Backend,
AI Founders,"Founder, IT, ",https://next.openland.com/mail/Om49WwAP7BspmarAvko0fWPj1R,Founder,,IT,,,AI
,,,,,,,,`

type Chat = { id: string, tags: string[] };
export class DiscoverApi {
    chats: Chat[] = []
    tagsMap = new Map<string, Tag>();
    tagsGroupsMap = new Map<string, TagGroup>();
    constructor() {
        let split = _data.split('\n');

        let tagsGroups = split[0].split(',');
        // init tag groups
        for (let i = 3; i < tagsGroups.length; i++) {
            let groupId = tagsGroups[i];
            let meta = this.groupMeta[groupId];
            let group: TagGroup = { id: tagsGroups[i], title: meta ? meta.title : undefined, score: meta ? meta.score : 1, tags: [] };
            this.tagsGroupsMap.set(tagsGroups[i], group);
        }
        for (let i = 1; i < split.length; i++) {
            let line = this.csvToArray(split[i]);
            // parse chat tags
            let tags: string[] = [];

            // fill tags groups
            for (let j = 3; j < tagsGroups.length; j++) {
                let groupId = tagsGroups[j];
                let group = this.tagsGroupsMap.get(groupId)!;
                let lineTags = line[j].replace('"', '').split(',').map(s => s.trim()).filter(s => !!s);
                for (let t of lineTags) {
                    let tagId = groupId + '_' + t;
                    if (!this.tagsGroupsMap.get(groupId)!.tags.find(tag => tag.id === tagId)) {
                        let tag = { title: t, id: tagId, score: group.score };
                        this.tagsGroupsMap.get(groupId)!.tags.push(tag)
                        this.tagsMap.set(tagId, tag);
                    }
                    tags.push(tagId);
                }
            }

            let linkSplit = line[2].split('/');
            this.chats.push({ id: linkSplit[linkSplit.length - 1], tags });
        }
    }

    csvToArray = (text: string) => {
        var reValid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var reValue = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        if (!reValid.test(text)) {
            return [];
        }
        var a = [];
        text.replace(reValue,
            (m0, m1, m2, m3) => {
                if (m1 !== undefined) {
                    a.push(m1.replace(/\\'/g, "'"));
                } else if (m2 !== undefined) {
                    a.push(m2.replace(/\\"/g, '"'));
                } else if (m3 !== undefined) {
                    a.push(m3);
                }
                return '';
            });
        if (/,\s*$/.test(text)) {
            a.push('');
        }
        return a;
    };

    groupMeta: { [group: string]: { score: number, title?: string } | undefined } = {
        'Role': { score: 1 },
        'Profession': { score: 2 },
        'Engeneer_sub': { score: 2, title: 'Interest' },
        'Industry': { score: 3, title: 'Sectors' },
        'IT_sub': { score: 2, title: 'Technologies' },
        'Goal': { score: 5 },
    }

    tagToGroup: { [tag: string]: string | undefined } = {
        'Profession_Engineer': 'Engeneer_sub',
        // 'Role_Founder': 'Industry',
        'Industry_IT': 'IT_sub',
    }

    pages: { [tag: string]: PageModel | undefined } = {
        root: {
            title: 'Discover chats',
            subtitle: 'Help us find the right chats for you',
            tagGroups: [
                { title: 'What areas have you worked on?', groups: ['Role', 'Profession'] },
                'Industry'
            ]
        },
        'Role_Founder': {
            title: 'Priority Tasks',
            subtitle: 'What are your key priorities at the moment?',
            tagGroups: [
                'Goal'
            ]
        }
    }

    resolveSuggestedChats = (tagsIds: string[]) => {
        let resMap = new Map<Chat, number>();
        for (let tagId of tagsIds) {
            for (let row of this.chats) {
                if (row.tags.includes(tagId)) {
                    // founder category is exeptional - show it only if Founder or Investor tag selected
                    if (!row.tags.includes('Role_Founder') || [...tagsIds.values()].find(t => t === 'Role_Founder' || t === 'Role_Investor')) {
                        let tag = this.tagsMap.get(tagId);
                        resMap.set(row, (resMap.get(row) || 0) + (tag ? tag.score : 0));
                    }
                }
            }
        }

        return [...resMap].filter(e => !!e[0].id).sort((a, b) => b[1] - a[1]).map(e => e[0]);
    }

    public next: (selected: string[], allSelected: string[]) => { page?: Page, chatIds?: string[] } = (selected: string[], allSelected: string[]) => {
        let pageModel: PageModel | undefined;

        if (!selected.length && !allSelected.length) {
            pageModel = this.pages.root;
        } else {
            for (let s of selected) {
                pageModel = this.pages[s];
                if (pageModel) {
                    break;
                }
            }
        }

        if (pageModel) {
            let resPage: Page = { id: 'root', title: pageModel.title, subtitle: pageModel.subtitle, groups: [], tagToGroupModel: [], rootGroups: [] };
            let flatGroups = new Set<TagGroup>();

            // find root groups 
            pageModel.tagGroups.map((groupModel) => {
                if (typeof groupModel === 'string') {
                    let group = this.tagsGroupsMap.get(groupModel);
                    if (group) {
                        flatGroups.add({ id: group.id, tags: group.tags, title: group.title, score: 1 });
                        resPage.rootGroups.push(groupModel);
                    }
                } else {
                    let id = '';
                    let groupTags: Tag[] = [];
                    groupModel.groups.map(g => {
                        let group = this.tagsGroupsMap.get(g);
                        if (group) {
                            this.tagsGroupsMap.get(g);
                            group.tags.map(t => groupTags.push(t))
                            id += '_' + g;
                        }

                    });
                    flatGroups.add({ id, tags: groupTags, title: groupModel.title, score: 1 });
                    resPage.rootGroups.push(id);
                }
            });
            // iterate all tags - build tree description
            let tagToGroupProcessed = new Set<string>();
            let tagToGroup: { tagId: string, groupId: string }[] = [];
            let tags: Tag[] = [];
            for (let group of flatGroups) {
                tags.push(...group.tags);
            }
            let tag = tags.pop();
            while (tag) {
                let groupId = this.tagToGroup[tag.id];
                if (groupId) {
                    let group = this.tagsGroupsMap.get(groupId);
                    if (group) {
                        flatGroups.add(group);
                        if (!tagToGroupProcessed.has(tag.id + groupId)) {
                            tagToGroupProcessed.add(tag.id + groupId);
                            tagToGroup.push({ tagId: tag.id, groupId });
                        }
                        tags.push(...group.tags);
                    }
                }
                tag = tags.pop();
            }
            resPage.groups = [...flatGroups.values()];
            resPage.tagToGroupModel = tagToGroup
            return { page: resPage };
        } else {
            // just pick chats for now;
            return { chatIds: this.resolveSuggestedChats(allSelected).map(c => c.id) };
        }
    }
}
