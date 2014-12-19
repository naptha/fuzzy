var search_hit;
var search_active = false;

document.addEventListener('keydown', function(e){
	// TODO: keyCode == 114 (F3) also
	if((e.ctrlKey || e.metaKey) && e.keyCode == 70){
		// ctrl+f was pressed, now take all the images on the 
		// page and then OCR them so that they can be searchable
		
		// following with the whole idea of doing all the computation
		// lazily, naptha also only runs OCR once the user hits Ctrl+F
		// this was actually scott robinson's idea
		search_hit = Date.now()
	}
}, true)


window.addEventListener('blur', function(){
	if(search_hit && Date.now() - search_hit < 1000){
		search_active = true;
		search_hit = 0;
		console.log('search starting')
		// 

		// setInterval(function(){
		// 	var selection = window.getSelection()
		// 	console.log(selection)
		// }, 1000)
	}
})



window.addEventListener('focus', function(){
	if(search_active){
		search_active = false;
		// remove search layers
		console.log('search finished')
	}
})
