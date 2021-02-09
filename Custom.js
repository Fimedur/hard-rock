document.getElementById('search-click').addEventListener("click", SearchResult)

function SearchResult(){
    const input = document.getElementById('search-input').value;
    document.getElementById("search-data").innerHTML = " "
    fetch(`https://api.lyrics.ovh/suggest/${input}`)
    .then(res => res.json())
    .then(data => {   
        fetchData = data;
    for(i=0; i<=data.data.length; i++){
        const title = data.data[i].title;
        const artist =data.data[i].artist.name;

  
    
        document.getElementById("search-data").innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                                <div class="col-md-9">
                                                                  <h3 class="lyrics-name">${title}</h3>
                                                                    <p class="author lead">Album by <span>${artist}</span></p>
                                                                </div>
                                                                <div class="col-md-3 text-md-right text-center">
                                                                      <a href="#show-lyrics">
                                                                        <button onclick="GetLyrics(${i}) "  class="btn btn-success">Get Lyrics </button>
                                                                      </a>         
                                                                </div>
                                                               </div>`

      if (i>=4) {
       break
      }                                                           
    }
    });

    // https://api.lyrics.ovh/v1/artist/title
}
function GetLyrics(index) {
    const title = fetchData.data[index].title;
    const artist= fetchData.data[index].artist.name;
    document.getElementById("show-lyrics").innerHTML = ""
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>{
         console.log(data);
         var Lyrics = data.lyrics
        document.getElementById("show-lyrics").innerHTML += `<button class="btn go-back">&lsaquo;</button>
                                                            <h2 class="text-success mb-4">${artist} - ${title}</h2>
                                                            <div>
                                                            <pre class="lyric text-white">${Lyrics}</pre>
                                                            </div>`

    })
}

