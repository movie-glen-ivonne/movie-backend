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
 *         description: Successfully fetched movie or TV show details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the movie or TV show.
 *                   example: 27205
 *                 poster_path:
 *                   type: string
 *                   description: URL to the poster image.
 *                   example: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
 *                 media_type:
 *                   type: string
 *                   description: The type of media (movie or tv).
 *                   example: "movie"
 *                 popularity:
 *                   type: number
 *                   format: float
 *                   description: The popularity score of the movie/show.
 *                   example: 100.225
 *       400:
 *         description: No matching results found for the given ID or query.
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
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
