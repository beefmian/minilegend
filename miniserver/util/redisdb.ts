import { createClient, RedisClient } from "redis";
import { safeJson } from "../common/gFunc";

let rsc: RedisClient = createClient({ auth_pass: "123456" });

async function asyncget(key: string) {
	let doc = await new Promise<string>((resolve) => {
		rsc.get(key, function (err, res: string) {
			return resolve(res);
		});
	});
	doc = JSON.parse(doc);
	return doc;
}

export namespace redis {
	export function set(key: string, value: string) {
		return rsc.set(key, value, function (err) {
			!err && console.log(err);
		});
	}

	export async function get(key: string) {
		const ret = await asyncget(key);
		return ret;
	}

	export function setHash(hash: string, key: string, value: string) {
		return rsc.hmset(hash, key, value, (err) => {
			!err && console.log(err);
		});
	}

	export async function getHash(hash: string, key: string) {
		let str = await new Promise<string| null>((resolve, reject) => {
			rsc.hget(hash, key, (err, strlist) => {
				if(strlist == null){
					resolve(null);
					return;
				}
				resolve(strlist[0]);
			});
		});
		return safeJson(str);
	}
}

// redis.hmset("a", {
// 	b:"2",
// 	c:123,
// });

// redis.hget("a", "c", (err, obj) => {

// 	console.log(obj, typeof obj);
// });