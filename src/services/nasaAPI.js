const NASA_API_KEY = 'PhB5RlX2VdwByOh0eSLdVwzb0Qszu5wRln3mmnou'; // Reemplaza con tu API key

export const fetchNASAImages = async (count = 6) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}`
    );
    const data = await response.json();
    return data.filter(img => img.media_type === 'image');
  } catch (error) {
    console.error('Error fetching NASA images:', error);
    return [];
  }
};