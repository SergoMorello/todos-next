"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Todos from "@Stores/Todos";
import styles from "./styles.module.scss";
import Button from "@UI/Button";

const Form = () => {
	const [text, setText] = useState('');

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};
	
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
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
	};

	const handleDelete = () => {
		if (!Todos.id) return;
		Todos.delete(Todos.id);
		setText('');
	};

	useEffect(() => {
		const text = Todos.id ? (Todos.find(Todos.id)?.text ?? '') : '';
		setText(text);
	}, [Todos.id]);

	return(<form onSubmit={handleSubmit} className={styles['form']}>
		<textarea value={text} onInput={handleInput}/>
		<div className={styles['controll']}>
			<Button>save</Button>
			{Todos.id && <Button type='button' onClick={handleDelete}>delete</Button>}
		</div>
	</form>);
};

export default observer(Form);