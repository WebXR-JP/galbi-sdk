import * as pc from "playcanvas";

interface Vector3 {
	x: number;
	y: number;
	z: number;
}

interface DataView {
	data: string;
}

interface NormalAndVertex {
	normals: Vector3;
	vertices: Vector3[];
}

class GalbiStlExporter {
	writeVectorAscii(dataView: DataView, { x, y, z }: Vector3, isNormal: boolean) {
		dataView.data += `${isNormal ? "facet normal" : "vertex"} ${x} ${y} ${z}\n`;
	}

	writeMeshAscii(dataView: DataView, normalAndVertex: NormalAndVertex[]) {
		normalAndVertex.forEach(nv => {
			this.writeVectorAscii(dataView, nv.normals, true);
			dataView.data += "outer loop\n";

			nv.vertices.forEach(v => {
				this.writeVectorAscii(dataView, v, false);
			});

			dataView.data += "endloop\n";
			dataView.data += "endfacet\n";
		});
	}

	buildFaces(entity: pc.Entity) {
		const normalAndVertex: NormalAndVertex[] = [];

		const meshInstances = entity.findComponents("render").flatMap((r: any) => r.meshInstances);

		meshInstances.forEach((mi: pc.MeshInstance) => {
			const mesh = mi.mesh;
			const worldTransform = mi.node.getWorldTransform();

			const srcPositions: number[] = [];
			const srcNormals: number[] = [];
			const indices: number[] = [];
			mesh.getPositions(srcPositions);
			mesh.getNormals(srcNormals);
			mesh.getIndices(indices);

			// 一時的なベクトルを作成
			const tempPos = new pc.Vec3();
			const tempNormal = new pc.Vec3();
			const transformedPos = new pc.Vec3();
			const transformedNormal = new pc.Vec3();

			for (let i = 0; i < indices.length; i += 3) {
				const id = [indices[i] * 3, indices[i + 1] * 3, indices[i + 2] * 3];
				const vertices: Vector3[] = [];

				// 各頂点を世界座標に変換
				for (let j = 0; j < 3; j++) {
					tempPos.set(srcPositions[id[j]], srcPositions[id[j] + 1], srcPositions[id[j] + 2]);
					worldTransform.transformPoint(tempPos, transformedPos);
					vertices.push({
						x: transformedPos.x,
						y: transformedPos.y,
						z: transformedPos.z,
					});
				}

				// ノーマルを世界座標に変換
				const normalIndex = (i / 3) * 3;
				tempNormal.set(srcNormals[normalIndex], srcNormals[normalIndex + 1], srcNormals[normalIndex + 2]);
				worldTransform.transformVector(tempNormal, transformedNormal);
				transformedNormal.normalize();

				normalAndVertex.push({
					normals: { x: transformedNormal.x, y: transformedNormal.y, z: transformedNormal.z },
					vertices: vertices,
				});
			}
		});

		return normalAndVertex;
	}

	build(entity: pc.Entity, fileName: string, options?: any) {
		const mimeType = "application/vnd.ms-pki.stl";

		const dataView: DataView = { data: `solid ${fileName}\n` };
		const normalAndVertex = this.buildFaces(entity);
		this.writeMeshAscii(dataView, normalAndVertex);

		dataView.data += `endsolid ${fileName}`;
		return new Blob([dataView.data], { type: mimeType });
	}
}

export default GalbiStlExporter;
