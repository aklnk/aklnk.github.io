


//function fillElements(){
//    var sel = document.getElementsByName["selectElement"];
//    sel.options[sel.options.length] = new Option("test test", 1)
//    alert("Hello, World1");
//}

//import {emission} from './emission.mjs';

function Hello() {
    alert("Hello, World1");
}

function fillEmission(selectedElement){
    var sel =  document.myform.selectElement;
    var ind = sel.selectedIndex+1;
    var data = emission[ind]
    var zones = ""
    for (var prop in data){
        zones += "<option>" + prop + " " + data[prop].e + " eV (" + data[prop].int +   ") </option>";
    }
    var sel =  document.myform.selectEmission;
            sel.innerHTML =  zones;

}

function calculateBraggAngles(){
    var lstRefl = createDSpacesList();
    var selEl =  document.myform.selectElement;
    var selEm =  document.myform.selectEmission;
    var indEl = selEl.selectedIndex+1;
    var indEm = selEm.selectedIndex;
    var theta = 0;
    var theta2 = 0;
    var energy = emission[indEl][Object.keys(emission[indEl])[indEm]].e;
    var wlength = 1239.84187 / energy;
	var crystalX = 40;
	var crystalHalf = crystalX / 2;
	var emin1=0;
	var emax1=0;
	var emin2=0;
	var emax2=0;
    var best = 0;
    var best2 = 0;
	var SA = 0;
    for (var r=0; r<lstRefl.length;r++){
        var dspacing = lstRefl[r].d;
        if (wlength / (2*dspacing/10) > 1) continue;
        try{
            var angle = Math.asin(wlength / (2*dspacing/10)) * (180 / Math.PI);
			
			//calculate energy range on crystal
			var angleRadians = angle*(Math.PI / 180);
			var SA = 500 / Math.sin(angleRadians);
			var SAEdge1 = Math.sqrt( SA*SA + crystalHalf*crystalHalf - 2*SA*crystalHalf*Math.cos(angleRadians) );
			var cosA1 = (SAEdge1*SAEdge1 + crystalHalf*crystalHalf - SA**2) / 2 / SAEdge1 / crystalHalf;
			var angle1 = Math.PI - Math.acos( cosA1 );
			var emin = 1239.84187 / ( (2*dspacing/10) * Math.sin(angle1) );
			
			var SAEdge2 = Math.sqrt( SA*SA + crystalHalf*crystalHalf - 2*SA*crystalHalf*Math.cos(Math.PI - angleRadians) );
			var cosA2 = (SAEdge2*SAEdge2 + crystalHalf*crystalHalf - SA**2) / 2 / SAEdge2 / crystalHalf;
			var angle2 = Math.acos( cosA2 );
			var emax = 1239.84187 / ( (2*dspacing/10) * Math.sin(angle2) );
			
        }
        catch(err){ var a =5; }
        if (angle < 90){                
            if (angle > theta){  
                theta2 = theta;
                best2 = best;            
                theta = angle;
				emin2 = emin1;
				emin1 = emin;
				emax2 = emax1;
				emax1 = emax;
                best = r;
                if(theta2==0){
                    theta2 = theta;
                }
            }
            if ( (angle>theta2) && (angle < theta) ){
                theta2 = angle;
				emin2 = emin;
				emax2 = emax;
                best2 = r;
            }
        }
    }
	
	
    text = "Element\t\t" + elements[indEl].symbol + "\n";
    var en = emission[indEl][Object.keys(emission[indEl])[indEm]].e;
    var ilvl = emission[indEl][Object.keys(emission[indEl])[indEm]].iLvl;
    var flvl = emission[indEl][Object.keys(emission[indEl])[indEm]].fLvl;
    text += "Emission\t" + Object.keys(emission[indEl])[indEm] + " " + en +" eV\n";
    text += "Transition\t" + flvl + "->" + ilvl +"\n";

    text += "vonHamos configuration :\n";
    text += "\t" + lstRefl[best].crystal + lstRefl[best].h + lstRefl[best].k + lstRefl[best].l + " @ " + theta.toFixed(1) +"\n";
    text += "\tDist. to analyzers: " + (500 / Math.sin(theta*(Math.PI / 180))).toFixed(2) + " mm\n";
	text += "\tEnergy range: " + emin1.toFixed(1) + " - " + emax1.toFixed(1) + "\n";

    text += "alternative configuration :\n";
    text += "\t" + lstRefl[best2].crystal + lstRefl[best2].h + lstRefl[best2].k + lstRefl[best2].l + " @ " + theta2.toFixed(1) +"\n";
    text += "\tDist. to analyzers: " + (500 / Math.sin(theta2*(Math.PI / 180))).toFixed(2) + " mm\n";
	text += "\tEnergy range: " + emin2.toFixed(1) + " - " + emax2.toFixed(1) + "\n";
    var resultTextArea = document.myform.resultArea;
    resultTextArea.innerHTML = text;

}

function createDSpacesList(){
    var group = document.myform.analyzerGroup;
    var listOfReflections = [];
    var maxOrder = 10;
    for (var i=0; i<group.length; i++){                 
        if (group[i].checked == true){ // process all checked crystals 
            for(var j=1;j<=maxOrder;j++){ //check all available reflections till 9th order
                var h = analyzers[group[i].id].h * j;
                var k = analyzers[group[i].id].k * j;
                var l = analyzers[group[i].id].l * j;
                if( ( (h+k+l) % 4 == 0) || ( (h+k+l) % 2 == 1) ){ //check if reflection is allowed
                    //calculate d
                    var d = crystals[analyzers[group[i].id].crystal].a / Math.sqrt(h*h + k*k + l*l);
                    var refl = {};
                    refl['crystal'] = analyzers[group[i].id].crystal;
                    refl['h'] = h;
                    refl['k'] = k;
                    refl['l'] = l;
                    refl['d'] = d;
                    listOfReflections.push(refl);
                }
            }
        }
    }
    return listOfReflections;
}