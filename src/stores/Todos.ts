import { makeAutoObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import Store from "./Store";

export type Todo = {
	id?: string;
	text: string;
	createdAt?: Date;
};

const Todos = new (class Todos extends Store<Todo> {
	public id?: string;

	constructor() {
		super();
		this.mount(this);
	}

	public get db() {
		return this._db?.todos;
	}

	public find(id: string) {
		return this.data?.find((dt) => id === dt.id);
	}

	public async create(data: Todo) {
		const todo = await this.api?.post('todos', data);
		if (todo) this.data?.push(todo);
		return todo;
	}

	public async update(id: string, data: Todo) {
		if (!this.data) return;
		for (const key in this.data) {
			if (this.data[key].id === id) {
				const todo = await this.api?.put('todos/' + id, data);
				if (todo) this.data[key] = todo;
			}
		}
		this.editMode();
	}

	public async delete(id: string) {
		await this.api?.delete('todos/' + id);
		this.data = this.data?.filter((dt) => id !== dt.id);
		this.editMode();
	}

	public editMode(id?: string) {
		this.id = id;
	}
});

export default Todos;