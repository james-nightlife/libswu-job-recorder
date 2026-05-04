import { modelJobRecord } from "../model/modelJobRecord.js";

export const getOneJobRecord = async (req, res, next) => {
    const {_id} = req.params;
    try{
        const record = await modelJobRecord.findById(_id);
        if(!record){
            return res.status(404).json({})
        }
        return res.status(200).json(record)
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: e.name
        })
    }
    
}

export const getAllJobRecord = async (req, res, next) => {
    try{
        const records = await modelJobRecord.find();
        //console.log(records)
        return res.status(200).json(records)
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: e.name
        })
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
        return res.status(500).json({
            message: e.name
        })
    }
}

export const putJobRecord = async (req, res, next) => {
    const {_id} = req.params
    const {username, name, workDate, description, progression, hours, minutes, fileNames} = req.body;
    
    if((!username && !name && !workDate && !description && !progression && !hours && !minutes && !fileNames) || !_id){
        return res.status(404).json({})
    }
    try{
        const edit = await modelJobRecord.findByIdAndUpdate(_id, {
            username,
            name, 
            workDate,
            description,
            progression,
            hours,
            minutes,
            fileNames
        })
        if(!edit){
            return res.status(404).json({})
        }
        return res.status(200).json(edit)
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: e.name
        })
    }


    
    
}

export const deleteJobRecord = async (req, res, next) => {
    const {_id} = req.params;
    try{
        const deleteData = await modelJobRecord.findByIdAndDelete(_id);
        if(!deleteData){
            return res.status(404).json({})
        }
        return res.status(200).json(deleteData)
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: e.name
        })
    }
}