import API from "@API";
import { PrismaClient } from "@prisma/client";
import { makeObservable, observable, action, computed, configure } from "mobx";
import { useMemo } from "react";

type ObjType = TypedPropertyDescriptor<any>;

type MethodType = [
	string,
	ObjType
];

configure({
    enforceActions: "never",
})

abstract class Store<T extends Record<string, unknown> = Record<string, unknown>> {
	protected _db?: PrismaClient;
	protected api?: API<T>;
	public data?: T[];

	constructor() {
		this.mountAPI();
		this.mountPrisma();
	}

	protected mount(context: Store) {
		const getType = (options: ObjType) => {
			if (typeof options.get === 'function') {
				return computed;
			}
			if (typeof options.value === 'function') {
				return action;
			}
			return observable;
		};

		const getMethod = ([name, options]: MethodType) => {
			if (name === 'constructor') return [];
			return [name, getType(options)];
		};
		
		const methods = Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(context)));
		const properties = Object.entries(Object.getOwnPropertyDescriptors(context));
		const annotations = Object.fromEntries([...methods, ...properties].map(getMethod).filter(String));

		makeObservable(context, annotations);
	}

	private mountAPI() {
		if (this.isServer) return;
		this.api = new API();
	}

	protected mountPrisma() {
		if (this._db || !this.isServer) return;
		this._db = new PrismaClient();
	}

	protected get isServer() {
		return typeof window === 'undefined';
	}

	public use(data: T[]) {
		return useMemo(() => {
			this.data = data
			return this;
		}, []);
	}
}

export default Store;