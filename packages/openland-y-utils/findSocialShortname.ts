interface FindSocialShortnameResult {
    name: string;
    url: string;
}

interface FindSocialShortnameInterface {
    site: (v: string | null) => FindSocialShortnameResult | null;
    instagram: (v: string | null) => FindSocialShortnameResult | null;
    twitter: (v: string | null) => FindSocialShortnameResult | null;
    facebook: (v: string | null) => FindSocialShortnameResult | null;
    linkedin: (v: string | null) => FindSocialShortnameResult | null;
}

const _findName: (opts: { source: string | null, domain: string, url: string, regexp: RegExp }) => FindSocialShortnameResult | null = ({ source, domain, url, regexp }) => {
    if (typeof source !== 'string') {
        return null;
    }

    let link = source.trim();

    if (!link.includes(domain)) {
        link = link.replace('@', '');

        return {
            name: link,
            url: `${url}/${link}/`
        };
    }

    if (link.startsWith('//')) {
        link = link.slice(2, link.length);
    }

    if (link.endsWith('/')) {
        link = link.slice(0, link.length - 1);
    }

    const matches = link.match(regexp);

    if (matches && matches.length === 2) {
        return {
            name: matches[1],
            url: `${url}/${matches[1]}/`
        };
    }

    return null;
};

export const findSocialShortname: FindSocialShortnameInterface = {
    site: (v: string | null) => {
        if (typeof v !== 'string') {
            return null;
        }

        let link = v.trim();

        if (link.startsWith('//')) {
            link = link.slice(2, link.length);
        }

        link = link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');

        if (link.endsWith('/')) {
            link = link.slice(0, link.length - 1);
        }

        return { name: link, url: `https://${link}` };
    },

    instagram: (source: string | null) => {
        return _findName({
            source,
            domain: 'instagram.com',
            url: 'https://instagram.com',
            regexp: new RegExp(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:#!\/)?@?([a-z0-9_]+)(?:\/\w+)*$/i)
        });
    },

    twitter: (source: string | null) => {
        return _findName({
            source,
            domain: 'twitter.com',
            url: 'https://twitter.com',
            regexp: new RegExp(/^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([a-z0-9_]+)(?:\/\w+)*$/i)
        });
    },

    facebook: (source: string | null) => {
        return _findName({
            source: !!source && source.replace('fb.com', 'facebook.com') || source,
            domain: 'facebook.com',
            url: 'https://facebook.com',
            regexp: new RegExp(/^(?:https?:\/\/)?(?:(?:www\.)|(?:[a-z]{2}-[a-z]{2}\.))?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(?:\/)?(\d*[^0-9/?]+\d*)\/?$/i)
        });
    },

    linkedin: (source: string | null) => {
        const entity = !!source && source.includes('/company') ? 'company' : 'in';

        return _findName({
            source,
            domain: 'linkedin.com',
            url: 'https://linkedin.com/' + entity,
            regexp: new RegExp(/^(?:https?:\/\/)?(?:(?:www|\w\w)\.)?linkedin.com\/(?:(?:company\/|in\/)([\w\-]+))/i)
        });
    }
};
