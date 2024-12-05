/**
 * @swagger
 * /api/search/:
 *   get:
 *     summary: Get movie or TV show details by ID
 *     description: Fetches movie or TV show details by ID, including metadata like poster, release date, overview, vote average, and a video link if available.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the movie or TV show to search for.
 *         schema:
 *           type: string
 *           example: "12345"
 *       - name: type
 *         in: query
 *         required: true
 *         description: The type of media to search for (movie or tv).
 *         schema:
 *           type: string
 *           enum: [movie, tv]
 *           example: "movie"
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
 *                   example: 12345
 *                 poster_path:
 *                   type: string
 *                   description: URL to the poster image.
 *                   example: "/path/to/poster.jpg"
 *                 first_air_date:
 *                   type: string
 *                   format: date
 *                   description: The release or air date of the movie/show.
 *                   example: "2020-12-15"
 *                 original_name:
 *                   type: string
 *                   description: The original title or name of the movie/show.
 *                   example: "Movie Title"
 *                 overview:
 *                   type: string
 *                   description: A short description of the movie/show.
 *                   example: "This is an exciting action movie."
 *                 vote_average:
 *                   type: number
 *                   format: float
 *                   description: The average vote rating for the movie/show.
 *                   example: 7.8
 *                 media_type:
 *                   type: string
 *                   description: The type of media (movie or tv).
 *                   example: "movie"
 *                 video_url:
 *                   type: string
 *                   description: A URL to a video preview or trailer (if available).
 *                   example: "https://www.youtube.com/watch?v=abcdef"
 *                 saved:
 *                   type: boolean
 *                   description: Whether the movie/show is saved in the user's library.
 *                   example: false
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
