class LayoutConfig {
    XS = '@media (max-width: 767px)';
    SM = '@media (min-width: 768px) and (max-width: 959px)';
    SMMinus = '@media (max-width: 959px)';
    MD = '@media (min-width: 960px) and (max-width: 1055px)';
    MDMinus = '@media (max-width: 1055px)';
    LG = '@media (min-width: 1056px) and (max-width: 1247px)';
    XLG = '@media (min-width: 1248px)';

    GAP = 15;
}

export let Layout = new LayoutConfig();