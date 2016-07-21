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
        div.innerHTML = '<p class="title"><a href="'+entry.link+'" target="_blank">'+entry.title+'</a></p><p class="date">'+
        formatDate(new Date(entry.pubdate_ms))+'</p>'
        blogDiv.appendChild(div)
      }
    }
  })
}
