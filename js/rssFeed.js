function formatDate(date){
  var year = date.getYear()
  if(year < 1900){
    year += 1900
  }
  var month = date.getMonth()+1
  var day = date.getDate()
  var hour = date.getHours()
  var minutes = date.getMinutes()
  if(minutes < 10){
    minutes = '0' + minutes
  }
  return year + '/' + month + '/' + day + ' ' + hour + ':' +minutes
}
//Setting timer for this function
var timer = setInterval(loadEntries, 1000)

function loadEntries(url,id){
  var blogDiv = document.getElementById(id)
  feednami.load(url,function(res){
    blogDiv.removeChild(blogDiv.querySelector('.loading'))
    var entries = res.feed.entries
    var added = 0;
    for(var i = 0; i < entries.length && added < 5; i++){
      var entry = entries[i]
      if(entry.title.indexOf('PR:') == -1){
        added++
        var div = document.createElement('div')
        div.setAttribute('class','entry')
        div.innerHTML = '<p class="title"><a href="'+entry.link+'" target="_blank">'
                         +entry.title
                         +'</a></p><p class="summary">'
                         +entry.description
                         +'</p><p class="date">'+
        formatDate(new Date(entry.pubdate_ms))+'</p>'
        blogDiv.appendChild(div)
      }
    }
  })
}


window.onload = function(){
  loadEntries('http://feeds.bbci.co.uk/news/world/rss.xml?edition=uk','bbc')
}
