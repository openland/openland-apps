import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { withUserInfo } from './UserInfo';
import { XLink } from 'openland-x/XLink';
import { XAvatar } from 'openland-x/XAvatar';
import { XLoader } from 'openland-x/XLoader';
import { switchOrganization } from '../utils/switchOrganization';
import { withMyOrganizations } from '../api/withMyOrganizations';

const OrganizationWrapper = Glamorous(XLink)({
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
    '&:hover': {
        backgroundColor: '#f8f8fb'
    }
});

const CheckIcon = Glamorous.div({
    width: 18,
    height: 18,
    borderRadius: 50,
    color: '#fff',
    backgroundColor: '#4428e0',
    backgroundImage: 'url(\'/static/img/icons/check-form.svg\')',
    backgroundSize: 12,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(97, 126, 156, 0.2)',
    marginRight: 10,
    marginLeft: 'auto'
});

const OrganizationTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: -0.1,
    color: '#334562'
});

const XVerticalStyled = Glamorous(XVertical)({
    marginLeft: -24,
    marginRight: -24,
});

export const OrganizationPicker = withMyOrganizations(withUserInfo((props) => {
    if (props.data.loading) {
        return <XLoader loading={true} height={100} />;
    }
    return (
        <XVerticalStyled separator="none">
            {props.data.myOrganizations.map((v) => (
                <OrganizationWrapper onClick={() => switchOrganization(v.id)} key={v.id + v.id}>
                    <XHorizontal key={v.id} alignItems="center" flexGrow={1}>
                        <XAvatar
                            cloudImageUuid={v.photo!!}
                            onClick={() => switchOrganization(v.id)}
                            size="medium"
                            style="organization"
                        />
                        <OrganizationTitle onClick={() => switchOrganization(v.id)}>{v.name}</OrganizationTitle>
                        {(props.organization && props.organization.id === v.id) && <CheckIcon />}
                    </XHorizontal>
                </OrganizationWrapper>
            ))}
        </XVerticalStyled>
    );
}));