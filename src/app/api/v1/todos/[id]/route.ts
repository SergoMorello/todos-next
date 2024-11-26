import Todos from "@Stores/Todos";
import { NextApiRequest } from "next";
import { NextResponse, NextRequest, NextFetchEvent } from "next/server";

type TodosParams = {
	params: Promise<{
		id: string;
	}>
};

export const GET = async (req: NextRequest, {params}: TodosParams) => {
	const {id} = await params;
	const result = await Todos.db?.findFirst({
		where: {
			id
		}
	});
	return NextResponse.json(result,{
		status: result ? 200 : 404
	});
};

export const PUT = async (req: NextRequest, {params}: TodosParams) => {
	try {
		const data = await req.json();
		const {id} = await params;
		const result = await Todos.db?.update({
			where: {
				id
			},
			data
		});
		return NextResponse.json(result);
	}catch(e){
		return NextResponse.json({message: String(e)}, {
			status: 500
		});
	}
};

export const DELETE = async (req: NextRequest, {params}: TodosParams) => {
	try {
		const {id} = await params;
		const result = await Todos.db?.delete({
			where: {
				id
			}
		});
		return NextResponse.json(result);
	}catch(e){
		return NextResponse.json({message: String(e)}, {
			status: 500
		});
	}
};