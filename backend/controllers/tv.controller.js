import { fetchFromTMDB } from "../services/tmdb.service.js";

// Fetches trending TV shows for the day from the TMDB API and returns a random show.
export async function getTrendingTv(req, res) {
  try {
    // Fetch data from TMDB API endpoint for trending TV shows
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    // Randomly select a TV show from the fetched results
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    // Respond with the randomly selected TV show
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    // Handle errors by returning a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches trailers for a specific TV show based on its ID
export async function getTvTrailers(req, res) {
  const { id } = req.params; // Extract TV show ID from request parameters
  try {
    // Fetch trailers for the given TV show ID
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    // Respond with the fetched trailers
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    // Handle a 404 error if no trailers are found for the TV show
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    // Handle other errors by returning a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches detailed information about a specific TV show based on its ID
export async function getTvDetails(req, res) {
  const { id } = req.params; // Extract TV show ID from request parameters
  try {
    // Fetch detailed information for the given TV show ID
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    // Respond with the detailed TV show data
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    // Handle a 404 error if the TV show details are not found
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    // Handle other errors by returning a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches similar TV shows to a given TV show based on its ID
export async function getSimilarTvs(req, res) {
  const { id } = req.params; // Extract TV show ID from request parameters
  try {
    // Fetch similar TV shows based on the given TV show ID
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    // Respond with the list of similar TV shows
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    // Handle errors by returning a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetches TV shows by a specified category (e.g., popular, top rated, etc.)
export async function getTvsByCategory(req, res) {
  const { category } = req.params; // Extract category from request parameters
  try {
    // Fetch TV shows from the specified category
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    // Respond with the list of TV shows in the specified category
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    // Handle errors by returning a 500 status with an error message
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
