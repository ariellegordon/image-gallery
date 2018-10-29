const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/', async (req, res, next) => {
  let { data } = await axios.get(
    'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=df47471a0c32855f4356e716a08b9520&gallery_id=66911286-72157692049980335&format=json&nojsoncallback=1&auth_token=72157672836458157-0707d11f8c84c03e&api_sig=dfdb8b24fba57f05417f0f04acaa5c99'
  );
  res.json(data);
});
