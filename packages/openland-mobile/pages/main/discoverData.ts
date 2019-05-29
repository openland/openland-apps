let _data = `Name,all triggers,Link,Role,Profession,Industry,Goal,Engeneer_sub,IT_sub
,,,,,,,,AI
Founder Chats,"Founder, ",https://next.openland.com/mail/ZYx4d9K6kjIZ5jo6r69zc4AX3v,Founder,,,,,
HR Tech Founders,"Founder, Engineer, Recruiter, IT, HR, ",https://next.openland.com/mail/0DW7dl3rzJFvjn5m0vELuxA3Xq,Founder,"Engineer,Recruiter","HR,IT",,,
Welcome Guide,"Founder, ",https://next.openland.com/mail/7Vd4aLWmZzHaX9waypnocXM9PZ,Founder,,,,,
YC Applicants Help,"Founder, Investor, ",https://next.openland.com/mail/1pm4Xrl3AMf1EjPWlX5oHdz7KY,"Founder,Investor",,,Fundraising,,
Remote Engineers,"Engineer, IT, ",https://next.openland.com/mail/61MyVnm7YDfzqmJvMzR6Ul6RXb,,Engineer,IT,Recruitment,,
Openland Tech,"Engineer, IT, ",https://next.openland.com/mail/LOLqoerbADtq4xDP0dBzuwJwx3,,Engineer,IT,,,
Proptech,"Real Estate, ",https://next.openland.com/mail/EQvPJ1LaODS1WAAx65wVI3m55l,,,Real Estate,,,
Frontend,"Engineer, ",https://next.openland.com/mail/D4KeQl0V7xhJYmRpqWABflZZWM,,Engineer,,,Frontend,
FoundationDB,"Engineer, ",https://next.openland.com/mail/Y96dY7aO1DsL0B9rVQrrUml5q5,,Engineer,,,Backend,
AI Founders,"Founder, IT, ",https://next.openland.com/mail/Om49WwAP7BspmarAvko0fWPj1R,Founder,,IT,,,AI
,,,,,,,,`

function csvToArray(text: string) {
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

type Row = { name: string, id: string, tags: string[] };
export type Tag = { name: string, group: string, score: number };
let _parsed: Row[]
let _tagsGroupsMap = new Map<string, Tag[]>();
let _tagsGroups: { name: string, tags: Tag[] }[] = [];

let _getGroupScore = (group: string) => {
    if (group === 'Role') {
        return 1;
    } else if (group === 'Profession') {
        return 2;
    } else if (group === 'Industry') {
        return 3;
    } else if (group === 'Goal') {
        return 4;
    }

    return 1;
}

let _prepare = () => {
    if (!_parsed) {
        _parsed = []

        let split = _data.split('\n');

        let tagsGroups = split[0].split(',');
        // init tag groups
        for (let i = 3; i < tagsGroups.length; i++) {
            let array: Tag[] = [];
            _tagsGroupsMap.set(tagsGroups[i], array);
            _tagsGroups.push({ name: tagsGroups[i], tags: array });
        }
        for (let i = 1; i < split.length; i++) {
            let line = csvToArray(split[i]);
            // parse chat tags, goals
            let tags: string[] = [];
            for (let j = 3; j < tagsGroups.length; j++) {
                tags.push(...line[j].replace('"', '').split(',').map(s => s.trim()).filter(s => !!s))
            }
            let linkSplit = line[2].split('/');
            _parsed.push({ name: line[0], id: linkSplit[linkSplit.length - 1], tags })

            // fill tags groups
            for (let j = 3; j < tagsGroups.length; j++) {
                let groupName = tagsGroups[j];
                let lineTags = line[j].replace('"', '').split(',').map(s => s.trim()).filter(s => !!s);
                for (let t of lineTags) {
                    if (!_tagsGroupsMap.get(groupName)!.find(tag => tag.name === t)) {
                        _tagsGroupsMap.get(groupName)!.push({ name: t, group: groupName, score: _getGroupScore(groupName) })
                    }
                }
            }
        }
    }
}

export const getData = () => {
    _prepare();
    return _parsed;
}

export const getTags = () => {
    _prepare();
    return _tagsGroups
}

export const getRootTags = () => {
    _prepare();
    let res: { name: string, tags: Tag[] }[] = []
    let roleExt: Tag[] = []
    res.push({ name: 'role_ext', tags: roleExt });
    for (let g of _tagsGroups) {
        if (g.name === 'Role' || g.name === 'Profession') {
            roleExt.push(...g.tags);
        } else if (g.name === 'Industry') {
            res.push(g);
        }
    }
    return res
}

export const getPreprocessedTags2 = () => {
    _prepare();
    let res: { name: string, tags: Tag[] }[] = []
    for (let g of _tagsGroups) {
        if (g.name === 'Goal') {
            res.push(g);
        }
    }
    return res
}

export const resolveSuggestedChats = (tags: Set<Tag>) => {
    let resMap = new Map<Row, number>();
    for (let tag of tags) {
        for (let row of _parsed) {
            if (row.tags.includes(tag.name)) {
                // founder category is exeptional - show it only if Founder or Investor tag selected
                if (!row.tags.includes('Founder') || [...tags.values()].find(t => t.name === 'Founder' || t.name === 'Investor')) {
                    resMap.set(row, (resMap.get(row) || 0) + tag.score);
                }
            }
        }
    }

    return [...resMap].filter(e => !!e[0].id).sort((a, b) => b[1] - a[1]).map(e => e[0]);

}

export const getTagGroup = (name: string) => {
    _prepare();
    return { name, tags: _tagsGroupsMap.get(name) || [] };
}

export const tagsGroupsMap = {
    'Engineer': 'Engeneer_sub',
    // 'Founder': 'Industry',
    'IT': 'IT_sub',
}

export const getSubTags = (tag: Tag) => {
    if (tagsGroupsMap[tag.name]) {
        return getTagGroup(tagsGroupsMap[tag.name]).tags.map(t => t)
    }
    return [];
}