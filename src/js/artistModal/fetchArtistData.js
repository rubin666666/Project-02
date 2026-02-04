import axios from 'axios';

export async function fetchArtistData(artistId) {
  if (!artistId) {
    throw new Error('Artist ID is required');
  }
  const [artistRes, allArtistsRes] = await Promise.all([
    axios.get(`https://sound-wave.b.goit.study/api/artists/${artistId}`),
    axios.get(`https://sound-wave.b.goit.study/api/artists`),
  ]);

  const artistData = artistRes.data;

  const allArtists = allArtistsRes.data.artists || [];

  if (!artistData?.strArtist) throw new Error('No artist data');

  const fullArtistData = allArtists.find(artist => artist._id === artistId);

  if (fullArtistData?.genres) {
    artistData.genres = fullArtistData.genres;
  }

  return artistData;
}
