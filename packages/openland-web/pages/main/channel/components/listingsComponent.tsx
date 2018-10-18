import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { XSubHeader, XSubHeaderLink } from 'openland-x/XSubHeader';
import { XAvatar } from 'openland-x/XAvatar';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XScrollView } from 'openland-x/XScrollView';
import FilterIcon from './icons/ic-filter-1.svg';

interface ListingType {
    organization: {
        id: string;
        name: string;
        photo: string | null;
    };
    date: Date;
    title: string;
    text: string;
}

// START: Example data

const ListingsExamples: ListingType[] = [{
    organization: {
        id: '',
        name: 'ACME Corporation',
        photo: ''
    },
    date: new Date('17 Jul 2018'),
    title: 'Walmart is closing more than 60 Sam\'s Club stores',
    text: 'Transforming our business means managing our real estate portfolio", — Sam\'s Club CEO John Furner. 10 of the closed stores will be turned into e-commerce distribution points.',
}, {
    organization: {
        id: '',
        name: 'ACME Corporation',
        photo: ''
    },
    date: new Date('17 Jul 2018'),
    title: 'Walmart is closing more than 60 Sam\'s Club stores',
    text: 'Transforming our business means managing our real estate portfolio", — Sam\'s Club CEO John Furner. 10 of the closed stores will be turned into e-commerce distribution points.',
}];

// END: Example data

const ListingsWrapper = Glamorous(XScrollView)({
    height: 'calc(100vh - 56px)'
});

const ListingsView = Glamorous.div({
    
});

const Listing = Glamorous.div({
    display: 'flex',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '16px 18px 20px 24px',
    '&:first-child': {
        paddingTop: 20
    },
    '&:hover': {
        backgroundColor: '#F9F9F9'
    }
});

const ListingAvatar = Glamorous(XAvatar)({
    marginRight: 12,
});

const ListingWrapper = Glamorous.div({
    flex: 1
});

const ListingBox = Glamorous.div({
    display: 'flex',
    marginBottom: 4
});

const ListingInfo = Glamorous.div({
    flex: 1
});

const ListingTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#334562'
});

const ListingTools = Glamorous(XHorizontal)({
    
});

const ListingText = Glamorous.div({
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: -0.3,
    color: '#5c6a81'
});

const ListingHeader = Glamorous.div({
    display: 'flex',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: -0.4,
    color: '#5c6a81',
});

const ListingDate = Glamorous.div({
    color: '#99a2b0',
    marginLeft: 5
});

interface ListingItemProps {
    item: ListingType;
}

function formatDate (date: Date) {
    let monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
}

class ListingItem extends React.Component<ListingItemProps, { isHovered: boolean }> {
    constructor(props: ListingItemProps) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let item = this.props.item;

        return (
            <Listing
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <ListingAvatar
                    cloudImageUuid={item.organization.photo!!}
                    style="organization"
                    objectName={item.organization.name}
                    objectId={item.organization.id}
                />
                <ListingWrapper>
                    <ListingBox>
                        <ListingInfo>
                            <ListingHeader>
                                {item.organization.name} • <ListingDate>{formatDate(item.date)}</ListingDate>
                            </ListingHeader>
                            <ListingTitle>{item.title}</ListingTitle>
                        </ListingInfo>
                        <ListingTools separator={5}>
                            <XButton
                                style={(this.state.isHovered) ? 'primary' : 'default'}
                                text="Message"
                            />
                            <XOverflow
                                placement="bottom-end"
                                content={(
                                    <div style={{ width: 160 }}>
                                        <XMenuTitle>Menu</XMenuTitle>
                                    </div>
                                )}
                            />
                        </ListingTools>
                    </ListingBox>
                    <ListingText>{item.text}</ListingText>
                </ListingWrapper>
            </Listing>
        );
    }
}

export class ListingsComponent extends React.Component {
    render() {
        return (
            <ListingsWrapper>
                <XSubHeader title="Channel listings" counter={ListingsExamples.length}>
                    <XSubHeaderLink>
                        <FilterIcon />
                        Filters
                    </XSubHeaderLink>
                </XSubHeader>
                <ListingsView>
                    {ListingsExamples.map((listing) => (
                        <ListingItem item={listing} />
                    ))}
                </ListingsView>
            </ListingsWrapper>
        );
    }
}