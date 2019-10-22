const axios = require('axios');

const Policies = require('../models/Polices')
const Users = require('../models/Users')

let MigratePolices = (req, res) => {
    axios.get('http://www.mocky.io/v2/580891a4100000e8242b75c5')
        .then(r => {
            let policies = r.data.policies
            let policiesdb = [];
            let users;
            /* for (let index = 0; index < array.length; index++) {
                const element = array[index];
                
            } */
            policies.forEach(policie => {
                //console.log('forEach');

                Users.findOne({ id: policie.clientId }, (err, userdb) => {
                    
                    Policies.findOne({ id: policie.id }, (err, poli) => {
                        if (err) {
                            console.log('err Policies');
                            res.json(err)
                            
                        }
                        if (!poli) {
                            console.log(userdb);
                            let newPolicie = new Policies({
                                id: policie.id,
                                amountInsured: policie.amountInsured,
                                email: policie.email,
                                inceptionDate: policie.inceptionDate,
                                installmentPayment: policie.installmentPayment,
                                clientId: userdb._id,
                            });
                            //users = {};
                            newPolicie.save((err, policiedb) => {
                                if (err) res.json(err)
                                policiesdb.push({ ok: 'storage', policiedb })
                             });

                        }
                        console.log(userdb);
                        //console.log('policies exist', poli);
                    })
                })
            });
        })
        Policies.find({}, (err, policiedbs) =>{
            res.json({
                policies: policiedbs
            })
        })
}

let GetPolicies = async (req, res) => {
    let policies = await Policies.find()
    res.json({ policies })
}

let GetPolicie = async (req, res) => {
    let param = req.params.param;
    let policie;
    /* if (param.search(/[^a-zA-Z]+/) === -1) {
        police = await Policies.findOne({name: param}).populate('users')
        res.json(police)
    } */
    policie = await Policies.findById(param)
    res.json({
        policie
    })

}


module.exports = {
    MigratePolices,
    GetPolicies,
    GetPolicie
}