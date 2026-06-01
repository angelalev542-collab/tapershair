const PLACE_ID = 'ChIJ1YmrqxO6EmsRs5zNTJyHGkg';
const FIELDS = 'rating,user_ratings_total,reviews';
const MAX_REVIEWS = 5;

exports.handler = async function (event) {
  const apiKey = process.env.NETLIFY_GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Missing Google API key in Netlify environment.' }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(PLACE_ID)}&fields=${FIELDS}&key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status !== 'OK') {
      return {
        statusCode: 502,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Google Places API error', details: data.status || response.statusText }),
      };
    }

    const result = data.result || {};
    const reviews = (result.reviews || [])
      .slice(0, MAX_REVIEWS)
      .map((review) => ({
        author: review.author_name || 'Anonymous',
        rating: review.rating || 0,
        time: review.relative_time_description || review.time || '',
        text: review.text || '',
      }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        rating: result.rating || 0,
        total_ratings: result.user_ratings_total || 0,
        reviews,
      }),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to fetch Google reviews.', details: error.message }),
    };
  }
};
