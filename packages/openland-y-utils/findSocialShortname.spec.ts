import { findSocialShortname as f } from './findSocialShortname';

describe('Social Shortnames Parser', () => {
    it('should parse sites', () => {
        expect(f.site('https://openland.com')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('https://openland.com/')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('http://openland.com/')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('//openland.com/')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('https://www.openland.com')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('https://www.openland.com/')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('http://www.openland.com/')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('//www.openland.com/')).toEqual({ name: 'openland.com', url: 'https://openland.com/' });
        expect(f.site('openland.com/about')).toEqual({ name: 'openland.com/about', url: 'https://openland.com/about/' });
        expect(f.site('www.openland.com/about/')).toEqual({ name: 'openland.com/about', url: 'https://openland.com/about/' });
    });

    it('should parse instagram', () => {
        expect(f.instagram('@openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
        expect(f.instagram('openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
        expect(f.instagram('https://www.instagram.com/')).toBe(null);
        expect(f.instagram('https://www.instagram.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
        expect(f.instagram('instagram.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
        expect(f.instagram('https://instagram.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
        expect(f.instagram('http://instagram.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
        expect(f.instagram('//instagram.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://instagram.com/openlandhq/' });
    });

    it('should parse twitter', () => {
        expect(f.twitter('@OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('https://www.twitter.com/')).toBe(null);
        expect(f.twitter('https://www.twitter.com/OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('twitter.com/OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('https://twitter.com/OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('https://twitter.com/OpenlandHQ/')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('http://twitter.com/OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('//twitter.com/OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
        expect(f.twitter('//twitter.com/@OpenlandHQ')).toEqual({ name: 'OpenlandHQ', url: 'https://twitter.com/OpenlandHQ/' });
    });

    it('should parse facebook', () => {
        expect(f.facebook('@openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('https://www.facebook.com/')).toBe(null);
        expect(f.facebook('https://www.facebook.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('facebook.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('https://facebook.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('http://facebook.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('//facebook.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });

        expect(f.facebook('https://www.fb.com/')).toBe(null);
        expect(f.facebook('https://www.fb.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('fb.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('https://fb.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('http://fb.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
        expect(f.facebook('//fb.com/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://facebook.com/openlandhq/' });
    });

    it('should parse linkedin', () => {
        expect(f.linkedin('@lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });
        expect(f.linkedin('lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });
        expect(f.linkedin('https://www.linkedin.com/')).toBe(null);
        expect(f.linkedin('https://www.linkedin.com/in/')).toBe(null);
        expect(f.linkedin('https://www.linkedin.com/in/lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });
        expect(f.linkedin('linkedin.com/in/lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });
        expect(f.linkedin('https://linkedin.com/in/lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });
        expect(f.linkedin('http://linkedin.com/in/lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });
        expect(f.linkedin('//linkedin.com/in/lifshits')).toEqual({ name: 'lifshits', url: 'https://linkedin.com/in/lifshits/' });

        expect(f.linkedin('https://www.linkedin.com/company/')).toBe(null);
        expect(f.linkedin('https://www.linkedin.com/company/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://linkedin.com/company/openlandhq/' });
        expect(f.linkedin('linkedin.com/company/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://linkedin.com/company/openlandhq/' });
        expect(f.linkedin('https://linkedin.com/company/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://linkedin.com/company/openlandhq/' });
        expect(f.linkedin('http://linkedin.com/company/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://linkedin.com/company/openlandhq/' });
        expect(f.linkedin('//linkedin.com/company/openlandhq')).toEqual({ name: 'openlandhq', url: 'https://linkedin.com/company/openlandhq/' });
    });
});