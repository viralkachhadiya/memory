import connection from '../../startup/db.js';
import { validate } from './_validation.js';

export const list = async (req, res) => {
    const { id } = req.params;
    connection.query(
        "SELECT title, description, logo_url, event_date, tag_id, reminded_at_utc, created_at_utc FROM memory WHERE user_id = ?",
        [id],
        ((err, data, fields) => {
            if (data) {
                res.status(200).json({ data: data });
            }
            console.log(err);
        }));
}

export const create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) throw error;

    connection.query(
        "INSERT INTO memory (title,description,logo_url,event_date,tag_id,user_id) VALUES(?,?,?,?,?,?)",
        [req.body.title, req.body.description, req.body.logoUrl, req.body.eventDate, req.body.tagId, req.body.userId],
        ((err, data, fields) => {
            if (data) {
                res.status(200).json({ message: "Memory created successfully.", data: { id: data.insertId } });
            }
            console.log(err);
        })
    );
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { error } = validate(req.body);
    if (error) throw error;

    connection.query(
        "UPDATE memory SET title = ?,description = ?,logo_url = ?,event_date = ?,tag_id = ?,user_id = ?) WHERE id = ?",
        [req.body.title, req.body.description, req.body.logoUrl, req.body.eventDate, req.body.tagId, req.body.userId, id],
        ((err, data, fields) => {
            if (data) {
                res.status(200).json({ message: "Memory updated successfully.", data: { id: data.insertId } });
            }
            console.log(err);
        })
    );
}

export const search = async (req, res) => {
    connection.query(
        "SELECT title, description, logo_url, event_date, tag_id, reminded_at_utc, created_at_utc FROM memory WHERE tag_id = ?",
        [req.query.tag],
        ((err, data, fields) => {
            if (data) {
                console.log(data);
                res.status(200).json({ data: data });
            }
        }));
}

export const uploadPhoto = async (req, res) => {

}