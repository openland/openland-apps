import * as React from 'react';
import { css, cx } from 'linaria';
import { sharedItemMenu, SharedItemRich } from './SharedMediaFragment';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import ManageVerticalIcon from 'openland-icons/ic-more-v.svg';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XViewRouterContext, XView } from 'react-mental';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import { TextLabel1, TextBody } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

const MenuContainer = css`
    display: flex;
    align-items: center;
    position: absolute;
    right: 8px;
    top: 8px;
    opacity: 0;
    border-radius: 40px;
    background-color: var(--backgroundTertiary);
`;

const MenuContainerMobile = css`
    right: 16px;
    background-color: var(--backgroundPrimary);
`;

const MenuVisible = css`
    opacity: 1;
`;

const ContainerClass = css`
    display: flex;
    flex-direction: row;
    width: calc(100% + 32px);
    margin: 0 -16px;
    padding: 16px;
    position: relative;
    border-radius: 8px;
    :hover{
        text-decoration: none;
        background: var(--backgroundTertiary);
        .menu-container{
            opacity: 1;
        }
    }
`;

const ImgContianerClass = css`
    display: flex;
    flex-shrink: 0;
    width: 56px;    
    height: 56px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background-color: var(--backgroundTertiaryTrans);
    &::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        border: 1px solid var(--borderLight);
        width: 56px;    
        height: 56px;
        border-radius: 8px;
    }
`;

const ImgClass = css`
    object-fit: contain;
`;

const TextInner = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 4;
`;

const TextContainer = css`
    display: block;
    margin-left: 16px;
    margin-top: -4px;
    margin-bottom: -4px;
    width: 100%;
`;

const ForegroundPrimaryColor = css`
    color: var(--foregroundPrimary);
`;

const AccentPrimaryColor = css`
    color: var(--accentPrimary);
`;
const ForegroundSecondaryColor = css`
    color: var(--foregroundSecondary);
`;
const MobilePadding = css`
    padding: 16px 32px;
`;

export const RichContent = (props: { item: SharedItemRich }) => {
    const messenger = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext)!;
    const menuClick = React.useCallback((ctx: UPopperController) => {
        return sharedItemMenu(messenger, router, ctx, props.item);
    }, []);
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-start', hideOnClick: true }, menuClick);

    const menuIconClick = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        menuShow(e);
    }, []);

    const userClick = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        router.navigate(`/${props.item.sender.id}`);
    }, []);

    const layout = useLayout();
    return (
        <ULink className={cx(ContainerClass, layout === 'mobile' && MobilePadding)} href={props.item.attach.titleLink || undefined} >
            {props.item.attach.image && (
                <div className={ImgContianerClass}>
                    <ImgWithRetry
                        className={ImgClass}
                        width={56}
                        height={56}
                        src={props.item.attach.image.url}
                    />
                </div>
            )}
            {!props.item.attach.image && <XView flexShrink={0} width={56} height={56} borderRadius={8} backgroundColor="var(--backgroundTertiaryTrans)"><UIcon icon={<LinkIcon />} /></XView>}
            <div className={TextContainer}>
                <div className={cx(TextLabel1, TextInner, ForegroundPrimaryColor)} >{props.item.attach.title}</div>
                <div className={cx(TextBody, TextInner, ForegroundPrimaryColor)} >{props.item.attach.text}</div>
                <div className={cx(TextBody, TextInner, AccentPrimaryColor)}  >{props.item.attach.titleLink}</div>
                <div onClick={userClick} className={cx(TextBody, TextInner, ForegroundSecondaryColor)} >{props.item.sender.name}</div>
            </div>
            <div className={cx('menu-container', MenuContainer, layout === 'mobile' && MenuContainerMobile, (menuVisible || layout === 'mobile') && MenuVisible)}>
                <UIconButton
                    icon={<ManageVerticalIcon />}
                    color="var(--foregroundTertiary)"
                    active={menuVisible}
                    onClick={menuIconClick}
                />
            </div>
        </ULink>
    );
};