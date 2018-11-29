import { myConvertToHtml, myConvertFromHtml } from './draftConversion';

describe.only('XRichComponent', () => {
    it('myConvertFromHtml empty <p></p>', () => {
        const str = '<p></p>';
        expect(myConvertToHtml(myConvertFromHtml(str))).toBe(str);
    });

    it('myConvertFromHtml some other string', () => {
        const str = '<p>123</p>';
        expect(myConvertToHtml(myConvertFromHtml(str))).toBe(str);
    });

    // it('myConvertFromHtml empty <p></p>', () => {
    //     expect(myConvertFromHtml('<p></p>')).toMatchSnapshot();
    // });
});