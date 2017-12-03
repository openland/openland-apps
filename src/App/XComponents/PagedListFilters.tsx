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
        <label className="x-filter--radio">
            <input type="radio" name="ec" value="1" checked={props.checked} /><span>{props.title}</span>
        </label>
    );
}