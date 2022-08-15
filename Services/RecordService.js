import Record from "../Models/Record.js";

class RecordService {
    async create(record) {
        return await Record.create(record)
    }

    async getAll() {
        return await Record.findAll()
    }

    async getTimesByDate(date) {
        return await Record.findAll({
            attributes: ['time'],
            where: {
                date: date
            }
        })
    }

    async getOne(id) {
        return await Record.findByPk(id)
    }

    async updateOne(record, id) {
        return await Record.update(record, {
            where: {
                id: id
            },
            returning: true
        })
    }

    async deleteOne(id) {
        return await Record.destroy({
            where: {
                id: id
            }
        });
    }
}

export default new RecordService();