import * as React from 'react';

export function PagedListFilters(props: { title: string, children?: any }) {
    return (
        <div className="col-lg-3">
            <div className="sf-in--title">{props.title}</div>
            {props.children}
        </div>
    );
}

export function PagedListSearch() {
    return (
        <div className="sf-search">
            <form className="sf-search--box" method="POST" action="">
                <input className="sf-search--input" type="text" placeholder="Search" />
                <button className="sf-search--button" type="submit"><i className="icon-search">{}</i></button>
            </form>
        </div>
    );
}

export function PagedListFilterRadio(props: { title: string, children?: any }) {
    return (
        <div className="sf-filter">
            <div className="sf-filter--title">{props.title}</div>
            {props.children}
        </div>
    );
}

export function PagedListFilterRadioItem(props: { title: string, checked: boolean }) {
    return (
        <label className="sf-filter--radio">
            <input type="radio" name="ec" value="1" checked={props.checked} /><span>{props.title}</span>
        </label>
    );
}