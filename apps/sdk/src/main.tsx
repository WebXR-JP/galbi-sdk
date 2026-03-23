import * as pc from "playcanvas";
import React from "react";
import ReactDOM from "react-dom/client";
import { GltfExporter } from "./galbi-gltf-exporter";
import StlExporter from "./galbi-stl-exporter";
import { Galbi } from "./index";
import "./styles.css";

// 開発用のデモコンポーネント
function App() {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		if (!canvasRef.current) return;
		// PlayCanvas setup
		const app = new pc.Application(canvasRef.current);
		app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
		app.setCanvasResolution(pc.RESOLUTION_AUTO);

		const onResize = () => app.resizeCanvas();
		window.addEventListener("resize", onResize);

		// 地面を作成
		const ground = new pc.Entity("ground");
		ground.addComponent("render", {
			type: "plane",
		});
		ground.setLocalScale(10, 1, 10);
		ground.setPosition(0, -1, 0);
		app.root.addChild(ground);

		// スノーマンの作成
		const createSnowman = (x: number, z: number) => {
			const snowman = new pc.Entity("snowman");

			// 下の大きな球
			const bottom = new pc.Entity("bottom");
			bottom.addComponent("render", { type: "sphere" });
			bottom.setLocalScale(1, 1, 1);
			bottom.setPosition(0, 0.5, 0);
			snowman.addChild(bottom);

			// 中間の球
			const middle = new pc.Entity("middle");
			middle.addComponent("render", { type: "sphere" });
			middle.setLocalScale(0.7, 0.7, 0.7);
			middle.setPosition(0, 1.5, 0);
			snowman.addChild(middle);

			// 頭の球
			const head = new pc.Entity("head");
			head.addComponent("render", { type: "sphere" });
			head.setLocalScale(0.5, 0.5, 0.5);
			head.setPosition(0, 2.2, 0);
			snowman.addChild(head);

			// 鼻（オレンジ色の箱）
			const nose = new pc.Entity("nose");
			nose.addComponent("render", {
				type: "cone",
				material: new pc.StandardMaterial(),
			});
			nose.render.material.diffuse.set(1, 0.6, 0);
			nose.render.material.update();
			nose.setLocalScale(0.1, 0.3, 0.1);
			nose.setLocalEulerAngles(90, 0, 0);
			nose.setPosition(0, 2.2, 0.3);
			snowman.addChild(nose);

			// 目（小さな黒い球）
			const createEye = (x: number) => {
				const eye = new pc.Entity("eye");
				eye.addComponent("render", {
					type: "sphere",
					material: new pc.StandardMaterial(),
				});
				eye.render.material.diffuse.set(0, 0, 0);
				eye.render.material.update();
				eye.setLocalScale(0.1, 0.1, 0.1);
				eye.setPosition(x, 2.3, 0.2);
				snowman.addChild(eye);
			};

			createEye(-0.15);
			createEye(0.15);

			snowman.setPosition(x, 0, z);
			return snowman;
		};

		// 複数のスノーマンを配置
		const snowmen = [createSnowman(-2, -2), createSnowman(2, -2), createSnowman(0, 2)];

		for (const snowman of snowmen) {
			app.root.addChild(snowman);
		}

		// カメラ設定
		const camera = new pc.Entity("camera");
		camera.addComponent("camera", {
			clearColor: new pc.Color(0.6, 0.8, 1), // 空色の背景
		});
		app.root.addChild(camera);
		camera.setPosition(0, 4, 8);
		camera.lookAt(0, 0, 0);

		// ライト設定
		const light = new pc.Entity("light");
		light.addComponent("light", {
			type: "directional",
			intensity: 1.5,
		});
		app.root.addChild(light);
		light.setEulerAngles(45, 30, 0);

		// スノーマンをゆっくり回転
		app.on("update", dt => {
			snowmen.forEach((snowman, i) => {
				const rotationSpeed = 20 * (i + 1);
				snowman.rotate(0, rotationSpeed * dt, 0);
			});
		});

		app.start();
		// Initialize Galbi
		const galbi = new Galbi({
			container: document.body,
			app: app,
			targetEntity: app.root,
			gltfExporter: new GltfExporter(),
			stlExporter: new StlExporter(),
			language: "ja",
		});
		galbi.start();

		return () => {
			window.removeEventListener("resize", onResize);
			galbi.stop();
			app.destroy();
		};
	}, []);

	return <canvas ref={canvasRef} />;
}

// biome-ignore lint/style/noNonNullAssertion: root element guaranteed in index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
