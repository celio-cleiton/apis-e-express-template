import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


app.get('/courses', (req: Request, res: Response) => { res.send(courses) })

app.get('/courses/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const filteredCourses: TCourse[] = courses.filter((course) => {
        if (q) {
            return course.name.toLowerCase().includes(q.toLowerCase())
        }
        return course
    })
    res.status(200).send(filteredCourses)
})

app.post('/courses', (req: Request, res: Response) => {
    const body = req.body
    const { id, name, lessons, stack } = body
    const newCourses: TCourse = { id, name, lessons, stack }
    courses.push(newCourses)
    res.status(201).send('Curso Criado com Sucesso!')
})


app.get('/student', (req: Request, res: Response) => { res.send(students) })


app.get('/students/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const filteredStudent: TStudent[] = students.filter((student) => {
        if (q) {
            return student.name.toLowerCase().includes(q.toLowerCase())
        }
        return students
    })
    res.status(200).send(filteredStudent)
})


app.post('/students', (req: Request, res: Response) => {
    const body = req.body
    const { id, name, age } = body
    const newStudent: TStudent = { id, name, age}
    students.push(newStudent)
    res.status(201).send('Aluno Cadastrado com Sucesso!')
})