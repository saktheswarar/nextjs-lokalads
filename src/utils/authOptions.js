import connectDB from '../config/database';
import User from '../lib/models/User';
import GoogleProvider from 'next-auth/providers/google';

import { signIn } from 'next-auth/react';

export const authOptions = { 
    providers: [
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                authorization: {
                    params:{
                        prompt: 'consent',
                        access_type: 'offline',
                        response_type: 'code'
                    }
                }
            }
        )
    ],
    callbacks: {
        // invoked on successful sign in
        async signIn({ profile }){
            //1. connect to the database
            await connectDB();
            //2. check if user exists
            const userExists = await User.findOne({ email:profile.email });
            //3. if not, create user
            if (!userExists) {
                // Truncate user name if too long
                const username = profile.name.slice(0, 20);
        
                await User.create({
                  email: profile.email,
                  username,
                  image: profile.picture,
                });
              }
            //4. return true allow to sign in
            return true;
        },
        //session callback function that modifies the session object
        async session({ session }){
            //1. get user from database
            const user = await User.findOne({ email: session.user.email });
            //2. assign user id for session
            session.user.id = user._id.toString();
            //3. return session
            return session;
        },
    },
};