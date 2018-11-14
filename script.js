


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
    var best = 0;
    var best2 = 0;
    for (var r=0; r<lstRefl.length;r++){
        var dspacing = lstRefl[r].d;
        if (wlength / (2*dspacing/10) > 1) continue;
        try{
            var angle = Math.asin(wlength / (2*dspacing/10)) * (180 / Math.PI);
        }
        catch(err){ var a =5; }
        if (angle < 90){                
            if (angle > theta){  
                theta2 = theta;
                best2 = best;            
                theta = angle;
                best = r;
                if(theta2==0){
                    theta2 = theta;
                }
            }
            if ( (angle>theta2) && (angle < theta) ){
                theta2 = angle;
                best2 = r;
            }
        }
    }
    text = "Element " + elements[selEl].symbol;
    //text += "Emission\t" + Object.keys(emission[indEl])[indEm] + " " + emission[indEl][Object.keys(emission[indEl])[indEm]].e +" eV";
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