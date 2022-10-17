import mongoose from "mongoose";
const DB_URL =
  "mongodb+srv://MERNDB:merndb7300@cluster0.ysqqg.mongodb.net/?retryWrites=true&w=majority";

export const connection = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo db connected with server: ${data.connection.host}`);
    });
};
