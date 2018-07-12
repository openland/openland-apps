import * as Cookie from 'js-cookie';

export function switchOrganization(id: string, redirect?: string) {
    Cookie.set('x-openland-org', id, {path: '/'});
    window.location.href = redirect || '/';
}