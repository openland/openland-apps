import * as React from 'react';
import XPopper, { Placement } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { UIconButton } from '../UIconButton';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import ManageHorizontalIcon from 'openland-icons/ic-more-h.svg';

interface UMoreButtonProps {
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
        const { horizontal = false, placement = 'bottom-end', children, showOnHover } = this.props;
        let show: boolean | undefined =
            typeof this.props.show === 'undefined' ? this.state.show : this.props.show;

        if (this.props.showOnHover) {
            show = undefined;
        }

        return (
            <XPopper
                show={show}
                contentContainer={<XMenuVertical />}
                content={children}
                arrow={null}
                placement={placement}
                onClickOutside={this.handleClose}
                showOnHover={showOnHover}
            >
                <div>
                    <UIconButton
                        icon={horizontal ? <ManageHorizontalIcon /> : <ManageVerticalIcon />}
                        active={show}
                        onClick={this.switch}
                    />
                </div>
            </XPopper>
        );
    }
}
