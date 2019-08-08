import * as React from 'react';
import { css } from 'linaria';
import * as Three from 'three';
import * as FA from 'face-api.js';
import { XView } from 'react-mental';

const container = css`
    width: 200px;
    height: 200px;
    background-color: #1885F2;
`;

export const UnimojiViewer = React.memo(() => {
    let ref = React.useRef<HTMLDivElement>(null);
    let videoRef = React.useRef<HTMLVideoElement>(null);
    let canvasRef = React.useRef<HTMLCanvasElement>(null);
    let rotation = React.useRef<number>(0);

    React.useLayoutEffect(() => {
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            videoRef.current!.srcObject = stream;
        })();
    }, []);

    const detect = React.useCallback(async () => {
        const options = new FA.TinyFaceDetectorOptions({
            inputSize: 224,
            scoreThreshold: 0.5
        });
        let r = await FA.detectSingleFace(videoRef.current!, options).withFaceLandmarks(true);
        if (r) {
            const dims = FA.matchDimensions(canvasRef.current!, videoRef.current!, true);
            // const resizedResult = FA.resizeResults(r, dims)!;
            // FA.draw.drawDetections(canvasRef.current!, resizedResult);
            // FA.draw.drawFaceLandmarks(canvasRef.current!, resizedResult);

            // let nose = r.landmarks.getNose();
            // rotation.current = -Math.atan2(nose[6].y - nose[0].y, nose[6].x - nose[0].x);

            let leftEye = r.landmarks.getLeftEye();
            let rightEye = r.landmarks.getRightEye();

            rotation.current = -Math.atan2(leftEye[0].y - rightEye[0].y, leftEye[0].x - rightEye[0].x);
        }
        setTimeout(() => {
            detect();
        }, 1);
    }, []);

    const start = React.useCallback((e: any) => {
        (async () => {
            // console.log(getCurrentFaceDetectionNet());
            // await FA.nets.tinyYolov2.load('/static/models');
            // await FA.nets.faceLandmark68Net.load('/static/models');
            await FA.nets.faceLandmark68TinyNet.load('/static/models');
            await FA.loadTinyFaceDetectorModel('/static/models');
            // await FA.loadFaceLandmarkModel('/static/models');
            detect();
        })();
    }, []);

    const renderLoop = React.useCallback((
        scene: Three.Scene,
        camera: Three.Camera,
        cube: Three.Mesh
    ) => {
        // cube.rotation.z = rotation.current;
        cube.rotation.z = rotation.current;
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
            renderLoop(scene, camera, cube);
            renderer.render(scene, camera);
            requestAnimationFrame(callback);
        };
        requestAnimationFrame(callback);
    }, []);

    return (
        <XView width={600} height={200} flexDirection="row">
            <div className={container} ref={ref} />
            <video onLoadedData={start} className={container} ref={videoRef} autoPlay={true} muted={true} playsinline={true} />
            <canvas ref={canvasRef} className={container} />
        </XView>
    );
});