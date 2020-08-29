interface FindSocialShortnameResult {
    name: string;
    url: string;
}

interface FindSocialShortnameInterface {
    instagram: (v: string | null) => FindSocialShortnameResult | null;
    twitter: (v: string | null) => FindSocialShortnameResult | null;
    facebook: (v: string | null) => FindSocialShortnameResult | null;
    linkedin: (v: string | null) => FindSocialShortnameResult | null;
}

export const findSocialShortname: FindSocialShortnameInterface = {
    instagram: (v: string | null) => {
        if (typeof v !== 'string') {
            return null;
        }

        let link = v;

        if (!link.includes('instagram.com')) {
            link = link.replace('@', '');

            return {
                name: link,
                url: `https://instagram.com/${link}/`
            };
        }

        if (link.startsWith('//')) {
            link = link.slice(2, link.length);
        }

        const matches = link.match(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:#!\/)?@?([a-z0-9_]+)(?:\/\w+)*$/i);

        if (matches && matches.length === 2) {
            return {
                name: matches[1],
                url: `https://instagram.com/${matches[1]}/`
            };
        }

        return null;
    },

    twitter: (v: string | null) => {
        if (typeof v !== 'string') {
            return null;
        }

        let link = v;

        if (!link.includes('twitter.com')) {
            link = link.replace('@', '');

            return {
                name: link,
                url: `https://twitter.com/${link}/`
            };
        }

        if (link.startsWith('//')) {
            link = link.slice(2, link.length);
        }

        const matches = link.match(/^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([a-z0-9_]+)(?:\/\w+)*$/i);

        if (matches && matches.length === 2) {
            return {
                name: matches[1],
                url: `https://twitter.com/${matches[1]}/`
            };
        }

        return null;
    },

    facebook: (v: string | null) => {
        if (typeof v !== 'string') {
            return null;
        }

        let link = v.replace('fb.com', 'facebook.com');

        if (!link.includes('facebook.com')) {
            link = link.replace('@', '');

            return {
                name: link,
                url: `https://facebook.com/${link}/`
            };
        }

        if (link.startsWith('//')) {
            link = link.slice(2, link.length);
        }

        const matches = link.match(/^(?:https?:\/\/)?(?:(?:www\.)|(?:[a-z]{2}-[a-z]{2}\.))?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(?:\/)?(\d*[^0-9/?]+\d*)\/?$/i);

        if (matches && matches.length === 2) {
            return {
                name: matches[1],
                url: `https://facebook.com/${matches[1]}/`
            };
        }

        return null;
    },

    linkedin: (v: string | null) => {
        if (typeof v !== 'string') {
            return null;
        }

        let link = v;

        if (!link.includes('linkedin.com')) {
            link = link.replace('@', '');

            return {
                name: link,
                url: `https://linkedin.com/in/${link}/`
            };
        }

        if (link.startsWith('//')) {
            link = link.slice(2, link.length);
        }

        const matches = link.match(/^(?:https?:\/\/)?(?:(?:www|\w\w)\.)?linkedin.com\/(?:(?:company\/|in\/)([\w\-]+))/i);

        if (matches && matches.length === 2) {
            const entity = link.includes('/company') ? 'company' : 'in';

            return {
                name: matches[1],
                url: `https://linkedin.com/${entity}/${matches[1]}/`
            };
        }

        return null;
    }
};