// import * as React from 'react';
interface MenuItem {
    icon?: JSX.Element;
    name?: string;
    action?: () => void;
}
class MenuBuilder {
    items: (MenuItem | JSX.Element)[] = [];

    item = (item: MenuItem) => {
        this.items.push(item);
    }
}