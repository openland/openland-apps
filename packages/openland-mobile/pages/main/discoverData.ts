import { prepareDiscoverStatus } from './Discover';

export type Tag = { id: string, title: string, score: number };
export type TagGroup = { id: string, title?: string, tags: Tag[], score: number };
export type Page = { id: string, title: string, subtitle?: string, groups: TagGroup[], rootGroups: string[], treeTagToGroupModel: { tagId: string, groupId: string }[] };
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
            let group: TagGroup = { id: tagsGroups[i] + '_' + i, title: meta ? meta.title : undefined, score: meta ? meta.score : 1, tags: [] };
            this.tagsGroupsMap.set(tagsGroups[i], group);
        }
        for (let i = 1; i < split.length; i++) {
            let line = this.csvToArray(split[i]);
            // parse chat tags
            let tags: string[] = [];
            for (let j = 3; j < tagsGroups.length; j++) {
                tags.push(...line[j].replace('"', '').split(',').map(s => s.trim()).filter(s => !!s))
            }
            let linkSplit = line[2].split('/');
            this.chats.push({ id: linkSplit[linkSplit.length - 1], tags })

            // fill tags groups
            for (let j = 3; j < tagsGroups.length; j++) {
                let groupId = tagsGroups[j];
                let group = this.tagsGroupsMap.get(groupId)!;
                let lineTags = line[j].replace('"', '').split(',').map(s => s.trim()).filter(s => !!s);
                for (let t of lineTags) {
                    let tagId = t + '_' + groupId;
                    if (!this.tagsGroupsMap.get(groupId)!.tags.find(tag => tag.id === tagId)) {
                        let tag = { title: t, id: tagId, score: group.score };
                        this.tagsGroupsMap.get(groupId)!.tags.push(tag)
                        this.tagsMap.set(tagId, tag);
                    }
                }
            }
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

    groupForTag: { tagId: string, groupId: string }[] = [
        { tagId: 'Engineer', groupId: 'Engeneer_sub' },
        { tagId: 'Founder', groupId: 'Industry' },
        { tagId: 'IT', groupId: 'IT_sub' },
    ]

    pages: { [tag: string]: PageModel | undefined } = {
        root: {
            title: 'Discover chats',
            subtitle: 'Help us find the right chats for you',
            tagGroups: [
                { title: 'What areas have you worked on?', groups: ['Role', 'Profession'] },
            ]
        },
        'Founder': {
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
                    if (!row.tags.includes('Founder') || [...tagsIds.values()].find(t => t === 'Founder' || t === 'Investor')) {
                        let tag = this.tagsMap.get(tagId);
                        resMap.set(row, (resMap.get(row) || 0) + (tag ? tag.score : 0));
                    }
                }
            }
        }

        return [...resMap].filter(e => !!e[0].id).sort((a, b) => b[1] - a[1]).map(e => e[0]);
    }

    public next: (selected?: string[]) => { page?: Page, chatIds?: string[] } = (selected: string[]) => {
        let pageModel: PageModel | undefined;

        if (!selected) {
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
            let resPage: Page = { id: 'root', title: pageModel.title, subtitle: pageModel.subtitle, groups: [], treeTagToGroupModel: [], rootGroups: [] };
            pageModel.tagGroups.map((groupModel) => {
                if (typeof groupModel === 'string') {
                    let group = this.tagsGroupsMap.get(groupModel);
                    if (group) {
                        resPage.rootGroups.push(groupModel);
                    }
                } else {
                    let id = '';
                    let tags: Tag[] = [];
                    groupModel.groups.map(g => {
                        (this.tagsGroupsMap.get(g) || { tags: [] as Tag[] }).tags.map(t => tags.push(t))
                        id += '_' + g;
                    });
                    resPage.rootGroups.push(id);
                }
            });
            // TODO: iterate tree, add all neede
            let neededGrous = new Set<TagGroup>();
            let neededModel = new Set<{ tagId: string, groupId: string }>();
            for (let groupId of resPage.rootGroups) {
                let group = this.tagsGroupsMap.get(groupId)
                if (group) {
                    neededGrous.add(group);
                    for (let tag of group.tags) {
                        tag
                    }
                }
            }
            resPage.treeTagToGroupModel = this.groupForTag;
            return { page: resPage };
        } else {
            // just pick chats for now;
            return { chatIds: this.resolveSuggestedChats(selected).map(c => c.id) };
        }
    }
}

// export class DiscoverDataHelper {
//     page: Page;
//     constructor(page: Page) {
//         this.page = page;
//     }

//     getTagGroup = (name: string): TagGroup => {
//         let meta = this.model.groupMeta[name];
//         return { id: name, tags: this.model.tagsGroupsMap.get(name) || [], title: meta && meta.title };
//     }

//     getSubTags = (tag: Tag) => {
//         let tags = [tag.title];
//         let res: Tag[] = [];
//         let t = tags.pop();
//         while (t) {
//             let sub = this.model.tagsGroupsMap[t]
//             if (sub) {
//                 tags.push(...this.getTagGroup(sub).tags.map(t1 => t1.title));
//                 res.push(...(this.getTagGroup(sub).tags))
//             }
//             t = tags.pop();
//         }
//         return res;
//     }

//     havePageForTag = (tag: string) => {
//         return !!this.model.pages[tag];
//     }

//     getSubTagGroup = (tag: string) => {
//         return this.model.tagsGroupsMap[tag] ? this.getTagGroup(this.model.tagsGroupsMap[tag]!) : undefined;
//     }

//     getPageForTag: (tag: string) => { title?: string, subtitle?: string, groups: TagGroup[] } = (tag: string) => {
//         let page = this.model.pages[tag] || { tagGroups: [] };
//         let groups = page.tagGroups.map((gr, i) => {
//             if (typeof gr === 'string') {
//                 return this.getTagGroup(gr);
//             } else {
//                 let res1 = { name: 'combined_' + i, title: gr.title, tags: [] as Tag[] };
//                 gr.groups.map(g => (((_tagsGroupsMap.get(g) || [] as Tag[]).map(t => res1.tags.push(t)))));
//                 return res1;
//             }
//         });
//         return { title: page.title, subtitle: page.subtitle, groups };
//     }

// }