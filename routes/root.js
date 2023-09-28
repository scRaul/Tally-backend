const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200);
    const message = "Tally API";

    if (req.accepts("json")) {
        res.json({ message });
    } else {
        res.type("text").send(message);
    }
});

module.exports = router;
