import Todos from "@Stores/Todos";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
	const result = await Todos.db?.findMany();
	return NextResponse.json(result);
};

export const POST = async (req: NextRequest) => {
	try {
		const data = await req.json();
		const result = await Todos.db?.create({
			data
		});
		return NextResponse.json(result);
	}catch(e){
		return NextResponse.json({message: String(e)}, {
			status: 500
		});
	}
};