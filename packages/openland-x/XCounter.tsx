import * as React from 'react';
import Glamorous from 'glamorous';

type XCounter = {
    big?: boolean;
    grey?: boolean;
    color?: string;
    bgColor?: string;
    borderColor?: string;
    count: number;
};

const XCounterStyled = Glamorous.div<XCounter>(
    ({ grey, big, color, bgColor, borderColor }) => {
        const shared = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            color: color || '#ffffff',
            ...(grey
                ? {
                      backgroundColor: '#000000',
                      opacity: 0.2,
                  }
                : {
                      backgroundColor: bgColor || '#1790ff',
                  }),
        };

        if (big) {
            return {
                ...shared,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                fontSize: 12,
                border: 'none',
                textAlign: 'center',
                lineHeight: '10px',
            };
        }
        return {
            ...shared,
            height: 15,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 2,
            paddingRight: 2,
            lineHeight: '13px',
            borderRadius: 5,
            border: '2px solid ' + (borderColor ? borderColor : 'white'),
            fontSize: 10,
            color: color || '#ffffff',
        };
    },
);

const XCounterBig = Glamorous(XCounterStyled)<{
    color?: string;
    bgColor?: string;
}>(props => ({}));

export const XCounter = ({
    color,
    bgColor,
    borderColor,
    count,
    big,
    grey,
}: XCounter) => {
    return (
        <XCounterStyled
            grey={grey}
            big={big}
            className="counter"
            color={color}
            bgColor={bgColor}
            borderColor={borderColor}
        >
            <span>{count}</span>
        </XCounterStyled>
    );
};
