import connection from '../../startup/db.js';
import { validate } from './_validation.js';

export const create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) throw error;
    connection.query(
        "INSERT INTO tag (name) VALUES(?)",
        [req.body.tag],
        ((err, data) => {
            if (err) return res.status(400).json({ message: err.message });
            if (data) {
                res.status(200).json({ message: "tag added successfully." });
            }
        })
    );
}

export const search = async (req, res) => {
    connection.query(
        "SELECT name FROM tag WHERE name like ?",
        ['%' + req.query.tag + '%'],
        ((err, data) => {
            if (err) return res.status(400).json({ message: err.message });
            if (data) {
                res.status(200).json({ data: data });
            }
        }));
}