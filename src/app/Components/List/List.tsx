"use client"

import { observer } from "mobx-react-lite";
import Todos, {
	type Todo
} from "@Stores/Todos";
import styles from "./styles.module.scss";

interface ListProps {
	data: Todo[];
};

const List = ({data}: ListProps) => {
	const todos = Todos.use(data);
	
	if (todos.data?.length === 0) {
		return(<div className={styles['empty']}>{'Empty :-('}</div>);
	}

	return(<ul className={styles['list-messages']}>
		{todos.data?.map((todo, index) => <li key={'todo-item-' + index} className={Todos.id === todo.id ? styles['active'] : undefined} onClick={() => Todos.editMode(todo.id)}>
			<span className={styles['message']}>{todo.text}</span>
			{todo?.createdAt?.toLocaleDateString && <span className={styles['date']}>{todo?.createdAt.toLocaleDateString()}</span>}
		</li>)}
	</ul>);
};

export default observer(List);