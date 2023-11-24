import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto } from "../../domain/dtos";

export class TodosController {

    public getTodos = async (req: Request, res: Response) => {
        const todosPrisma = await prisma.todo.findMany();
        return res.json(todosPrisma)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        return res.json(todo)
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.json({ error: "ID received is not a number" });

        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const todo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                text
            }
        })

        res.json(todo)
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = await prisma.todo.delete({
            where: {
                id
            }
        })

        if (!todo) return res.status(400).json({ error: 'Text is required' });

        res.json(todo)
    }
}