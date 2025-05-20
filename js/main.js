//
qoutList = [
    '“Be yourself; everyone else is already taken.”',
    '“Two things are infinite: the universe and human stupidity; ”',
    '“A room without books is like a body without a soul.”',
    '“Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.”',
    '“You only live once, but if you do it right, once is enough.”'
    , '“A friend is someone who knows all about you and still loves you.”'
]

qoutAuthorList = [
    '― Oscar Wilde',
    '― Albert Einstein',
    '― Marcus Tullius Cicero',
    '― Bernard M. Baruch',
    '― Mae West',
    '― Elbert Hubbard'
]
// getNewQuto = () => {
//     var lastIndex;
//     var qout = document.getElementById('quote')
//     var author = document.getElementById('quoteAuthor')
//     var qoutIndex = Math.floor(Math.random() * qoutList.length)
//     qout.innerHTML = qoutList[qoutIndex]
//     author.innerHTML = qoutAuthorList[qoutIndex]
// }




var qoutIndex;
var lastIndex;
var qout = document.getElementById('quote')
var author = document.getElementById('quoteAuthor')

getNewQuto = () => {


    qoutIndex = Math.floor(Math.random() * qoutList.length);
    while (qoutIndex == lastIndex) {
        qoutIndex = Math.floor(Math.random() * qoutList.length);
    }
    qout.innerHTML = qoutList[qoutIndex];
    author.innerHTML = qoutAuthorList[qoutIndex];
    lastIndex = qoutIndex;
}