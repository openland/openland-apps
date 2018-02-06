import Glamorous from 'glamorous';
import { CSSUtils, XMediaSizes } from './utils';

export let XRow = Glamorous.div<{ padding?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: props.padding === true ? 15 : undefined
}));

export const XColumn = Glamorous.div<{ mode?: 'fixed' | 'fit' | 'fill' | null }>((props) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    flexGrow: props.mode === 'fill' ? 1 : 0,
    flexBasis: props.mode === 'fill' ? 1 : undefined,
    flexShrink: 0,

    width: props.mode === 'fixed' ? 160 : undefined,
    paddingRight: props.mode === 'fixed' ? 40 : undefined,
    '&:last-child': props.mode === 'fixed' ? { paddingRight: 0 } : undefined
}));

export let XCell = Glamorous.div<{ area: string }>((props) => ({
    gridArea: props.area
}));

interface XGridLayout {
    gap?: number,
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
            gridGap: src.gap,
            gridTemplateColumns: src.templateColumns,
            gridTemplateRows: src.templateRows,
            gridTemplateAreas: src.templateAreas ? src.templateAreas.map((v) => '"' + v.join(' ') + '"').join(' ') : undefined,
        }
    } else {
        return {}
    }
}

export let XGrid = Glamorous.div<XGridProps>((props) => ({
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