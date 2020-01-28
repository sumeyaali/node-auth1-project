
const bc = require("bcryptjs");
 
 
const router = require("express").Router();

const Users = require("../users/usersModel");


router.get("/users", (req, res, next) => {
    if (req.headers.authorization) {
        bc.hash(req.headers.authorization, 10 , (err, hash) => {
            //10 is the number of rounds
            if (err) {
                res.status(500).json({ oops: "Something broke" });
            } else {
                res.status(200).json({ hash });
            }
        });
    } else {
        res.status(400).json({ error: "Missing header" });
    }
});

router.post("/register", (req, res) => {
    const user = req.body;

    const hash = bc.hashSync(req.body.password, 10);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


router.post('/login', (req,res) => {
const {username, password} = req.body

Users.findBy({username})
.first()
        .then(user => {
            if (user && bc.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});



module.exports = router;