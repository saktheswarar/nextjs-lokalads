import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions"; // Use absolute import

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
