import connectDB from "@/config/database";
import Property from "@/lib/models/Property";

export const GET = async () => {
    try {
        await connectDB();

        const properties = await Property.find({});

        return new Response(properties,{
            status:200,
        });
    } catch (error) {
        return new Response('something went worng', {status:500});
    }

   
};