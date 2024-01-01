import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '@/libs/mongoConnect'

const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
          const {email, password} = credentials;
          
          try {
            
          mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
  
          if(!user){
            return null;
          }
  
          const passwordOk = user && bcrypt.compareSync(password, user.password);
  
          if(!passwordOk){
          return null
          }
  
          return user;
  
          } catch (error) {
            console.log(error)
          }
          }
        })
      ],
      session: {
        strategy: "jwt",
      },
      secret: process.env.SECRET,
      adapter: MongoDBAdapter(clientPromise),
  }

  export default authOptions;
