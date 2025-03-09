import fastify from "fastify";
import { supabase } from "./supabaseConnection";

const app = fastify();

type User = {
  name: string;
  email: string;
};

app.get("/users", async () => {
  try {
    const { data: users } = await supabase.from("users").select("*");
    return { users };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.post("/users", async (request, response) => {
  try {
    const { name, email } = request.body as User;
    const { data: createdUser } = await supabase
      .from("users")
      .insert({
        name,
        email,
      })
      .select();
    return createdUser ? createdUser[0] : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("Server is running!");
  });
