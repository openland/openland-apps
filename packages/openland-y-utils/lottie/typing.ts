import { rgbaToLotty, hexToRgba } from './utils';

export const getTyping = (color: string): object => {
    const rgba = hexToRgba(color);

    const ellipse1 = rgbaToLotty(rgba);
    const ellipse2 = rgbaToLotty(rgba.slice(0, 3).concat([0.5]));
    const ellipse3 = rgbaToLotty(rgba.slice(0, 3).concat([0.5]));

    return {
        v: '5.1.13',
        fr: 60,
        ip: 0,
        op: 60,
        w: 80,
        h: 80,
        nm: 'typing',
        ddd: 0,
        assets: [],
        layers: [
            {
                ddd: 0,
                ind: 1,
                ty: 4,
                nm: '1',
                sr: 1,
                ks: {
                    o: {
                        a: 1,
                        k: [
                            {
                                i: {
                                    x: [0.667],
                                    y: [1],
                                },
                                o: {
                                    x: [0.333],
                                    y: [0],
                                },
                                n: ['0p667_1_0p333_0'],
                                t: 0,
                                s: [50],
                                e: [100],
                            },
                            {
                                i: {
                                    x: [0.667],
                                    y: [1],
                                },
                                o: {
                                    x: [0.333],
                                    y: [0],
                                },
                                n: ['0p667_1_0p333_0'],
                                t: 10,
                                s: [100],
                                e: [50],
                            },
                            {
                                t: 20,
                            },
                        ],
                        ix: 11,
                    },
                    r: {
                        a: 0,
                        k: 0,
                        ix: 10,
                    },
                    p: {
                        a: 0,
                        k: [10.588, 40.539, 0],
                        ix: 2,
                    },
                    a: {
                        a: 0,
                        k: [0, 0, 0],
                        ix: 1,
                    },
                    s: {
                        a: 1,
                        k: [
                            {
                                i: {
                                    x: [0.667, 0.667, 0.667],
                                    y: [1, 1, 1],
                                },
                                o: {
                                    x: [0.333, 0.333, 0.333],
                                    y: [0, 0, 0],
                                },
                                n: ['0p667_1_0p333_0', '0p667_1_0p333_0', '0p667_1_0p333_0'],
                                t: 0,
                                s: [100, 100, 100],
                                e: [117.647, 117.647, 100],
                            },
                            {
                                i: {
                                    x: [0.667, 0.667, 0.667],
                                    y: [1, 1, 1],
                                },
                                o: {
                                    x: [0.333, 0.333, 0.333],
                                    y: [0, 0, 0],
                                },
                                n: ['0p667_1_0p333_0', '0p667_1_0p333_0', '0p667_1_0p333_0'],
                                t: 10,
                                s: [117.647, 117.647, 100],
                                e: [100, 100, 100],
                            },
                            {
                                t: 20,
                            },
                        ],
                        ix: 6,
                    },
                },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                d: 1,
                                ty: 'el',
                                s: {
                                    a: 0,
                                    k: [17.923, 17.923],
                                    ix: 2,
                                },
                                p: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 3,
                                },
                                nm: 'Ellipse Path 1',
                                mn: 'ADBE Vector Shape - Ellipse',
                                hd: false,
                            },
                            {
                                ty: 'fl',
                                c: {
                                    a: 0,
                                    k: ellipse1,
                                    ix: 4,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 5,
                                },
                                r: 1,
                                nm: 'Fill 1',
                                mn: 'ADBE Vector Graphic - Fill',
                                hd: false,
                            },
                            {
                                ty: 'tr',
                                p: {
                                    a: 0,
                                    k: [-0.039, -0.539],
                                    ix: 2,
                                },
                                a: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 1,
                                },
                                s: {
                                    a: 0,
                                    k: [100, 100],
                                    ix: 3,
                                },
                                r: {
                                    a: 0,
                                    k: 0,
                                    ix: 6,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 7,
                                },
                                sk: {
                                    a: 0,
                                    k: 0,
                                    ix: 4,
                                },
                                sa: {
                                    a: 0,
                                    k: 0,
                                    ix: 5,
                                },
                                nm: 'Transform',
                            },
                        ],
                        nm: 'Ellipse 1',
                        np: 3,
                        cix: 2,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 60,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 2,
                ty: 4,
                nm: '2',
                sr: 1,
                ks: {
                    o: {
                        a: 1,
                        k: [
                            {
                                i: {
                                    x: [0.667],
                                    y: [1],
                                },
                                o: {
                                    x: [0.333],
                                    y: [0],
                                },
                                n: ['0p667_1_0p333_0'],
                                t: 10,
                                s: [50],
                                e: [100],
                            },
                            {
                                i: {
                                    x: [0.667],
                                    y: [1],
                                },
                                o: {
                                    x: [0.333],
                                    y: [0],
                                },
                                n: ['0p667_1_0p333_0'],
                                t: 20,
                                s: [100],
                                e: [50],
                            },
                            {
                                t: 30,
                            },
                        ],
                        ix: 11,
                    },
                    r: {
                        a: 0,
                        k: 0,
                        ix: 10,
                    },
                    p: {
                        a: 0,
                        k: [40.039, 40.539, 0],
                        ix: 2,
                    },
                    a: {
                        a: 0,
                        k: [0, 0, 0],
                        ix: 1,
                    },
                    s: {
                        a: 1,
                        k: [
                            {
                                i: {
                                    x: [0.667, 0.667, 0.667],
                                    y: [1, 1, 1],
                                },
                                o: {
                                    x: [0.333, 0.333, 0.333],
                                    y: [0, 0, 0],
                                },
                                n: ['0p667_1_0p333_0', '0p667_1_0p333_0', '0p667_1_0p333_0'],
                                t: 10,
                                s: [100, 100, 100],
                                e: [117.647, 117.647, 100],
                            },
                            {
                                i: {
                                    x: [0.667, 0.667, 0.667],
                                    y: [1, 1, 1],
                                },
                                o: {
                                    x: [0.333, 0.333, 0.333],
                                    y: [0, 0, 0],
                                },
                                n: ['0p667_1_0p333_0', '0p667_1_0p333_0', '0p667_1_0p333_0'],
                                t: 20,
                                s: [117.647, 117.647, 100],
                                e: [100, 100, 100],
                            },
                            {
                                t: 30,
                            },
                        ],
                        ix: 6,
                    },
                },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                d: 1,
                                ty: 'el',
                                s: {
                                    a: 0,
                                    k: [17.923, 17.923],
                                    ix: 2,
                                },
                                p: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 3,
                                },
                                nm: 'Ellipse Path 1',
                                mn: 'ADBE Vector Shape - Ellipse',
                                hd: false,
                            },
                            {
                                ty: 'fl',
                                c: {
                                    a: 0,
                                    k: ellipse2,
                                    ix: 4,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 5,
                                },
                                r: 1,
                                nm: 'Fill 1',
                                mn: 'ADBE Vector Graphic - Fill',
                                hd: false,
                            },
                            {
                                ty: 'tr',
                                p: {
                                    a: 0,
                                    k: [-0.039, -0.539],
                                    ix: 2,
                                },
                                a: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 1,
                                },
                                s: {
                                    a: 0,
                                    k: [100, 100],
                                    ix: 3,
                                },
                                r: {
                                    a: 0,
                                    k: 0,
                                    ix: 6,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 7,
                                },
                                sk: {
                                    a: 0,
                                    k: 0,
                                    ix: 4,
                                },
                                sa: {
                                    a: 0,
                                    k: 0,
                                    ix: 5,
                                },
                                nm: 'Transform',
                            },
                        ],
                        nm: 'Ellipse 1',
                        np: 3,
                        cix: 2,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 60,
                st: 0,
                bm: 0,
            },
            {
                ddd: 0,
                ind: 3,
                ty: 4,
                nm: '3',
                sr: 1,
                ks: {
                    o: {
                        a: 1,
                        k: [
                            {
                                i: {
                                    x: [0.667],
                                    y: [1],
                                },
                                o: {
                                    x: [0.333],
                                    y: [0],
                                },
                                n: ['0p667_1_0p333_0'],
                                t: 20,
                                s: [50],
                                e: [100],
                            },
                            {
                                i: {
                                    x: [0.667],
                                    y: [1],
                                },
                                o: {
                                    x: [0.333],
                                    y: [0],
                                },
                                n: ['0p667_1_0p333_0'],
                                t: 30,
                                s: [100],
                                e: [50],
                            },
                            {
                                t: 40,
                            },
                        ],
                        ix: 11,
                    },
                    r: {
                        a: 0,
                        k: 0,
                        ix: 10,
                    },
                    p: {
                        a: 0,
                        k: [69.503, 40.539, 0],
                        ix: 2,
                    },
                    a: {
                        a: 0,
                        k: [0, 0, 0],
                        ix: 1,
                    },
                    s: {
                        a: 1,
                        k: [
                            {
                                i: {
                                    x: [0.667, 0.667, 0.667],
                                    y: [1, 1, 1],
                                },
                                o: {
                                    x: [0.333, 0.333, 0.333],
                                    y: [0, 0, 0],
                                },
                                n: ['0p667_1_0p333_0', '0p667_1_0p333_0', '0p667_1_0p333_0'],
                                t: 20,
                                s: [100, 100, 100],
                                e: [117.647, 117.647, 100],
                            },
                            {
                                i: {
                                    x: [0.667, 0.667, 0.667],
                                    y: [1, 1, 1],
                                },
                                o: {
                                    x: [0.333, 0.333, 0.333],
                                    y: [0, 0, 0],
                                },
                                n: ['0p667_1_0p333_0', '0p667_1_0p333_0', '0p667_1_0p333_0'],
                                t: 30,
                                s: [117.647, 117.647, 100],
                                e: [100, 100, 100],
                            },
                            {
                                t: 40,
                            },
                        ],
                        ix: 6,
                    },
                },
                ao: 0,
                shapes: [
                    {
                        ty: 'gr',
                        it: [
                            {
                                d: 1,
                                ty: 'el',
                                s: {
                                    a: 0,
                                    k: [17.923, 17.923],
                                    ix: 2,
                                },
                                p: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 3,
                                },
                                nm: 'Ellipse Path 1',
                                mn: 'ADBE Vector Shape - Ellipse',
                                hd: false,
                            },
                            {
                                ty: 'fl',
                                c: {
                                    a: 0,
                                    k: ellipse3,
                                    ix: 4,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 5,
                                },
                                r: 1,
                                nm: 'Fill 1',
                                mn: 'ADBE Vector Graphic - Fill',
                                hd: false,
                            },
                            {
                                ty: 'tr',
                                p: {
                                    a: 0,
                                    k: [-0.039, -0.539],
                                    ix: 2,
                                },
                                a: {
                                    a: 0,
                                    k: [0, 0],
                                    ix: 1,
                                },
                                s: {
                                    a: 0,
                                    k: [100, 100],
                                    ix: 3,
                                },
                                r: {
                                    a: 0,
                                    k: 0,
                                    ix: 6,
                                },
                                o: {
                                    a: 0,
                                    k: 100,
                                    ix: 7,
                                },
                                sk: {
                                    a: 0,
                                    k: 0,
                                    ix: 4,
                                },
                                sa: {
                                    a: 0,
                                    k: 0,
                                    ix: 5,
                                },
                                nm: 'Transform',
                            },
                        ],
                        nm: 'Ellipse 1',
                        np: 3,
                        cix: 2,
                        ix: 1,
                        mn: 'ADBE Vector Group',
                        hd: false,
                    },
                ],
                ip: 0,
                op: 60,
                st: 0,
                bm: 0,
            },
        ],
        markers: [],
    };
};
