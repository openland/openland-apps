import React from 'react';
const unionClassNames = require('union-class-names');
const emojione = require('emojione');

export const Emoji = ({
    theme = {},
    cacheBustParam,
    imagePath,
    imageType,
    className,
    decoratedText,
    useNativeArt,
    ...props
}: {
    theme: any;
    cacheBustParam: any;
    imagePath: any;
    imageType: any;
    className: any;
    decoratedText: any;
    useNativeArt: any;
    children: any;
}) => {
    const shortName = emojione.toShort(decoratedText);

    let emojiDisplay = null;
    if (useNativeArt === true) {
        emojiDisplay = <span title={emojione.toShort(decoratedText)}>{props.children}</span>;
    } else {
        // short name to image url code steal from emojione source code
        const shortNameForImage =
            emojione.emojioneList[shortName].unicode[
                emojione.emojioneList[shortName].unicode.length - 1
            ];

        const backgroundImage = `url(${imagePath}${shortNameForImage}.${imageType}${cacheBustParam})`;
        const combinedClassName = unionClassNames(className);

        emojiDisplay = (
            <span
                className={combinedClassName}
                title={emojione.toShort(decoratedText)}
                style={{ backgroundImage }}
            >
                {props.children}
            </span>
        );
    }

    return emojiDisplay;
};
