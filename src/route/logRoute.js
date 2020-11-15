const {Router} = require("express");
const Log = require("./../models/logEntrySchema");

const router = Router();

// @ROUTE api/logs/
router.get("/", async (req, res, next) => {
    try{
        const logs = await Log.find();
        res.json(logs)
    }
    catch (error) {
        next(error)
    }
})


router.post("/", async (req, res, next) => {
    try {

        const log = new Log(req.body);
        const createdEntry = await log.save()
        res.json(createdEntry)

    } catch(error){
        if(error.name === 'ValidationError'){
            res.status(422)
        }
        next(error) 
    }
})

module.exports = router