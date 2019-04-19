import { emoji } from 'openland-y-utils/emoji';

export const emojifyReactions = ({ src, size }: { src: string; size: 25 | 18 }) => {
    if (src === '👍') {
        // margin-right: -2px;
        // margin-left: -2px;
        return emoji({
            src,
            size,
            crop:
                size === 25
                    ? {
                          figureStyle: {
                              width: 20,
                              marginBottom: -4,
                          },
                          imgStyle: {
                              marginLeft: -3,
                              marginRight: -1,
                          },
                      }
                    : {
                          figureStyle: {
                              width: 14,
                              marginBottom: -4,
                          },
                          imgStyle: {
                              marginLeft: -2,
                              marginRight: -2,
                          },
                      },
        });
    } else if (src === '😱') {
        return emoji({
            src,
            size,
            crop:
                size === 25
                    ? {
                          figureStyle: {
                              width: 23,
                              marginBottom: -2,
                          },
                          imgStyle: {
                              marginLeft: -1,
                          },
                      }
                    : undefined,
        });
    }

    return emoji({
        src,
        size,
    });
};
