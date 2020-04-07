var lyrics;
var lyricList;
let gifAPIKey;

//triggers event with mouse click
document.getElementById('submitBtn').addEventListener('click',function(e){
    document.getElementById('gif').innerHTML = null;
    let artist = document.getElementById('artistName').value;
    let song = document.getElementById('songTitle').value;



    let lyricAPI = `https://api.lyrics.ovh/v1/${artist}/${song}`

//calls lyric API
    fetch(lyricAPI)
        .then(response => {
            return response.json();
        })
        .then(json => {
            lyrics = json.lyrics;
            lyrics = lyrics.split('\n').join(" <br/> ");
            addSpan();
        })
        .catch(err => {console.log("you got an error: ", err)})

    //function for creating background images    
    callArtistGif("GIF1", "artistGif");
    callArtistGif("GIF2", "artistGif2");
    callArtistGif("GIF3", "artistGif3");
    
})

//function to add lyrics to HTML page
function addLyrics(){

    if(document.getElementById('lyrics')){
        document.getElementById('lyrics').innerHTML = lyrics;
    } else {
        var lyricP = document.createElement('p');
        lyricP.setAttribute('id',"lyrics")
        lyricP.innerHTML = lyrics;
        document.getElementById('lyricContainer').appendChild(lyricP);
    }
    addSpanE()
}

//function separate lyric string to separate words and add span for each word
function addSpan(){
    lyricWords = lyrics.split(' ');
    lyricList = lyrics.split(' ')
    //console.log("lyricWords: ", lyricWords)
    for (var i = 0; i<lyricWords.length; i++){
        //console.log(lyricWords[i])
        if (lyricWords[i] == "<br/>"){console.log('!!!')}
        else if (lyricWords[i] != " <br/> " || lyricWords != '<br/>' || lyricWords[i] != ""){
            lyricWords[i] = "<span id=" + lyricWords[i] + ">" + lyricWords[i] + "</span>"
        }
        
    }
    lyrics = lyricWords.join(" ");
    //console.log("new lyrics: ", lyrics)
    addLyrics()
}

//Adds background GIFS from artist name
function callArtistGif(idTag, elementID) {

    let artist = document.getElementById('artistName').value;
    console.log("artist: ", artist)
    let ranVar = Math.floor(Math.random() *30);
    console.log(ranVar);
    let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${artist}&api_key=${gifAPIKey}&limit=30`;


    fetch(giphyAPI)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    imageSRC = json.data[ranVar].images.original.url;
                    if(document.getElementById(idTag)){
                        document.getElementById(idTag).src = imageSRC
                    } else{
                        var artistGIF = document.createElement("img");
                        artistGIF.setAttribute("id",idTag)
                        artistGIF.src = imageSRC;
                        document.getElementById(elementID).appendChild(artistGIF);
                    }

                    
                })
} 

//add call events to invidual words in lyrics
function addSpanE(){
    console.log("____________________")
    for (var i=0; i < lyricList.length; i++){
        console.log(lyricList[i])
        if (lyricList[i] == '<br/>'){console.log("x")}
        else {
            console.log(lyricList[i])
            if (document.getElementById(lyricList[i]) != null){
            //console.log(lyricList)
                document.getElementById(lyricList[i]).addEventListener('click', function(e){
                    //let id = lyricList[i]
                    //console.log("ive been clicked: ",document.getElementById(lyricList[i]))
                    console.log("clicked: ", this.innerText)
                    let keyword = this.innerHTML
                    callGIF(keyword)
                })
        }
        }
    }
}

//function call GIF from individual words from lyrics
function callGIF(keyword){
    event.preventDefault();
    //console.log("hello")
    let imageSRC;
    let userInput = keyword
    console.log(userInput)
    let ranVar = Math.floor(Math.random() *30);
    let giphyAPI = `https://api.giphy.com/v1/gifs/search?q=${userInput}&api_key=${gifAPIKey}&limit=30`;

    fetch(giphyAPI)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    console.log(json)
                    console.log("what is this: ", json.data[ranVar].images.original.url);
                    imageSRC = json.data[ranVar].images.original.url;
                    if(document.getElementById('image')){
                        document.getElementById('image').src = imageSRC
                    } else{
                        var gifI = document.createElement("img");
                        gifI.setAttribute("id","image")
                        gifI.src = imageSRC;
                        //gifI.setAttribute("src", imageSRC);
                        //console.log("my elem: ", document.getElementById('gif'))
                        document.getElementById('gif').appendChild(gifI)
                    }
                    
                })

                .catch(err => console.log(err));

    console.log(ranVar);
}

document.getElementById('refreshBtn').addEventListener('click',function(e){
    window.location.reload();
})