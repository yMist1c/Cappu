
const db = require('../config/database');

async function query(sql, params) {
    try {
        const [rows] = await db.execute(sql, params);
        return rows;
    } catch (err) {
        console.error('Erro ao executar query:', err);
        throw err;
    }
}

module.exports = { query };
