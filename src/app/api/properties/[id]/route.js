import connectDB from "@/config/database";
import Property from "@/lib/models/Property";

export const GET = async (request, {params}) => {
    try {
        await connectDB();

        const property = await Property.findById(params.id);

        if(!property) return new Response('property not found', {status:404});

        return new Response(property,{
            status:200,
        });
    } catch (error) {
        return new Response('something went worng', {status:500});
    }

   
};