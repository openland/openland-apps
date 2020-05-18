import { getRandomInt } from 'openland-web/utils/getRandomInt';

let canvas: HTMLCanvasElement | undefined;

export const makeStars = (node: HTMLElement) => {
    if (!canvas) {
        canvas = window.document.createElement('canvas');
        canvas.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            width: 3000px;
            height: 3000px;
        `;
        canvas.width = 3000;
        canvas.height = 3000;
        let ctx = canvas.getContext('2d');

        const makeStar = (starProps?: { x?: number, y?: number, r?: number, opacity?: number }) => {
            let props = starProps || {};
            let x = typeof props.x === 'number' ? props.x : getRandomInt(3000);
            let y = typeof props.y === 'number' ? props.y : getRandomInt(3000);
            let r = typeof props.r === 'number' ? props.r : getRandomInt(1, 3);
            let opacity = typeof props.opacity === 'number' ? props.opacity : (getRandomInt(50, 96) / 100);

            if (ctx) {
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();
            }
        };

        // ursa
        makeStar({ x: 1480, y: 200, r: 2 });
        makeStar({ x: 1550, y: 190, r: 2 });
        makeStar({ x: 1600, y: 220, r: 2 });
        makeStar({ x: 1650, y: 240, r: 2 });
        makeStar({ x: 1780, y: 234, r: 2 });
        makeStar({ x: 1658, y: 298, r: 2 });
        makeStar({ x: 1780, y: 300, r: 2 });

        for (let i = 0; i < 200; i++) {
            makeStar();
        }
    }

    node.prepend(canvas);
};
