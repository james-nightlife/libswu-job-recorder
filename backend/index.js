import configMongoose from "./src/config/configMongoose.js";
import app from "./src/app.js";

console.log('PORT:', process.env.PORT);
const PORT = process.env.PORT || 3000;

const start = async () => {
    try{
        await configMongoose();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }catch(e){
        console.error(e);
        return;
    }
};

start();