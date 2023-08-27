import connection from '../../startup/db.js';
import { validate } from './_validation.js';
import { photoUpload } from '../../helper/upload.js';

export const list = async (req, res) => {
    let query;

    if (req.query.sort === "date_add") {
        query = "select * from memory_tag as mt inner join tag as t on mt.tag_id = t.id inner join memory as m ON mt.memory_id = m.id ORDER BY m.created_at_utc DESC"
    }

    if (req.query.sort === "event_date") {
        query = "select * from memory_tag as mt inner join tag as t on mt.tag_id = t.id inner join memory as m ON mt.memory_id = m.id ORDER BY m.event_date DESC"
    }

    if (req.query.sort === "remindered_date") {
        query = "select * from memory_tag as mt inner join tag as t on mt.tag_id = t.id inner join memory as m ON mt.memory_id = m.id WHERE m.reminded_at_utc IS NOT NULL ORDER BY m.reminded_at_utc DESC"
    }

    if (!!!req.query.sort) {
        query = "select * from memory_tag as mt inner join tag as t on mt.tag_id = t.id inner join memory as m ON mt.memory_id = m.id"
    }

    connection.query(
        query,
        ((err, data) => {
            if (err) return res.status(400).json({ message: err.message });
            if (data) {
                res.status(200).json({ data: data });
            }
        }));
}

export const create = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) throw error;

    connection.query(
        "INSERT INTO memory (title,description,logo_url,event_date,user_id) VALUES(?,?,?,?,?)",
        [req.body.title, req.body.description, req.body.logoUrl, req.body.eventDate, req.body.userId],
        ((err, data) => {
            if (err) return res.status(400).json({ message: err.message });
            if (data) {
                for (let i = 0; i < req.body.tag.length; i++) {
                    const el = req.body.tag[i];
                    connection.query(
                        "INSERT INTO memory_tag (tag_id, memory_id) VALUES(?, ?)",
                        [el, data.insertId],
                        ((err, data) => { })
                    );
                }
                res.status(200).json({ message: "Memory created successfully.", data: { id: data.insertId } });
            }
        })
    );
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { error } = validate(req.body);
    if (error) throw error;

    connection.query(
        "UPDATE memory SET title = ?,description = ?,logo_url = ?,event_date = ?,user_id = ? WHERE id = ?",
        [req.body.title, req.body.description, req.body.logoUrl, req.body.eventDate, req.body.userId, id],
        ((err, data) => {
            if (err) return res.status(400).json({ message: err.message });
            if (data) {
                connection.query(
                    "DELETE FROM memory_tag WHERE memory_id=?",
                    [id],
                    ((err, data) => { })
                );
                for (let i = 0; i < req.body.tag.length; i++) {
                    const el = req.body.tag[i];
                    connection.query(
                        "INSERT INTO memory_tag (tag_id, memory_id) VALUES(?, ?)",
                        [el, id],
                        ((err, data) => { })
                    );
                }
                res.status(200).json({ message: "Memory updated successfully." });
            }
        })
    );
}

export const search = async (req, res) => {
    const { id } = req.params;

    connection.query(
        `select * from memory_tag as mt inner join tag as t on mt.tag_id = t.id inner join memory as m ON mt.memory_id = m.id where t.id = ${id}`,
        ((err, data) => {
            if (err) return res.status(400).json({ message: err.message });
            res.status(200).json({ data: data });
        })
    );
}

export const uploadPhoto = async (req, res) => {
    req.body.folderName = "memory";
    await photoUpload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!req.body.logoUrl) return res.status(400).json({ message: "Please Select the file." });

        res.status(200).json({
            message: "File uploaded successfully.",
            data: {
                filename: req.body.logoUrl
            }
        });
    })
};