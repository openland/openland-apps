import * as React from 'react';
import { XView } from 'react-mental';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { doSimpleHash } from 'openland-y-utils/hash';

export interface XAvatar2Props {
    title: string;
    id: string;
    src?: string | null;
}

const PlaceholderColor = [
    'linear-gradient(138deg, #ffb600, #ff8d00)',
    'linear-gradient(138deg, #ff655d, #ff3d33)',
    'linear-gradient(138deg, #59d23c, #21ac00)',
    'linear-gradient(138deg, #11b2ff, #1970ff)',
    'linear-gradient(138deg, #00d1d4, #00afc8)',
    'linear-gradient(138deg, #aa22ff, #8e00e6)',
];

export const XAvatar2 = React.memo<XAvatar2Props>(props => {
    let contents: any = undefined;
    if (props.src) {
        if (props.src.startsWith('ph://')) {
            let ph = extractPlaceholder(props.title);
            let phIndex =
                Math.abs(doSimpleHash(props.id)) % PlaceholderColor.length;
            contents = (
                <XView
                    width={40}
                    height={40}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={20}
                    backgroundImage={PlaceholderColor[phIndex]}
                    color="white"
                    fontSize={16}
                    overflow="hidden"
                >
                    {ph}
                </XView>
            );
        } else {
            let baseUrl = props.src;
            let ops: string = '';
            let opsRetina: string = '';
            ops +=
                '-/format/jpeg/-/scale_crop/' +
                (40 + 'x' + 40) +
                '/center/-/progressive/yes/';
            opsRetina +=
                '-/format/jpeg/-/scale_crop/' +
                (40 * 2 + 'x' + 40 * 2) +
                '/center/-/quality/lighter/-/progressive/yes/';
            contents = (
                <XView
                    as="img"
                    width={40}
                    height={40}
                    borderRadius={20}
                    src={baseUrl + ops}
                    srcSet={baseUrl + opsRetina}
                />
            );
        }
    }

    return (
        <XView width={40} height={40} borderRadius={20}>
            {contents}
        </XView>
    );
});
