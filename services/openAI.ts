import OpenAIApi from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_KEY;

const openai = new OpenAIApi({
    organization: process.env.OPENAI_ORGANIZATON,
    project: process.env.OPENAI_PROJECT,
    apiKey: process.env.OPENAI_API_KEY
});


export async function getTop10Movies(movieList: string[]): Promise<string> {
    const moviesString = movieList.map(movie => `${movie}`).join(", ");
    console.log(moviesString)
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Based on the following list of movies and/or TV shows, return a JSON array (in a plain string format, and not include this in your answer ```json) your top 10 recommended movies and/or TV shows. (only their ORIGINAL NAME), You can not include the movies given to you",
            },
            {
                role: "user",
                content: moviesString,
            },
        ],
    });

    const csvResult = completion.choices[0].message?.content || "No response";
    console.log("CSV of Top 10 Movies:");
    console.log(csvResult);
    return csvResult;
}