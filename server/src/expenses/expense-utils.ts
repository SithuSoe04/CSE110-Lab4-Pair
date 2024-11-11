import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }
 
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
 }
 

export function deleteExpense(req: Request, res: Response, db: Database) {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).send({ error: "Missing required field: id" });
    }

    if (db.run(`SELECT id FROM expenses where id = ${id}`) == null){
        return res.status(400).send({error: "Expense not found"})
    }
    db.run(`DELETE FROM expenses where id = ${id}`)
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    // res.status(200).send({ "data": expenses });
    try {
        const expenses = await db.all('SELECT * FROM expenses');
        res.status(200).send({"data": expenses});
    } catch (error) {
        res.status(500).send({ error: `Error getting expenses: , + ${error}` });
    }
}