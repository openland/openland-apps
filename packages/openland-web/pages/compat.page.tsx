import * as React from 'react';
import Glamorous from 'glamorous';
import { withData } from '../components/withData';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const FontDemoRender = Glamorous.div<{ fontSize: number, fontWeight: string }>((props) => ({
    fontSize: (props as any).fontSize,
    fontWeight: (props as any).fontWeight
}));

const FontDemo = (props: { fontSize: number, fontWeight: string }) => {
    return <FontDemoRender {...props}>Steve Kite {props.fontSize}px/{props.fontWeight}</FontDemoRender>;
};

export default withData('Compatibitily Table', class Error extends React.Component {
    render() {
        return (
            <XHorizontal>
                <XVertical>
                    <FontDemo fontSize={13} fontWeight="300" />
                    <FontDemo fontSize={14} fontWeight="300" />
                    <FontDemo fontSize={15} fontWeight="300" />
                    <FontDemo fontSize={16} fontWeight="300" />
                    <FontDemo fontSize={17} fontWeight="300" />
                    <FontDemo fontSize={18} fontWeight="300" />
                    <FontDemo fontSize={20} fontWeight="300" />
                    <FontDemo fontSize={22} fontWeight="300" />
                    <FontDemo fontSize={24} fontWeight="300" />
                    <FontDemo fontSize={26} fontWeight="300" />
                    <FontDemo fontSize={28} fontWeight="300" />
                    <FontDemo fontSize={32} fontWeight="300" />
                    <FontDemo fontSize={34} fontWeight="300" />
                </XVertical>
                <XVertical>
                    <FontDemo fontSize={13} fontWeight="400" />
                    <FontDemo fontSize={14} fontWeight="400" />
                    <FontDemo fontSize={15} fontWeight="400" />
                    <FontDemo fontSize={16} fontWeight="400" />
                    <FontDemo fontSize={17} fontWeight="400" />
                    <FontDemo fontSize={18} fontWeight="400" />
                    <FontDemo fontSize={20} fontWeight="400" />
                    <FontDemo fontSize={22} fontWeight="400" />
                    <FontDemo fontSize={24} fontWeight="400" />
                    <FontDemo fontSize={26} fontWeight="400" />
                    <FontDemo fontSize={28} fontWeight="400" />
                    <FontDemo fontSize={32} fontWeight="400" />
                    <FontDemo fontSize={34} fontWeight="400" />
                </XVertical>
                <XVertical>
                    <FontDemo fontSize={13} fontWeight="500" />
                    <FontDemo fontSize={14} fontWeight="500" />
                    <FontDemo fontSize={15} fontWeight="500" />
                    <FontDemo fontSize={16} fontWeight="500" />
                    <FontDemo fontSize={17} fontWeight="500" />
                    <FontDemo fontSize={18} fontWeight="500" />
                    <FontDemo fontSize={20} fontWeight="500" />
                    <FontDemo fontSize={22} fontWeight="500" />
                    <FontDemo fontSize={24} fontWeight="500" />
                    <FontDemo fontSize={26} fontWeight="500" />
                    <FontDemo fontSize={28} fontWeight="500" />
                    <FontDemo fontSize={32} fontWeight="500" />
                    <FontDemo fontSize={34} fontWeight="500" />
                </XVertical>
                <XVertical>
                    <FontDemo fontSize={13} fontWeight="600" />
                    <FontDemo fontSize={14} fontWeight="600" />
                    <FontDemo fontSize={15} fontWeight="600" />
                    <FontDemo fontSize={16} fontWeight="600" />
                    <FontDemo fontSize={17} fontWeight="600" />
                    <FontDemo fontSize={18} fontWeight="600" />
                    <FontDemo fontSize={20} fontWeight="600" />
                    <FontDemo fontSize={22} fontWeight="600" />
                    <FontDemo fontSize={24} fontWeight="600" />
                    <FontDemo fontSize={26} fontWeight="600" />
                    <FontDemo fontSize={28} fontWeight="600" />
                    <FontDemo fontSize={32} fontWeight="600" />
                    <FontDemo fontSize={34} fontWeight="600" />
                </XVertical>
                <XVertical>
                    <FontDemo fontSize={13} fontWeight="700" />
                    <FontDemo fontSize={14} fontWeight="700" />
                    <FontDemo fontSize={15} fontWeight="700" />
                    <FontDemo fontSize={16} fontWeight="700" />
                    <FontDemo fontSize={17} fontWeight="700" />
                    <FontDemo fontSize={18} fontWeight="700" />
                    <FontDemo fontSize={20} fontWeight="700" />
                    <FontDemo fontSize={22} fontWeight="700" />
                    <FontDemo fontSize={24} fontWeight="700" />
                    <FontDemo fontSize={26} fontWeight="700" />
                    <FontDemo fontSize={28} fontWeight="700" />
                    <FontDemo fontSize={32} fontWeight="700" />
                    <FontDemo fontSize={34} fontWeight="700" />
                </XVertical>
                <XVertical>
                    <FontDemo fontSize={13} fontWeight="800" />
                    <FontDemo fontSize={14} fontWeight="800" />
                    <FontDemo fontSize={15} fontWeight="800" />
                    <FontDemo fontSize={16} fontWeight="800" />
                    <FontDemo fontSize={17} fontWeight="800" />
                    <FontDemo fontSize={18} fontWeight="800" />
                    <FontDemo fontSize={20} fontWeight="800" />
                    <FontDemo fontSize={22} fontWeight="800" />
                    <FontDemo fontSize={24} fontWeight="800" />
                    <FontDemo fontSize={26} fontWeight="800" />
                    <FontDemo fontSize={28} fontWeight="800" />
                    <FontDemo fontSize={32} fontWeight="800" />
                    <FontDemo fontSize={34} fontWeight="800" />
                </XVertical>
            </XHorizontal>
        );
    }
});