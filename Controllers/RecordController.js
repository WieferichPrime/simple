import RecordService from "../Services/RecordService.js";
import { json } from "sequelize";


class RecordController {
    async create(req, res) {
        const {name, phone, email, date, time} = req.body;
            
            if (name.length < 2) return res.status(400).json("Короткое имя");
            RecordService.create({name, phone, email, date: date?new Date(date).toISOString():new Date().toISOString(), time})
                .then((record) => {
                    res.status(200).json(record);
                })
                .catch((e) => res.status(500).json(e));
    }

    async getAll(req, res) {
        await RecordService.getAll()
            .then((records) => res.json(records))
            .catch(e => res.status(500).json(e))
    }

    async getTimesByDate(req, res) {
        const {date} = req.body;
        await RecordService.getTimesByDate(date)
            .then((times) => res.json(times))
            .catch(e => res.status(500).json(e))
    }

    async getOne(req, res) {
        const {id} = req.params;
        await RecordService.getOne(id)
            .then(record => res.json(record))
            .catch(e => res.status(404).json({message: "Несуществующий ID"}))
    }

    async updateOne(req, res) {
        await RecordService.updateOne(req.body, req.body.id)
            .then((record) => record[0]===0?res.status(400).json({message: "Несуществующий ID"}):res.json(record[1]))
            .catch(e => res.json(e))
    }

    async deleteOne(req, res) {
        await RecordService.deleteOne(req.params.id)
            .then((count) => res.json(count))
            .catch(e => res.status(404).json({message: "Несуществующий ID"}))
    }

    unvalid(req, res) {
        res.status(400).json({message: "Некорректный запрос"})
    }
}

export default new RecordController();