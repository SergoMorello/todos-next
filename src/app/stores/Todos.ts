import { makeAutoObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import Store from "./Store";

export type Todo = {
	id?: string;
	text: string;
};

const Todos = new (class Todos extends Store<Todo[]> {
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

	public create(data: Todo) {
		const id = uuidv4();
		const newTodo = {
			...data,
			id
		}
		this.data?.push(newTodo);
		return newTodo;
	}

	public update(id: string, data: Todo) {
		this.data = this.data?.map((dt) => {
			return id === dt.id ? {...dt, ...data} : dt;
		});
		this.editMode();
	}

	public delete(id: string) {
		this.data = this.data?.filter((dt) => id !== dt.id);
		this.editMode();
	}

	public editMode(id?: string) {
		this.id = id;
	}
});

export default Todos;