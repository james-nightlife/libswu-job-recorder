import { modelJobRecord } from "../model/modelJobRecord.js";

export const getOneJobRecord = async (req, res, next) => {
    return res.status(404).json({})
}

export const getAllJobRecord = async (req, res, next) => {
    try{
        const records = await modelJobRecord.find();
        //console.log(records)
        return res.status(200).json(records)
    }catch(e){
        console.error(e);
        return res.status(500).json({})
    }
}

export const postJobRecord = async (req, res, next) => {
    const {username, name, workDate, description, progression, hours, minutes} = req.body;
    const file = req.files;
    //console.log(`${username}\n${workdate}\n${name}\n${description}\n${progression}\n${hours}\n${minutes}\n\n`)
    try{
        const record = new modelJobRecord({
            username,
            name,
            workDate,
            description,
            progression,
            hours,
            minutes,
            fileNames: file.map((x, idx) => x.filename)
        })
        await record.save();
        return res.status(200).json({})
    }catch(e){
        console.error(e);
        return res.status(500).json({})
    }
}

export const putJobRecord = async (req, res, next) => {
    return res.status(500).json({})
}

export const deleteJobRecord = async (req, res, next) => {
    return res.status(500).json({})
}