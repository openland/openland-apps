import Glamorous from 'glamorous';
import { CSSUtils, XMediaSizes } from './utils';

interface XGridLayout {
    templateColumns?: string;
    templateRows?: string;
    templateAreas?: string[][];
}
interface XGridProps {
    layouts: XGridLayout & {
        [K in XMediaSizes]?: XGridLayout
    }
    children?: any;
}

function convertLayout(src?: XGridLayout) {
    if (src) {
        return {
            gridTemplateColumns: src.templateColumns,
            gridTemplateRows: src.templateRows,
            gridTemplateAreas: src.templateAreas ? src.templateAreas.map((v) => '"' + v.join(' ') + '"').join(' ') : undefined,
        }
    } else {
        return {}
    }
}

export let XGrid2 = Glamorous.div<XGridProps>((props) => ({
    display: 'grid',
    ...convertLayout(props.layouts),

    [CSSUtils.media(['xs'])]: convertLayout(props.layouts.xs),
    [CSSUtils.media(['sm'])]: convertLayout(props.layouts.sm),
    [CSSUtils.media(['md'])]: convertLayout(props.layouts.md),
    [CSSUtils.media(['lg'])]: convertLayout(props.layouts.lg),

    [CSSUtils.media(['sm-'])]: convertLayout(props.layouts['sm-']),
    [CSSUtils.media(['md-'])]: convertLayout(props.layouts['md-']),

    [CSSUtils.media(['sm+'])]: convertLayout(props.layouts['sm+']),
    [CSSUtils.media(['md+'])]: convertLayout(props.layouts['md+']),
}));