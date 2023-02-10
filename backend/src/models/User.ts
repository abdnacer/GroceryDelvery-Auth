import { InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

  type User = InferSchemaType<typeof UserSchema>

  export default model<User>("User", UserSchema)