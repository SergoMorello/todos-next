import Image from "next/image";
import styles from "./page.module.css";
import List from "@Components/List";
import { enableStaticRendering } from "mobx-react-lite";
import App from "next/app";
import Form from "@Components/Form";
import Todos,{ Todo } from "./stores/Todos";
import { PrismaClient } from "@prisma/client";

// enableStaticRendering(typeof window === 'undefined');

export const dynamic = 'force-dynamic';

const todosData: Todo[] = [
	{
		id: '123',
		text: 'test'
	}
];


const Home = async () => {
	const data = await Todos.db?.findMany() ?? [];
	return (
		<div>
			<List data={data}/>
			<Form/>
		</div>
	);
}

export default Home;