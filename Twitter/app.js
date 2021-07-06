const text = document.getElementById("text");
const tweets = document.getElementById("tweets");
const message = document.getElementById("form-message");

let tweet_list = [];

var formulario = document.getElementById("tweet-form");
formulario.addEventListener("submit", setTweet);

var cont;
var date;

readTweets();

function setTweet(e){
    e.preventDefault();
    e.stopPropagation();

    console.log(text.value);
    date = new Date();

    if(text.value != ""){

        var tweet = {
            id: "tweet_" + cont,
            date: date.toLocaleString(),
            text: text.value
        };

        text.value = "";
        cont++;

        text.className = "";
        message.innerText = "";

        tweet_list.push(tweet);
        saveTweets();
    }
    else{
        text.className = "form-error";
        message.innerText = "Este campo es obligatorio";
    }
}

function deleteTweet(id){

    tweet_list = tweet_list.filter(tweet => tweet.id != id);
    saveTweets();
}

function saveTweets(){

    var json = JSON.stringify(tweet_list);
    localStorage.setItem("tweets", json);
    localStorage.setItem("tweet_cont", cont);
    displayTweets();
}

function readTweets(){
    var json = localStorage.tweets;
    if(json != undefined){
        tweet_list = JSON.parse(json);
    }
    else{
        tweet_list = [];
    }

    displayTweets();

    var json = localStorage.tweet_cont;
    if(json != undefined){
        cont = JSON.parse(json);
    }
    else{
        cont = 0;
    }
}

function displayTweets(){

    var html = "";

    for(var i = 0; i<tweet_list.length; i++){

        html += 
        `<div class="tweet" id="${tweet_list[i].id}">
            <div class="tweet-image">
                <img class="img-fluid" src="https://picsum.photos/200/" alt="">
            </div>

            <div class="tweet-content">
                <div class="flex justify-content-btw">
                    <div>
                        Fernando Herrera
                    </div>

                    <div>
                        ${tweet_list[i].date}
                    </div>
                </div>

                <p class="text-justify">
                    ${tweet_list[i].text}
                </p>

                <div class="text-right">
                    <button onclick="deleteTweet('${tweet_list[i].id}')">X</button>
                </div>
            </div>
        </div>`;
    }

    tweets.innerHTML = html;
}