import { Gird } from "../common/G";
import { getRes } from "../common/gFunc";

export interface PlatData {
	platid: number;
	resid: number;
	width: number;
	height: number;
	grid_width: number;
	grid_height: number;
	rows: number;
	lines: number;
	boss: boolean;
	name: string;
	startPos: { x: number, y: number };
	trancePos: { tomap: number, x: number, y: number }[];
	monster:[{monid:number, x:number, y: number}][];
	mapInfo: number[][];
}

export interface StageData {
	id: number;
	name:string;
	startplat:number;
	platnum:number;
	droplist:number[];
}

export interface MapData {
	id: number;
	name: string;
	stage: number[];
}

class MapMgr {
	private mapDatas: { [index: number]: MapData } = {};
	private stageDatas: {[index: number]: StageData} = {};


	async init() {
	    let data = await getRes("/prop_data/prop_map", cc.JsonAsset);
		let json = data.json;
		let stagedata = await getRes("/prop_data/prop_stage", cc.JsonAsset);
		let stagejson = stagedata.json;
		this.stageDatas = stagejson;
	    this.mapDatas = json;
	}

	// async init() {
	// 	let RootDir = (await import("../common/gFunc")).RootDir;
	// 	let data = require(RootDir("../app/prop_data/prop_map"));
	// 	this.mapDatas = data;
	// }

	getMapData(mapid: number): MapData {
		return this.mapDatas[mapid];
	}

	getStageData(stageid: number): StageData{
		return this.stageDatas[stageid];
	}

	getPlatData(platid: number): PlatData {
		let data = (async ()=>{
			let platdata = await getRes("/prop_data/plats/plat_"+ platid, cc.JsonAsset);
			return platdata.json;
		})();
		
		if(data){
			return data as unknown as PlatData;
		}
		// let mapdata = this.getMapData(mapid);

		// if (mapdata) {
		// 	return mapdata.stageList[stageid];
		// }
		return null;
	}

	pixPos2GirdPos(pixpos: cc.Vec2): cc.Vec2 {
		return cc.v2(Math.floor(pixpos.x / Gird.width), Math.floor(pixpos.y / Gird.height));
	}

	girdPos2pixPos(girdpos: cc.Vec2): cc.Vec2 {
		return cc.v2(girdpos.x * Gird.width, girdpos.y * Gird.height);
	}

	girdX2PixX(x: number): number {
		return x * Gird.width;
	}

	girdY2PixY(y: number): number {
		return y * Gird.height;
	}

	pixX2GirdX(x: number) {
		return Math.floor(x / Gird.width)
	}

	pixY2GirdY(y: number) {
		return Math.floor(y / Gird.height)
	}
}

let mapMgr = new MapMgr();
export default mapMgr;