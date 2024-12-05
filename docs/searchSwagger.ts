/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for movies or shows
 *     description: Retrieves a list of movies or shows based on a search query, with caching to improve performance.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: The search query for the movies or shows (e.g., title, actor, genre).
 *         schema:
 *           type: string
 *           example: "Inception"
 *     responses:
 *       200:
 *         description: A list of movies or shows matching the search query, filtered and sorted by popularity.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the movie or show.
 *                     example: 1241982
 *                   poster_path:
 *                     type: string
 *                     description: The URL of the movie's poster image.
 *                     example: "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg"
 *                   media_type:
 *                     type: string
 *                     description: The type of the media (either 'movie' or 'tv').
 *                     example: "movie"
 *                   popularity:
 *                     type: number
 *                     format: float
 *                     description: The popularity score of the movie or show.
 *                     example: 9.5
 *       400:
 *         description: No matching results found for the given query.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No matching results found"
 *       500:
 *         description: Error fetching movies from the external API or internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching movies from external API"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 */
