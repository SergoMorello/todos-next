import List from "@Components/List";
import Form from "@Components/Form";
import Todos,{ Todo } from "@Stores/Todos";
import styles from "./styles.module.scss";

export const dynamic = 'force-dynamic';

const Home = async () => {
	const data = await Todos.db?.findMany({
		orderBy: {
			createdAt: 'asc'
		}
	}) ?? [];
	return (
		<div className={styles['box']}>
			<List data={data}/>
			<Form/>
		</div>
	);
}

export default Home;