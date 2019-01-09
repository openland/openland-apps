import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { Scaffold } from '../../../components/Scaffold';
import { Sidebar } from '../../../components/Sidebar';
import Glamorous from 'glamorous';

const RoomsListWrapper = Glamorous(XScrollView2)({
    flexGrow: 1,
});

const RootWrapperStyle = css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const Title = css`
    padding-top: 16px;
    padding-left: 16px;
    padding-bottom: 21px;
    padding-right: 16px;
    font-size: 22px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
     @media (max-width: 700px) {
        padding-left: 30px;
        padding-top: 13px;
    }
`;

const SidebarWrapper = css`
    width: 344px;
    height: 100%;
    border-right: 1px solid #ececec;
    background-color: #ffffff;
    flex-shrink: 0;
    position: relative;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
    @media (max-width: 700px) {
        width: 100%;
        display: flex;
        height: 53px;
        border-right: none;
        border-bottom: 1px solid #ececec;
    }
`;

const LinksWrapper = css`
    @media (max-width: 700px) {
        display: flex;
        flex-direction: row;
        
        & > a {
            height: 100%;
            
            & > svg {
                display: none;
            }
        }
    }
`;

export const Navigation = (props: { title: string; children?: any }) => (
    <>
        <XDocumentHead title={props.title} />
        <Scaffold>
            <Scaffold.Content padding={false} bottomOffset={false}>
                <div className={RootWrapperStyle}>
                    <div className={SidebarWrapper}>
                        <div className={Title}>
                            Settings
                        </div>
                        <div className={LinksWrapper}>
                            <Sidebar.Item path="/settings/profile" arrow={true}>
                                Profile
                            </Sidebar.Item>
                            <Sidebar.Item path="/settings/notifications" arrow={true}>
                                Notifications
                            </Sidebar.Item>
                            <Sidebar.Item path="/settings/dev" arrow={true}>
                                Developer keys
                            </Sidebar.Item>
                        </div>
                    </div>
                    <RoomsListWrapper>
                        {props.children}
                    </RoomsListWrapper>
                </div>
            </Scaffold.Content>
        </Scaffold>
    </>
);
