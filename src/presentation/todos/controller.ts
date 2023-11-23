import { Request, Response } from "express"

const todos = [
    { id: 1, text: "Comprar leche", createdAt: new Date() },
    { id: 2, text: "Comprar pan", createdAt: null },
    { id: 3, text: "Comprar mantequilla", createdAt: new Date() },
]

export class TodosController {

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);

        todo ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: new Date()
        }

        todos.push(newTodo)

        res.status(200).json({ message: 'Todo creado correctamente' });
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` });


        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        todo.text = text;

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        todos.splice(todos.indexOf(todo), 1)

        res.json(todo)
    }
}