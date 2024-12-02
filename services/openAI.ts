import OpenAIApi from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_KEY;

const openai = new OpenAIApi({
    organization: "org-xp98QTW8xh4SGPfEfnWHx1nj",
    project: "$PROJECT_ID",
    apiKey: process.env.OP
});


async function getTop10MoviesInCSV(movieList: {name: string }[]): Promise<void> {
    const moviesString = movieList.map(movie => `${movie.name}`).join(", ");
    console.log(moviesString)
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Based on the following list of movies, return a list in CSV format of your top 10 recommended movies.",
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
}