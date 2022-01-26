window.addEventListener('DOMContentLoaded', () => {
    const parsedUrl = new URL(window.location);
    // searchParams.get() will properly handle decoding the values.
    alert("Hello");
    console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
    console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
    console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
    document.getElementById("shareTarget").innerHTML = 'Title shared: ' + parsedUrl.searchParams.get('title')
    + 'Text shared: ' + parsedUrl.searchParams.get('text') + 'URL shared: ' + parsedUrl.searchParams.get('url');
  });


