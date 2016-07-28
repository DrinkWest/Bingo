//http://www.bullshitbingo.net/
function click() {
  // Win groups [start cell,increment]
  var gps=[[0,6],[4,4],                      // Diagonal
	   [0,1],[5,1],[10,1],[15,1],[20,1], // Across
	   [0,5],[1,5],[2,5],[3,5],[4,5]],   // Down
    clicks=['freecell', 'win', 'clicked'],   // cells that count as clicked
    cells=this.pTable.getElementsByTagName('td'),
    wins=[];
  if(clicks.indexOf(this.className)>0) {
    this.title='Click to mark cell';
    this.className='';
  } else {
    this.title='Click to unmark cell';
    this.className='clicked';
  }
  // Loop through each group and check for wins
  for(var ol=0;(g=gps[ol]); ol++) {
    var cnt=0;
    // Check each cell in this group for a win, resetting win status
    for(var i=0,cell; i<5 && (cell=cells[g[0]+(i*g[1])]); i++) {
      id=clicks.indexOf(cell.className);
      if(id>=0) {
	cnt++;
	if(id==1) cell.className='clicked';
      }
    }
    if(cnt==5) wins.push(g);
  }
  // highlight all winning cell groups
  if(wins.length) 
    for(var ol=0; (g=wins[ol]); ol++) 
      for(var i=0; i<5; i++) 
	cells[g[0]+(i*g[1])].className='win';
}
function enable_clicks() {
	var tbls=document.getElementsByTagName('table');
	for(var t=0,tbl; (tbl=tbls[t]); t++) {
		if(tbl.className='card'){
			var tds=tbl.getElementsByTagName('td');
			for(var i=0,td;(td=tds[i]);i++) {
				td.pTable=tbl;
				if(td.className!='freecell'){
					td.title='Click to mark cell';
					td.onclick=click;
				}
			}
		}
	}
}

// Run functions at page load
function loader(func) {
	if (document.addEventListener ) {
		window.addEventListener("load", func, false);
	} else if ( document.attachEvent ) {
		window.attachEvent("onload", func);
	} else {
		if(!window._onload_queue){
	    window._onload_queue=[];
	    if(window.onload)
				window._onload_queue.push(window.onload);
		}
		window._onload_queue.push(func);
	}
}
loader(enable_clicks);
