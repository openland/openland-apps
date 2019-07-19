import * as React from 'react';
import XPopper, { Placement } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { UIconButton } from '../UIconButton';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import ManageHorizontalIcon from 'openland-icons/ic-more-h.svg';
import { XViewProps } from 'react-mental';
import { css, cx } from 'linaria';

const iconWrapper = css`
    svg {
        path {
            fill: #676D7A; // Need to be ThemeDefault.foregroundSecondary
        }
    }
`;

interface UMoreButtonProps extends XViewProps {
    placement?: Placement;
    show?: boolean;
    horizontal?: boolean;
    showOnHover?: boolean;
    onClickOutside?: () => void;
    children: any;
}

export class UMoreButton extends React.PureComponent<UMoreButtonProps, { show: boolean }> {
    refComp?: Element;

    constructor(props: UMoreButtonProps) {
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
        const { placement = 'bottom-end', show, horizontal = false, showOnHover, onClickOutside, children, ...other } = this.props;
        let computedShow: boolean | undefined =
            typeof show === 'undefined' ? this.state.show : show;

        if (showOnHover) {
            computedShow = undefined;
        }

        return (
            <XPopper
                show={computedShow}
                contentContainer={<XMenuVertical />}
                content={children}
                arrow={null}
                placement={placement}
                onClickOutside={this.handleClose}
                showOnHover={showOnHover}
            >
                <div className={cx(iconWrapper)}>
                    <UIconButton
                        icon={horizontal ? <ManageHorizontalIcon /> : <ManageVerticalIcon />}
                        active={computedShow}
                        onClick={this.switch}
                        {...other}
                    />
                </div>
            </XPopper>
        );
    }
}
