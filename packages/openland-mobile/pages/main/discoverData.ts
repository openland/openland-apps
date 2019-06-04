export type Tag = { id: string, title: string, score: number };
export type TagGroup = { id: string, title?: string, subtitle?: string, tags: Tag[], score: number };

const _data = `Name,Link,Role,Founder_sub_1,Founder_sub_2,Engineer_sub,all triggers
Score: 4 (in the end of recommendations list),,,,,,
Founder Chats,https://openland.com/mail/p/ZYx4d9K6kjIZ5jo6r69zc4AX3v,Founder,,,,"Founder, "
Founders · Random,https://openland.com/mail/3Ym4RrOAbxIMAa43Qv1WFDymz4,Founder,,,,"Founder, "
Venture Capital,https://openland.com/directory/r/nqoZQV6zYQCmnRv19evPSMJPaE,Investor,,,,"Investor, "
Accelerators,https://openland.com/directory/r/qljZr9WbgLiL6YK0gDO6faQVYV,Investor,,,,"Investor, "
Product Chats,https://openland.com/mail/rAb139w0Mzc4XrgvdxvEH5DYRO,Product manager,,,,"Product manager, "
Openland Tech,https://openland.com/mail/p/LOLqoerbADtq4xDP0dBzuwJwx3,Engineer,,,,"Engineer, "
Engineer Chats,https://openland.com/mail/p/VywdDrg3byuRx0dqmyaRfrR7Pb,Engineer,,,,"Engineer, "
Engineers · Random,https://openland.com/mail/p/Y96dY7aOP9UAMLbZpoAJHdqdKg,Engineer,,,,"Engineer, "
Community Managers 😎,https://openland.com/mail/p/Rgq6MV7Q5gCb6r53E1koT7BMBZ,Community manager,,,,"Community manager, "
Openland News,https://openland.com/mail/p/EQvPJ1LamRtJJ9ppVxDDs30Jzw,"Community manager,Designer,Engineer,Founder,Investor,Other roles,Product manager,Recruiter",,,,"Founder, Investor, Product manager, Engineer, Designer, Recruiter, Other roles, Community manager, "
,,,,,,
Score: 2,,,,,,
Proptech,https://openland.com/mail/p/EQvPJ1LaODS1WAAx65wVI3m55l,Founder,Proptech,,,"Founder, "
The Future of Messaging,https://openland.com/mail/p/ZYx4d9K6VmhljdO6qm5pi7ORMB,Founder,Messaging,,,"Founder, "
Fintech Founders,https://openland.com/directory/r/nqoZQV6zYXIWAk34Qak1UMMeeZ,Founder,Fintech,,,"Founder, "
Marketing Tech Founders,https://openland.com/directory/r/wW4975KQkLixVAznByLlTO1Mna,Founder,Marketing Tech,,,"Founder, "
HR Tech Founders,https://openland.com/directory/r/0DW7dl3rzJFvjn5m0vELuxA3Xq,Founder,HR Tech,,,"Founder, "
Media Founders,https://openland.com/directory/r/9KkDvyowQmCRx7MpJ6LghDvXkA,Founder,Media,,,"Founder, "
Healthcare Founders,https://openland.com/directory/r/b5RYKeLkwWixOd6BO94OFyqxDP,Founder,Healthcare,,,"Founder, "
Social Apps Founders,https://openland.com/directory/r/mJvq41O57dsbEXWqDy9yCzdAEr,Founder,Social apps,,,"Founder, "
Dev Tools Founders,https://openland.com/directory/r/b5RYKeLkwgtPE7q3r5kAhvowlW,Founder,Dev Tools,,,"Founder, "
Local Tech Founders,https://openland.com/directory/r/jZVjLe3a7YfEKvb6PAY5CXWBdo,Founder,Local Tech,,,"Founder, "
EdTech Founders,https://openland.com/directory/r/vmZR69a4k0FoVWZXZk7zHBakbn,Founder,EdTech,,,"Founder, "
Ecommerce Founders,https://openland.com/directory/r/g065jdJYwku3WXVk5RweFlDmaD,Founder,Ecommerce,,,"Founder, "
Productivity Tech Founders,https://openland.com/directory/r/vmZR69a4k0FP1knWjYyWsBP95J,Founder,Productivity Tech,,,"Founder, "
Transportation Founders,https://openland.com/directory/r/b5RYKeLkwWimlnLrrWxdtYqZQe,Founder,Transportation,,,"Founder, "
Security Founders,https://openland.com/directory/r/b5RYKeLkw5FK3BOWoRk1ulYo5v,Founder,Security,,,"Founder, "
AI Founders,https://openland.com/mail/Om49WwAP7BspmarAvko0fWPj1R,Founder,AI,,,"Founder, "
AR/VR Founders,https://openland.com/directory/r/dB6k5PZDyoUdYvlJkRmeCekQe5,Founder,AR / VR,,,"Founder, "
Crypto Founders,https://openland.com/directory/r/zoqLwdzrE5CMJpgkRrmZTWeReK,Founder,Cryptocurrencies,,,"Founder, "
SaaS Founders,https://openland.com/mail/mJvq41O57dsqWMbzL5okUzJgEP,Founder,SaaS,,,"Founder, "
Marketplace Founders,https://openland.com/mail/dB6k5PZDyoUOgOzWr73yi7VjDm,Founder,Marketplace,,,"Founder, "
Hardware Founders,https://openland.com/directory/r/BPV0ZljY7PtKZp3X9LQaUaenWX,Founder,Hardware,,,"Founder, "
Mental Health Founders,https://openland.com/directory/r/qljZr9Wb7VFwq4epebo4Uaqk1w,Founder,Mental Health,,,"Founder, "
Parenting Tech,https://openland.com/directory/r/Ko0zOxqjenu5mve3QD7VIWQnOe,Founder,Parenting Tech,,,"Founder, "
Travel Tech Founders,https://openland.com/directory/r/zoqLwdzrErcQq33MPbPRfQZZpZ,Founder,Travel Tech,,,"Founder, "
Gaming Founders,https://openland.com/directory/r/av6pa90nyvTVVKrzPkD4ij6dkx,Founder,Gaming,,,"Founder, "
Food Tech Founders,https://openland.com/directory/r/jZVjLe3a7pUBmBRDxPWjHoP7bw,Founder,Food Tech,,,"Founder, "
Ag Tech Founders,https://openland.com/directory/r/9KkDvyowQRImMglYKJAOc40JQ6,Founder,AgTech,,,"Founder, "
Biotech Founders,https://openland.com/directory/r/wW4975KQkDf74YmLABoEsMq3WR,Founder,Biotech,,,"Founder, "
Fashion Tech Founders,https://openland.com/directory/r/orzRJa7oMecnnPDexZLzTpjXd0,Founder,Fashion Tech,,,"Founder, "
Urbantech Founders,https://openland.com/mail/p/jZVjLe3a7ZCLDmZOPb9otP5jxM,Founder,Urbantech,,,"Founder, "
Legal Tech,https://openland.com/directory/r/ZYx4d9K6kPFZArMYBpxkS0Brdp,Founder,Legal Tech,,,"Founder, "
Hard Tech Founders,https://openland.com/directory/r/7Vd4aLWmZRFPPBAnl5x9fPJPor,Founder,Hard Tech,,,"Founder, "
Nonprofit Founders,https://openland.com/directory/r/M6Pl7R30AmCvZZ31pXzdidVb33,Founder,Nonprofit,,,"Founder, "
MusicTech Founders,https://openland.com/directory/r/Ko0zOxqjeyUagOeQlWEZT49JmO,Founder,Music Tech,,,"Founder, "
,,,,,,
Score: 1,,,,,,
Next Chapter,https://openland.com/mail/p/BPV0ZljY7qcAPAw709vpurpOaK,Founder,,Next role / co-founder search,,"Founder, "
Market Research,https://openland.com/mail/p/Om49WwAP7Wfjezv0dBAPt4kLvb,Founder,,Market exploration,,"Founder, "
CTOs,https://openland.com/directory/r/lQKjZMAv71tMWAXRlwRlF6dWWv,Founder,,Technology development,,"Founder, "
Product Launch,https://openland.com/directory/r/vmZR69a4k0FoqJEJDykRIyeZ3q,Founder,,Product launch,,"Founder, "
Product Feedback,https://next.openland.com/directory/r/D4KeQl0V7RH0V07lvyOvClDe1a,Founder,,Product launch,,"Founder, "
Fundraising Help,https://openland.com/mail/p/4dmAE76OeWfR4qn9kdQKcZaQKy,Founder,,Fundraising,,"Founder, "
Pitch Deck Review,https://openland.com/directory/r/5Xmd1J76LRujqV4zjjwrIDWBwK,Founder,,Fundraising,,"Founder, "
Fundraising Tactics,https://openland.com/directory/r/jZVjLe3a4pfxmD6yOO9YUXljM7,Founder,,Fundraising,,"Founder, "
Growth Chats,https://openland.com/mail/p/VywdDrg3AJfkdXYkMznpibbnWJ,Founder,,Growth,,"Founder, "
B2B Sales,https://openland.com/mail/Ko0zOxqje5TRbYgjvA6xu4jAjV,Founder,,Sales,,"Founder, "
Customer Leads,https://openland.com/directory/r/xwQxobvJ7BfdVopQvoBYsOkmPR,Founder,,Sales,,"Founder, "
Recruiting Help,https://openland.com/directory/r/Rgq6MV7Q59TLP5lKdyXqc3MEjm,Founder,,Recruiting,,"Founder, "
Services for Startups,https://openland.com/directory/r/Rgq6MV7QAPUK7XoJ5jV5I4xnBm,Founder,,Selling to startups,,"Founder, "
Startup Operations,https://openland.com/mail/p/jZVjLe3a7giOmDPEgxebsKROWk,Founder,,Operations,,"Founder, "
Founders · Ask for Intros,https://openland.com/mail/5Xmd1J76LRu0ZxBoYxvZswQeWz,Founder,,Networking,,"Founder, "
,,,,,,
Score: 3,,,,,,
JS Jobs in the Valley,https://openland.com/mail/7Vd4aLWmOMuLBK7AQr4ZSmVQdp,Engineer,,,JS,"Engineer, "
Node JS,https://next.openland.com/mail/BPV0ZljYdehQ9wR9MoLJIrLrLa,Engineer,,,JS,"Engineer, "
React,https://openland.com/mail/xwQxobvJaBUdvQPZBw47hMl6B1,Engineer,,,React,"Engineer, "
React Native,https://openland.com/mail/p/0DW7dl3rzXCeaqVmnMY3UP703k,Engineer,,,React,"Engineer, "
Frontend,https://openland.com/mail/p/D4KeQl0V7xhJYmRpqWABflZZWM,Engineer,,,Frontend,"Engineer, "
FoundationDB,https://openland.com/mail/Y96dY7aO1DsL0B9rVQrrUml5q5,Engineer,,,FoundationDB,"Engineer, "
CTOs,https://openland.com/directory/r/lQKjZMAv71tMWAXRlwRlF6dWWv,Engineer,,,CTO,"Engineer, "`

type Chat = { id: string, tags: string[] };
export class DiscoverApi {
    chats: Chat[] = []
    tagsMap = new Map<string, Tag>();
    tagsGroupsMap = new Map<string, TagGroup>();
    constructor() {
        let split = _data.split('\n');

        let tagsGroups = split[0].split(',');
        // init tag groups
        for (let i = 2; i < tagsGroups.length; i++) {
            let groupId = tagsGroups[i];
            let meta = this.groupMeta[groupId];
            let group: TagGroup = { id: tagsGroups[i], title: meta ? meta.title : undefined, score: meta ? meta.score : 1, tags: [], subtitle: meta ? meta.subtitle : undefined };
            this.tagsGroupsMap.set(tagsGroups[i], group);
        }
        for (let i = 1; i < split.length; i++) {
            let line = this.csvToArray(split[i]);
            // parse chat tags
            let tags: string[] = [];

            // fill tags groups
            for (let j = 2; j < tagsGroups.length; j++) {
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

            let linkSplit = line[1].split('/');
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

    groupMeta: { [group: string]: { score: number, title?: string, subtitle?: string } | undefined } = {
        'Role': { score: 1, title: 'Your role', subtitle: 'What roles have you played?' },
        'Founder_sub_1': { score: 2, title: 'Areas of work', subtitle: 'What areas have you worked on?' },
        'Founder_sub_2': { score: 3, title: 'Priorities', subtitle: 'What are your key priorities?' },
        'Engineer_sub': { score: 3, title: 'Tech expertise', subtitle: 'What are your areas of ​​expertise?' },
    }

    tagToGroup: { [tag: string]: string[] } = {
        'Profession_Engineer': ['Engeneer_sub'],
        'Role_Founder': ['Founder_sub_1', 'Founder_sub_2'],
    }
    resolveSuggestedChats = (tagsIds: string[]) => {
        let resMap = new Map<Chat, number>();
        for (let tagId of tagsIds) {
            for (let row of this.chats) {
                if (row.tags.includes(tagId)) {
                    // founder category is exeptional - show it only if Founder or Investor tag selected
                    // if (!row.tags.includes('Role_Founder') || [...tagsIds.values()].find(t => t === 'Role_Founder' || t === 'Role_Investor')) {
                    let tag = this.tagsMap.get(tagId);
                    resMap.set(row, (resMap.get(row) || 0) + (tag ? tag.score : 0));
                    // }
                }
            }
        }

        return [...resMap].filter(e => !!e[0].id).sort((a, b) => b[1] - a[1]).map(e => e[0]);
    }

    public next: (selected: string[], excludeGroups: string[]) => { group?: TagGroup, chatIds?: string[] } = (selected: string[], excludeGroups: string[]) => {
        let group: TagGroup | undefined;

        if (!selected.length && !excludeGroups.length) {
            group = this.tagsGroupsMap.get('Role');
        } else {
            outer: for (let s of selected) {
                let groupIds = this.tagToGroup[s] || [];
                for (let groupId of groupIds) {
                    if (excludeGroups.includes(groupId || '')) {
                        continue;
                    }
                    group = this.tagsGroupsMap.get(groupId);
                    if (group) {
                        break outer;
                    }
                }
            }
        }
        if (group) {
            return { group };
        } else {
            // just pick chats for now;
            return { chatIds: this.resolveSuggestedChats(selected).map(c => c.id) };
        }
    }
}
