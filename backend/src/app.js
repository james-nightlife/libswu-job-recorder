import configMongoose from "./config/configMongoose.js";

const start = async (app, port) => {
    try{
        await configMongoose();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }catch(e){
        console.error(e);
        return;
    }
};

export default start;