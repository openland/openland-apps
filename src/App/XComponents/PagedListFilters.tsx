import * as React from 'react';

export function PagedListFilters(props: { title: string, children?: any }) {
    return (
        <div className="col-xs-12 col-lg-3">
            <div className="x-in--title">{props.title}</div>
            {props.children}
        </div>
    );
}

export function PagedListSearch() {
    return (
        <div className="x-search">
            <form className="x-search--box" method="POST" action="">
                <input className="x-search--input" type="text" placeholder="Search" />
                <button className="x-search--button" type="submit"><i className="icon-search">{}</i></button>
            </form>
        </div>
    );
}

export function PagedListFilterRadio(props: { title: string, children?: any }) {
    return (
        <div className="x-filter">
            <div className="x-filter--title">{props.title}</div>
            {props.children}
        </div>
    );
}

export function PagedListFilterRadioItem(props: { title: string, checked: boolean }) {
    return (
        <a href="#" className={'x-filter--radio' + (props.checked ? ' is-checked' : '')}>{props.title}</a>
    );
}