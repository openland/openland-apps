import * as React from 'react';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { delay } from 'openland-y-utils/timer';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

const options = {
    label: 'Sort by',
    values: [
        { label: 'Last updated', value: 'updatedAt' },
        { label: 'Join date', value: 'createdAt' },
    ],
};

const optionsContainer = css`
    display: flex;
    flex-direction: column;
`;

const optionTitle = css`
    padding: 8px 16px 0;
    color: var(--foregroundSecondary);
    margin-bottom: 4px;
`;

const optionContent = css`
    cursor: pointer;
    padding: 16px;
    height: 48px;
    &:hover {
        background-color: var(--backgroundPrimaryHover);
    }
`;

interface SortPickerProps {
    withoutFeatured?: boolean;
    sort: { orderBy: string; featured: boolean };
    onPick: (sort: { orderBy: string; featured: boolean }) => void;
    options?: { label: string; values: { label: string; value: string }[] };
}

export const SortPicker = React.memo((props: SortPickerProps) => {
    const [featured, setFeatured] = React.useState(false);

    const onFeturedChange = (checked: boolean) => {
        setFeatured(checked);
        delay(0).then(() => {
            props.onPick({
                featured: checked,
                orderBy: props.sort.orderBy,
            });
        });
    };

    const onPick = (q: { label: string; value: string }) => {
        props.onPick({
            featured: props.sort.featured,
            orderBy: q.value,
        });
    };

    const totalOptions = props.options || options;

    const [, show] = usePopper(
        {
            placement: 'top-end',
            hideOnLeave: false,
            hideOnClick: true,
            hideOnChildClick: true,
        },
        () => (
            <>
                <div className={optionsContainer}>
                    <div className={optionTitle}>{totalOptions.label}</div>
                    {totalOptions.values.map(i => (
                        <div onClick={() => onPick(i)} key={i.value} className={optionContent}>
                            {i.label}
                        </div>
                    ))}
                </div>
                {!props.withoutFeatured && (
                    <UCheckbox
                        label="Featured first"
                        value={featured ? 'f' : ''}
                        checked={featured}
                        onChange={onFeturedChange}
                    />
                )}
            </>
        ),
    );

    const selected = (props.options || options).values.find(v => v.value === props.sort.orderBy);

    return (
        <div onClick={show}>
            <UButton text={selected ? selected.label : '?'} style="secondary" size="small" />
        </div>
    );
});
