const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
const downloadImage = (image) => {
  return new Promise((resolve, reject) => {
    const img = new Image(); // Create a new image element
    img.src = image.url; // Set the image source URL

    // If the image loads successfully, resolve the promise
    img.onload = () => resolve(img);

    // If the image fails to load, reject the promise with an error message
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
};

// Function to handle the downloading of all images
const downloadImages = () => {
  // Clear the output div before starting new download
  output.innerHTML = '';

  // Use Promise.all to download all images in parallel
  Promise.all(images.map(downloadImage))
    .then((result) => {
      // Once all images are downloaded, display them in the output div
      result.forEach((img) => {
        output.appendChild(img); // Append each downloaded image
      });
    })
    .catch((error) => {
      // If any image fails to load, log the error
      const errorMessage = document.createElement('p');
      errorMessage.textContent = error; // Show the error message
      output.appendChild(errorMessage); // Append the error message
    });
};

// Add event listener to the button
btn.addEventListener("click", downloadImages);
