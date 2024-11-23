"use client"
import { enableStaticRendering, observer, useObserver, useStaticRendering, useAsObservableSource } from "mobx-react-lite";
import Todos, {
	type Todo
} from "../../stores/Todos";

interface ListProps {
	data: Todo[];
};

const List = ({data}: ListProps) => {
	const todos = Todos.use(data);

	return(<ul>
		{todos.data?.map((todo, index) => <li key={'todo-item-' + index}>
			<div onClick={() => Todos.editMode(todo.id)}>
				<span>{todo.id}</span>
				<span>{todo.text}</span>
			</div>
		</li>)}
	</ul>);
};

export default observer(List);