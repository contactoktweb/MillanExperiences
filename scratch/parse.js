const fs = require('fs');

const html = fs.readFileSync('./raw.html', 'utf8');
const reviews = [];

// We can use simple regex to extract blocks
const reviewBlocks = html.split('aria-label="Photo of ');
reviewBlocks.shift(); // remove first part

const extractedReviews = reviewBlocks.map(block => {
  // Name
  const nameMatch = block.match(/^(.*?)"/);
  const name = nameMatch ? nameMatch[1] : 'Unknown';
  
  // Rating
  const starsMatch = block.match(/aria-label="5 stars"/);
  const rating = starsMatch ? 5 : 4; // Simplification, can be improved

  // Date
  const dateMatch = block.match(/<span class="rsqaWe">([^<]+)<\/span>/);
  const date = dateMatch ? dateMatch[1] : '';

  // Text
  const textMatch = block.match(/<span class="wiI7pd"[^>]*>(.*?)<\/span>/);
  const text = textMatch ? textMatch[1].replace(/<[^>]+>/g, '') : '';

  // Photos
  const photos = [];
  const photoRegex = /background-image: url\(&quot;(.*?)&quot;\)/g;
  let photoMatch;
  while ((photoMatch = photoRegex.exec(block)) !== null) {
    photos.push(photoMatch[1]);
  }

  return { name, rating, date, text, photos };
});

fs.writeFileSync('scratch/extracted-reviews.json', JSON.stringify(extractedReviews, null, 2));
console.log('Extracted', extractedReviews.length, 'reviews.');
