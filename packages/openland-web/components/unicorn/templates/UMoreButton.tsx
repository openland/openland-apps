import * as React from 'react';
import XPopper, { Placement } from 'openland-x/XPopper';
import { UIconButton } from '../UIconButton';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import { XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { UPopperController } from '../UPopper';
import { usePopper } from '../usePopper';

const iconWrapper = css`
    svg {
        path {
            fill: #676D7A; // Need to be ThemeDefault.foregroundSecondary
        }
    }
`;

interface UMoreButtonDeprecatedProps extends XViewProps {
    placement?: Placement;
    show?: boolean;
    showOnHover?: boolean;
    onClickOutside?: () => void;
    children: any;
}

export class UMoreButtonDeprecated extends React.PureComponent<UMoreButtonDeprecatedProps, { show: boolean }> {
    refComp?: Element;

    constructor(props: UMoreButtonDeprecatedProps) {
        super(props);

        this.state = {
            show: false,
        };
    }

    switch = (e: any) => {
        e.stopPropagation();
        const { show } = this.props;

        if (typeof show === 'undefined') {
            this.setState({ show: !this.state.show });
        }
    }

    handleClose = () => {
        const { show, onClickOutside } = this.props;
        if (typeof show === 'undefined') {
            this.setState({ show: false });
        } else if (onClickOutside !== undefined) {
            onClickOutside();
        }
    }

    createRef = (el: any) => {
        this.refComp = el;
    }

    render() {
        const { placement = 'bottom-end', show, showOnHover, onClickOutside, children, ...other } = this.props;
        let computedShow: boolean | undefined =
            typeof show === 'undefined' ? this.state.show : show;

        if (showOnHover) {
            computedShow = undefined;
        }

        return (
            <XPopper
                show={computedShow}
                content={children}
                arrow={null}
                placement={placement}
                onClickOutside={this.handleClose}
                showOnHover={showOnHover}
            >
                <div className={cx(iconWrapper)}>
                    <UIconButton
                        icon={<ManageVerticalIcon />}
                        active={computedShow}
                        onClick={this.switch}
                        {...other}
                    />
                </div>
            </XPopper>
        );
    }
}

interface UMoreButtonProps extends XViewProps {
    menu: (ctx: UPopperController) => JSX.Element;
}

export const UMoreButton = React.memo((props: UMoreButtonProps) => {
    const { menu, ...other } = props;
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-end', hideOnClick: true }, menu);

    return (
        <UIconButton
            icon={<ManageVerticalIcon />}
            active={menuVisible}
            onClick={menuShow}
            {...other}
        />
    );
});
