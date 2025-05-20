//declare

var qout = {
    qouttext: "",
    qoutAuthor: ""

}
qoutList = [
    {
        qouttext: "“Be yourself; everyone else is already taken.”",
        qoutAuthor: "― Oscar Wilde"
    },
    {
        qouttext: "“Two things are infinite: the universe and human stupidity; ”",
        qoutAuthor: "― Albert Einstein"
    },
    {
        qouttext: "“A room without books is like a body without a soul.”",
        qoutAuthor: "― Marcus Tullius Cicero"
    },
    {
        qouttext: "“Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.”",
        qoutAuthor: "― Bernard M. Baruch"
    },
    {
        qouttext: "“You only live once, but if you do it right, once is enough.”",
        qoutAuthor: "― Mae West"
    },
    {
        qouttext: "“A friend is someone who knows all about you and still loves you.”",
        qoutAuthor: "― Elbert Hubbard"
    },
]




var qoutIndex;
var lastIndex;
var qout = document.getElementById('quote')
var author = document.getElementById('quoteAuthor')

function getNewQuto() {


    qoutIndex = Math.floor(Math.random() * qoutList.length);
    while (qoutIndex == lastIndex) {
        qoutIndex = Math.floor(Math.random() * qoutList.length);
    }
    qout.innerHTML = qoutList[qoutIndex].qouttext;
    author.innerHTML = qoutList[qoutIndex].qoutAuthor;
    lastIndex = qoutIndex;
}