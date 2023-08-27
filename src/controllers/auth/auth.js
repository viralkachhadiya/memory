import { validate } from './_validation.js';
import connection from '../../startup/db.js';

export const login = async (req, res) => {
    const { error } = validate(req.body);
    if (error) throw error;

    connection.query(
        "SELECT * FROM user WHERE email = ?",
        [req.body.email],
        ((err, data, fields) => {
            if (err) return res.status(400).json({ message: err.message });
            if (data.length > 0) {
                res.status(200).json({ message: "User login successfully.", data: { id: data[0].id } });
            }
            else {
                connection.query(
                    "INSERT INTO user (email) VALUES(?)",
                    [req.body.email],
                    ((err, data, fields) => {
                        if (data) {
                            res.status(200).json({ message: "User login successfully.", data: { id: data.insertId } });
                        }
                    })
                );
            }

        })
    );
};