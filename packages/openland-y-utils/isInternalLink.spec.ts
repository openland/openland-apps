import { isInternalLink } from './isInternalLink';

describe('isInternalLink', () => {
    it('should handle actual internal links', () => {
        expect(isInternalLink('openland.com')).toBe(true);
        expect(isInternalLink('http://openland.com')).toBe(true);
        expect(isInternalLink('https://openland.com')).toBe(true);
        expect(isInternalLink('//openland.com')).toBe(true);

        expect(isInternalLink('openland.com/arbitrary')).toBe(true);
        expect(isInternalLink('http://openland.com/arbitrary')).toBe(true);
        expect(isInternalLink('//openland.com/arbitrary')).toBe(true);

        expect(isInternalLink('next.openland.com/arbitrary')).toBe(true);
        expect(isInternalLink('http://next.openland.com/arbitrary')).toBe(true);
        expect(isInternalLink('//next.openland.com/arbitrary')).toBe(true);
    });

    it('should ignore subdomains other than app and next', () => {
        expect(isInternalLink('files.openland.com/arbitrary')).toBe(false);
    });

    it('should handle protocols different than http(s) and empty protocol', () => {
        expect(isInternalLink('ftp://openland.com')).toBe(false);
        expect(isInternalLink('ws://openland.com')).toBe(false);
    });

    it('should handle domains that do not belong to openland', () => {
        expect(isInternalLink('google.com')).toBe(false);

        expect(isInternalLink('openland.com.google.com')).toBe(false);
    });

    it('should handle invalid urls', () => {
        expect(isInternalLink('googlecom')).toBe(false);
    });
});