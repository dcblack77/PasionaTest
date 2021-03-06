const bcrypt = require("bcrypt");
const _ = require("underscore");
const axios = require("axios");

const Users = require("../models/Users");

let GetUser = async (req, res) => {
	let id = req.params.id;
	try {
		const client = await Users.find({id:id})
		res.json({ok: true, client})
	} catch (e) {
		res.status(400).json(e)
	}
};

let GetUsers = async (req, res) => {

    try {
        const clients = await Users.find();
        res.json(clients);
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
};

let MigrateUsers = async (req, res) => {

	await axios
        .get("http://www.mocky.io/v2/5808862710000087232b75ac")
        .then(function(response) {
            let clients = response.data.clients;
            clients.forEach(client => {
                Users.findOne({ id: client.id }, (err, resp) => {
                    if (err) {
                        console.log(`Error ${err}`)
                        return res.json({
                            err
                        })
                    }
                    if (!resp) {
                        let newUser = new Users({
                            name: client.name,
                            email: client.email,
                            role: client.role,
                            password: bcrypt.hashSync(client.name, 10),
                            id: client.id
                        });
                        newUser.save((err, resp) => {
                            if (err) {
                                return res.status(500).json({ err });
                            }
                        });
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
        });
    res.json({
        //clients
        status: "Migration finishing"
    });
};

let LoginUser = (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, userdb) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userdb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User no found'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, userdb.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Password no found'
                }
            });
        }

        let token = jwt.sign({
            user: userdb
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            user: userdb,
            token
        });


    });
};

module.exports = {
    MigrateUsers,
    GetUsers,
    GetUser,
    LoginUser
};
