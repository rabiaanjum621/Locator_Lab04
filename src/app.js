window.addEventListener('DOMContentLoaded', () => {
    const parsedUrl = new URL(window.location);
    // searchParams.get() will properly handle decoding the values.
    // alert("Hello");
    // console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
    // console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
    // console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
    var title = parsedUrl.searchParams.get('title');
    var text = parsedUrl.searchParams.get('text');
    var url = parsedUrl.searchParams.get('url');
    var result = "";
    if(title != null) {
      result += title
    }
    if(text != null) {
      result += " " + text
    }
    if(url != null) {
      result += " " + url 
    }
    document.getElementById("shareTarget").innerHTML = result;
  });


