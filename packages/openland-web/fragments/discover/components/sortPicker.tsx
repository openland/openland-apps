import * as React from 'react';
import Glamorous from 'glamorous';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { MultiplePicker } from './multiplePicker';
import { XCheckboxBasic } from 'openland-x/XCheckbox';
import { delay } from 'openland-y-utils/timer';
import { XPopperContentDEPRECATED } from 'openland-x/popper/XPopperContent';

const ContentWrapper = Glamorous(XPopperContentDEPRECATED)({
    minWidth: 180,
});

const PickerWrapper = Glamorous(XVertical)({
    margin: -10,
});

const PickerEntries = Glamorous(XHorizontal)({
    margin: 0,
});

const options = {
    label: 'Sort by',
    values: [
        { label: 'Last updated', value: 'updatedAt' },
        { label: 'Join date', value: 'createdAt' },
    ],
};

interface SortControlledPickerProps {
    query?: string;
    onPick: (location: { label: string; value: string }) => void;
    options: {
        label: string;
        values: {
            label: string;
            value: string;
        }[];
    };
}

class SortControlledPicker extends React.Component<SortControlledPickerProps> {
    render() {
        return (
            <MultiplePicker
                options={[this.props.options]}
                onPick={this.props.onPick}
                query={this.props.query}
            />
        );
    }
}

const CheckboxWrap = Glamorous.div({
    marginTop: 11,
    marginLeft: -10,
    marginBottom: -6,
    marginRight: -10,
    paddingLeft: 16,
    paddingTop: 18,
    paddingRight: 16,
    borderTop: '1px solid #f1f2f5',
});

export class SortPicker extends React.Component<
    {
        withoutFeatured?: boolean;
        sort: { orderBy: string; featured: boolean };
        onPick: (sort: { orderBy: string; featured: boolean }) => void;
        options?: { label: string; values: { label: string; value: string }[] };
    },
    { popper: boolean; featured: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { popper: false, featured: props.sort.featured };
    }

    onPick = (q: { label: string; value: string }) => {
        this.close();
        this.props.onPick({
            featured: this.props.sort.featured,
            orderBy: q.value,
        });
    }

    onFeturedChange = (checked: { label: string; checked: boolean }) => {
        this.setState({ featured: checked.checked });
        delay(0).then(() => {
            this.props.onPick({
                featured: checked.checked,
                orderBy: this.props.sort.orderBy,
            });
        });
    }

    switch = () => {
        this.setState({ popper: !this.state.popper });
    }

    close = () => {
        this.setState({ popper: false });
    }

    render() {
        let content = (
            <>
                <PickerWrapper>
                    <PickerEntries separator="none" width="100%">
                        <SortControlledPicker
                            onPick={this.onPick}
                            options={this.props.options || options}
                        />
                    </PickerEntries>
                </PickerWrapper>
                {!this.props.withoutFeatured && (
                    <CheckboxWrap>
                        <XCheckboxBasic
                            label="Featured first"
                            rounded={true}
                            value={this.state.featured ? 'f' : ''}
                            trueValue="f"
                            onChange={this.onFeturedChange}
                        />
                    </CheckboxWrap>
                )}
            </>
        );
        let selected = (this.props.options || options).values.find(
            v => v.value === this.props.sort.orderBy,
        );
        return (
            <XPolitePopper
                placement="bottom-end"
                show={this.state.popper}
                content={content}
                onClickOutside={this.close}
                arrow={null}
                marginTop={8}
                marginRight={-1}
                contentContainer={<ContentWrapper />}
            >
                <div>
                    <UButton
                        text={selected ? selected.label : '?'}
                        style="secondary"
                        onClick={this.switch}
                        size="small"
                    />
                </div>
            </XPolitePopper>
        );
    }
}
