import * as React from 'react';
import { css } from 'linaria';
import * as Three from 'three';

const container = css`
    width: 200px;
    height: 200px;
    background-color: #1885F2;
`;

export const UnimojiViewer = React.memo(() => {
    let ref = React.useRef<HTMLDivElement>(null);

    const renderLoop = React.useCallback((
        scene: Three.Scene,
        camera: Three.Camera
    ) => {
        //
    }, []);

    React.useLayoutEffect(() => {
        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        );
        camera.position.z = 5;
        const renderer = new Three.WebGLRenderer();
        renderer.setSize(200, 200);
        renderer.setClearColor(0xff1885F2);
        ref.current!.appendChild(renderer.domElement);

        // Add model

        const geometry = new Three.BoxGeometry(2, 2, 2);
        const material = new Three.MeshPhongMaterial({
            color: 0x156289,
            emissive: 0x072534,
            side: Three.DoubleSide,
            flatShading: true
        });
        const cube = new Three.Mesh(geometry, material);
        scene.add(cube);

        const lights = [];
        lights[0] = new Three.PointLight(0xffffff, 1, 0);
        lights[1] = new Three.PointLight(0xffffff, 1, 0);
        lights[2] = new Three.PointLight(0xffffff, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(- 100, - 200, - 100);

        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);

        const callback = () => {
            renderLoop(scene, camera);
            renderer.render(scene, camera);
            requestAnimationFrame(callback);
        };
        requestAnimationFrame(callback);
    }, []);

    return (
        <div className={container} ref={ref} />
    );
});