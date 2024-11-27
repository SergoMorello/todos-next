"use client"

import {
	type ChangeEvent,
	type KeyboardEvent,
	type FormEvent,
	useEffect,
	useState
} from "react";
import { observer } from "mobx-react-lite";
import Todos from "@Stores/Todos";
import styles from "./styles.module.scss";
import Button from "@UI/Button";

const Form = () => {
	const [text, setText] = useState('');

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const sendTodo = () => {
		if (text === '') return;
		if (Todos.id) {
			Todos.update(Todos.id, {
				text
			});
		}else{
			Todos.create({
				text
			});
		}
		
		setText('');
	}
	
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		sendTodo();
	};

	const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if(e.key === "Enter" && !e.shiftKey) {
			(e.target as HTMLTextAreaElement).blur();
			sendTodo();
		}
	};

	const handleDelete = () => {
		if (!Todos.id) return;
		Todos.delete(Todos.id);
		setText('');
	};

	const handleReset = () => {
		Todos.editMode();
		setText('');
	};

	useEffect(() => {
		const text = Todos.id ? (Todos.find(Todos.id)?.text ?? '') : '';
		setText(text);
	}, [Todos.id]);

	return(<form onSubmit={handleSubmit} className={styles['form']}>
		{Todos.id && <div className={styles['head']}>
			<span className={styles['toast-name']}>id: {Todos.id}</span>
			<span onClick={handleReset} className={styles['reset']}/>
		</div>}
		<textarea value={text} onInput={handleInput} onKeyDown={handleEnter}/>
		<div className={styles['controll']}>
			<Button>save</Button>
			{Todos.id && <Button type='button' onClick={handleDelete}>delete</Button>}
		</div>
	</form>);
};

export default observer(Form);