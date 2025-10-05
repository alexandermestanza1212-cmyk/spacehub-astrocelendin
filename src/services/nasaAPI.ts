const NASA_API_KEY = 'PhB5RlX2VdwByOh0eSLdVwzb0Qszu5wRln3mmnou';

export interface NASAImage {
  url: string;
  title: string;
  explanation?: string;
  date?: string;
  media_type: string;
}

export const fetchNASAImages = async (count: number = 6): Promise<NASAImage[]> => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}`
    );
    const data = await response.json();
    return data.filter((img: NASAImage) => img.media_type === 'image');
  } catch (error) {
    console.error('Error fetching NASA images:', error);
    return [];
  }
};