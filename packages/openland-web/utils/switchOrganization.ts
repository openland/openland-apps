import * as Cookie from 'js-cookie';

export function switchOrganization(id: string, redirect?: string) {
    Cookie.set('x-openland-org', id);
    window.location.href = redirect || '/';
}