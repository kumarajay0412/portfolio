import * as handTrack from 'handtrackjs';

const img = document.getElementById('img');

// Load the model.
handTrack.load().then(model => {
  // detect objects in the image.
  console.log("model loaded")
  model.detect(img).then(predictions => {
    console.log('Predictions: ', predictions); 
  });
});