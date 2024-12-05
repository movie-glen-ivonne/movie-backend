/**
 * @swagger
 * /api/recommendations/{id}:
 *   get:
 *     summary: Get movie recommendations based on a user's library
 *     description: Fetches a list of movie recommendations based on the movies in the user's library. It returns movie details and video links where available.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the library to fetch recommendations for.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of movie recommendations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the recommended movie.
 *                     example: 12345
 *                   poster_path:
 *                     type: string
 *                     description: URL to the poster image of the movie.
 *                     example: "/path/to/poster.jpg"
 *                   media_type:
 *                     type: string
 *                     description: The media type (movie or tv).
 *                     example: "movie"
 *                   saved:
 *                     type: boolean
 *                     description: Whether the movie is saved in the user's library.
 *                     example: false
 *       204:
 *         description: No library found for the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No library found"
 *       400:
 *         description: No matching recommendations found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No matching results found"
 *       500:
 *         description: Internal server error when fetching recommendations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error 🔴, try again"
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
