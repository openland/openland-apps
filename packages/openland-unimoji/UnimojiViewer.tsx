// import * as React from 'react';
// import { css } from 'linaria';
// import * as Three from 'three';
// import * as FA from 'face-api.js';
// import { XView } from 'react-mental';

// const container = css`
//     width: 200px;
//     height: 200px;
//     background-color: #1885F2;
// `;

// export const UnimojiViewer = React.memo(() => {
//     let ref = React.useRef<HTMLDivElement>(null);
//     let videoRef = React.useRef<HTMLVideoElement>(null);
//     let canvasRef = React.useRef<HTMLCanvasElement>(null);
//     let rotationZ = React.useRef<number>(0);
//     let rotationY = React.useRef<number>(0);
//     let rotationX = React.useRef<number>(0);
//     let debugDivRef = React.useRef<HTMLDivElement>(null);
//     let debugVal = React.useRef<string>('');
//     React.useLayoutEffect(() => {
//         (async () => {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
//             videoRef.current!.srcObject = stream;
//         })();
//     }, []);

//     const detect = React.useCallback(async () => {
//         const options = new FA.TinyFaceDetectorOptions({
//             inputSize: 224,
//             scoreThreshold: 0.5
//         });
//         let r = await FA.detectSingleFace(videoRef.current!, options).withFaceLandmarks(true);
//         if (r) {
//             const dims = FA.matchDimensions(canvasRef.current!, videoRef.current!, true);
//             const resizedResult = FA.resizeResults(r, dims)!;
//             // FA.draw.drawDetections(canvasRef.current!, resizedResult);
//             FA.draw.drawFaceLandmarks(canvasRef.current!, resizedResult);

//             // let nose = r.landmarks.getNose();
//             // rotation.current = -Math.atan2(nose[6].y - nose[0].y, nose[6].x - nose[0].x);

//             let leftEye = r.landmarks.getLeftEye()[0];
//             let rightEye = r.landmarks.getRightEye()[3];
//             let noseEnd = r.landmarks.getNose()[3];
//             let noseUnder = r.landmarks.getNose()[6];
//             let noseTop = r.landmarks.getNose()[0];

//             rotationZ.current = -Math.atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);

//             let eyesCenterX = (rightEye.x + leftEye.x) / 2;
//             let noseBetweenEyesX = ((noseEnd.x - eyesCenterX) / ((rightEye.x - leftEye.x) / 2));
//             rotationY.current = 0.785398 * Math.min(Math.max(-1, noseBetweenEyesX), 1);

//             // not so good - too much noize
//             let noseAligmentY = (Math.max(noseEnd.y - noseTop.y, 0)) / (Math.max(noseUnder.y - noseEnd.y, 0)) / 3.3 - 1;
//             debugVal.current = noseAligmentY + '';
//             rotationX.current = 0.785398 * Math.min(Math.max(-1, noseAligmentY), 1);
//         }
//         setTimeout(() => {
//             detect();
//         }, 1);
//     }, []);

//     const start = React.useCallback((e: any) => {
//         (async () => {
//             // console.log(getCurrentFaceDetectionNet());
//             // await FA.nets.tinyYolov2.load('/static/models');
//             // await FA.nets.faceLandmark68Net.load('/static/models');
//             await FA.nets.faceLandmark68TinyNet.load('/static/models');
//             await FA.loadTinyFaceDetectorModel('/static/models');
//             // await FA.loadFaceLandmarkModel('/static/models');
//             detect();
//         })();
//     }, []);

//     const renderLoop = React.useCallback((
//         scene: Three.Scene,
//         camera: Three.Camera,
//         cube: Three.Mesh
//     ) => {
//         // cube.rotation.z = rotation.current;
//         cube.rotation.z = rotationZ.current;
//         cube.rotation.y = rotationY.current;
//         cube.rotation.x = rotationX.current;

//         if (debugDivRef.current) {
//             debugDivRef.current.textContent = debugVal.current;
//         }
//     }, []);

//     React.useLayoutEffect(() => {
//         const scene = new Three.Scene();
//         const camera = new Three.PerspectiveCamera(
//             75,
//             1,
//             0.1,
//             1000
//         );
//         camera.position.z = 5;
//         const renderer = new Three.WebGLRenderer();
//         renderer.setSize(200, 200);
//         renderer.setClearColor(0xff1885F2);
//         ref.current!.appendChild(renderer.domElement);

//         // Add model

//         const geometry = new Three.BoxGeometry(2, 2, 2);
//         const material = new Three.MeshPhongMaterial({
//             color: 0x156289,
//             emissive: 0x072534,
//             side: Three.DoubleSide,
//             flatShading: true
//         });
//         const cube = new Three.Mesh(geometry, material);
//         scene.add(cube);

//         const lights = [];
//         lights[0] = new Three.PointLight(0xffffff, 1, 0);
//         lights[1] = new Three.PointLight(0xffffff, 1, 0);
//         lights[2] = new Three.PointLight(0xffffff, 1, 0);

//         lights[0].position.set(0, 200, 0);
//         lights[1].position.set(100, 200, 100);
//         lights[2].position.set(- 100, - 200, - 100);

//         scene.add(lights[0]);
//         scene.add(lights[1]);
//         scene.add(lights[2]);

//         const callback = () => {
//             renderLoop(scene, camera, cube);
//             renderer.render(scene, camera);
//             requestAnimationFrame(callback);
//         };
//         requestAnimationFrame(callback);
//     }, []);

//     return (
//         <XView width={600} height={200} flexDirection="row">
//             <div className={container} ref={ref} />
//             <video onLoadedData={start} className={container} ref={videoRef} autoPlay={true} muted={true} playsinline={true} />
//             <canvas ref={canvasRef} className={container} />
//             <div style={{ position: 'absolute' }} ref={debugDivRef} />

//         </XView>
//     );
// });