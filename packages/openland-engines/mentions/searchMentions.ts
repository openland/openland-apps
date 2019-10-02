export interface SearchUser {
    name: string;
    shortname?: string | null;

}
export interface SeachMember {
    user: SearchUser;
}
export const searchMentions = <T extends SeachMember>(word: string, members: T[]): T[] => {
    const res: T[] = [];
    const searchString = word.replace('@', '').toLowerCase();

    for (let m of members) {
        let targets = m.user.name.split(' ');
        if (m.user.shortname) {
            targets.push(m.user.shortname);
        }
        for (let t of targets) {
            if (t.toLowerCase().startsWith(searchString)) {
                res.push(m);
                break;
            }
        }
    }

    return res;
};