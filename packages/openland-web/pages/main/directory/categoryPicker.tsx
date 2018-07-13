import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XPopper } from 'openland-x/XPopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchCondition } from './root.page';
import { XMenuItem } from '../../../components/Incubator/XOverflow';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';

export const OrgCategoties = TextDirectoryData.categoryPicker.categories;

const CATALOG = TextDirectoryData.categoryPicker.catalog;

const PickerWrapper = Glamorous(XVertical)({
    width: 260,
    maxHeight: '40vh',
    overflowY: 'scroll',
    margin: -10,
    padding: '7px 0',
});

const PickerButton = Glamorous(XButton)<{ activated?: boolean }>((props) => ({
    backgroundColor: (props.activated) ? 'white' : 'none',
    borderColor: (props.activated) ? 'rgba(220, 222, 228, 0.5)' : 'none',
}));

const PickerItem = Glamorous(XMenuItem)({
    position: 'relative',
    paddingRight: 30,
});

const PickerItemIcon = Glamorous(XIcon)({
    position: 'absolute',
    top: 0,
    right: 9,
    fontSize: 20,
    lineHeight: '42px',
    color: '#c1c7cf',
});

const PickerGroupAll = Glamorous.div({
    borderBottom: '1px solid #f1f2f5',
    paddingBottom: 4,
    marginBottom: 4,
});

export class CategoryPicker extends React.Component<{ onPick: (q: SearchCondition) => void }, { popper: boolean }> {
    inner = 0;
    constructor(props: any) {
        super(props);
        this.state = { popper: false };
    }

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
        this.setState({ popper: false });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        if (!this.inner) {
            this.setState({ popper: false });
        }
    }

    onClick = (category: { value: string | string[], label: string }) => {
        this.onPick({ type: 'organizationType', value: category.value, label: category.label });
    }

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    }

    getValuesOfGroup = (group: any) => {
        let _values: string[] = [];

        group.options.map((category: any) => {
            _values.push(category.value);
        });
        _values.push(group.value);

        return _values;
    }

    render() {
        let content = (
            <PickerWrapper separator="none">
                {CATALOG.map(group => (
                    <XPopper
                        groupId="directory_catalog"
                        key={group.label}
                        showOnHover={true}
                        placement="right-start"
                        arrow={null}
                        marginTop={-7}
                        content={
                            <PickerWrapper separator="none">
                                <PickerGroupAll>
                                    <XMenuItem onClick={(e) => this.onClick({value: this.getValuesOfGroup(group), label: group.label})}>{group.label} • All</XMenuItem>
                                </PickerGroupAll>

                                {group.options.map(category => <XMenuItem ref={this.onInner} key={category.value} onClick={(e) => this.onClick(category)}>{category.label}</XMenuItem>)}
                            </PickerWrapper>}
                    >
                        <PickerItem>
                            {group.label}
                            <PickerItemIcon icon="chevron_right" />
                        </PickerItem>
                    </XPopper>
                ))}
            </PickerWrapper>
        );
        return (
            <XPopper
                placement="bottom-start"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
                arrow={null}
            >
                <PickerButton iconOpacity={0.4} activated={this.state.popper} text={TextDirectory.categoryPicker} style="flat" iconRight="expand_more" onClick={this.switch} />
            </XPopper>
        );
    }
}