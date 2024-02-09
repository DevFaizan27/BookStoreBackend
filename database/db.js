import { connect } from "mongoose";
import 'dotenv/config'


const connectToMongo = async () => {
  try {
    await connect(process.env.mongoDBURL);
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;