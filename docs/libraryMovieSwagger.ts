/**
 * @swagger
 * /api/managelibrary/add:
 *   post:
 *     summary: Add a movie to the user's library
 *     description: Adds a movie to a specific library if it doesn't already exist.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libraryId:
 *                 type: integer
 *                 description: The ID of the library to add the movie to.
 *                 example: 1
 *               movie:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The external ID of the movie.
 *                     example: "12345"
 *                   original_name:
 *                     type: string
 *                     description: The name of the movie.
 *                     example: "Inception"
 *                   first_air_date:
 *                     type: string
 *                     description: The release date of the movie.
 *                     example: "2010-07-16"
 *                   poster_path:
 *                     type: string
 *                     description: The path to the movie poster image.
 *                     example: "/images/inception.jpg"
 *                   overview:
 *                     type: string
 *                     description: The description of the movie.
 *                     example: "A mind-bending thriller about dreams within dreams."
 *                   vote_average:
 *                     type: number
 *                     description: The average rating of the movie.
 *                     example: 8.8
 *                   video_url:
 *                     type: string
 *                     description: A URL for the movie's trailer or video.
 *                     example: "https://www.youtube.com/watch?v=d3A3-zSOBtA"
 *                   media_type:
 *                     type: string
 *                     description: The type of media (e.g., movie, TV show).
 *                     example: "movie"
 *     responses:
 *       201:
 *         description: Movie successfully added to the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie added successfully!"
 *       404:
 *         description: The library does not exist or the movie is already part of the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The movie is already part of this library"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error!"
 */

/**
 * @swagger
 * /api/managelibrary/remove:
 *   post:
 *     summary: Remove a movie from the user's library
 *     description: Removes a movie from a specific library if it exists in that library.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libraryId:
 *                 type: integer
 *                 description: The ID of the library to remove the movie from.
 *                 example: 1
 *               idMovie:
 *                 type: string
 *                 description: The external ID of the movie to be removed.
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Movie successfully removed from the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie removed successfully!"
 *       404:
 *         description: The movie or library does not exist, or the movie is not in the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error!"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
