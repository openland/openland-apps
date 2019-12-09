import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export const colorByExtension = (ext: string, theme: ThemeGlobal) => {
    const colors = {
        [theme.tintGreen]: ['xls', 'xlsx', 'apk', 'css', 'eps', 'jpg', 'jpeg', 'numbers'],
        [theme.tintOrange]: ['zip', 'ai', 'html', 'm4a', 'mp3', 'pages', 'sketch', 'wav'],
        [theme.tintRed]: ['pdf', 'avi', 'gif', 'mov', 'mp4', 'mpeg4', 'ppt', 'pptx'],
        [theme.tintBlue]: ['doc', 'docx', 'js', 'key', 'origami', 'php', 'png', 'psd', 'svg', 'txt', 'xml'],
        [theme.tintPink]: ['fig', 'ind'],
    };
    const entry = Object.entries(colors).find(([_, extensions]) => extensions.includes(ext));
    return entry && entry[0];
};