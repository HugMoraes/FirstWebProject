var TUSD_i = document.getElementById("TUSD_i");
var TE_i = document.getElementById("TE_i");
var BT_i = document.getElementById("BT");
var CIP_i = document.getElementById("CIP");
var total_value = document.getElementById("total_value");

var ban_slider = document.getElementById("ban_slider");
var ban_number = document.getElementById("ban_number");
var bandeira = document.getElementsByName("bandeiras");

var consumo_slider = document.getElementById("consumo_slider");
var consumo_number = document.getElementById("consumo_number");
var pis_slider = document.getElementById("pis_slider");
var pis_number = document.getElementById("pis_number");
var tusd_slider = document.getElementById("tusd_slider");
var tusd_number = document.getElementById("tusd_number");
var te_slider = document.getElementById("te_slider");
var te_number = document.getElementById("te_number");
var cofins_slider = document.getElementById("cofins_slider");
var cofins_number = document.getElementById("cofins_number");
var icms_slider = document.getElementById("icms_slider");
var icms_number = document.getElementById("icms_number");


var consumo = consumo_number.value
var PIS = pis_number.value
var COFINS = cofins_number.value
var ICMS = icms_number.value
var TUSD = tusd_number.value
var TE = te_number.value
var CIP = 15.16
var v_bt = 11.26
var imp_v_bt = 0;
var bt_list = ['0', '0.01874', '0.03971', '0.09492']

var prc_imp_tusd;
var prc_imp_te;

var tusd_total;
var te_total;

var base_calc;
var total;

var consumo_alterou = false



// VVV Function to round 2 decimal VVV //
function round_dec(x) {
    return (Math.floor(x*100)/100).toFixed(2)
}
// ^^^ Function to round 2 decimal ^^^ //

// VVV Function to deal with bandeiras VVV //

bandeira[0].oninput = function () {
    
    imp_v_bt = 0
    ban_number.value = imp_v_bt
    ban_slider.value = imp_v_bt
    prc()
}

bandeira[1].oninput = function () {
    
    imp_v_bt = 0.01874
    ban_number.value = imp_v_bt
    ban_slider.value = imp_v_bt
    prc()
}

bandeira[2].oninput = function () {
    
    imp_v_bt = 0.03971
    ban_number.value = imp_v_bt
    ban_slider.value = imp_v_bt
    prc()
}

bandeira[3].oninput = function () {
    
    imp_v_bt = 0.09492
    ban_number.value = imp_v_bt
    ban_slider.value = imp_v_bt
    prc()
}

// ^^^ Function to deal with bandeiras ^^^ //


ban_slider.oninput = function () {
    
    imp_v_bt = ban_slider.value
    ban_number.value = ban_slider.value

    if (ban_slider.value < 0.01874) {
        
        bandeira[0].checked = true
    } else if (ban_slider.value < 0.03971) {
        
        bandeira[1].checked = true
    } else if (ban_slider.value < 0.09492) {
        
        bandeira[2].checked = true
    } else {
        bandeira[3].checked = true
    }
    prc()
}



ban_number.oninput = function () {

    if (ban_number.value > 0.09492) {
        ban_number.value = 0.09492;
    }

    ban_slider.value = ban_number.value

    if (ban_slider.value < 0.01874) {
        
        bandeira[0].checked = true
    } else if (ban_slider.value < 0.03971) {
        
        bandeira[1].checked = true
    } else if (ban_slider.value < 0.09492) {
        
        bandeira[2].checked = true
    } else {
        bandeira[3].checked = true
    }
    imp_v_bt = ban_slider.value
    prc()

}



// VVV Function to calculate total value VVV //

function prc() {
    // console.log("consumo: ", consumo, "PIS: ", PIS, "COFINS: ", COFINS, "ICMS: ", ICMS, "TUSD: ", TUSD, "TE: ", TE, "CIP", CIP, "v_bt: ", v_bt)
    

    if (consumo < 80){
        CIP = 0
    } else if (consumo < 100){
        CIP = 13.71
    } else if (consumo < 150){
        CIP = 20.8
    } else if (consumo < 300){
        CIP = 26.99
    } else if (consumo < 500){
        CIP = 35.06
    } else if (consumo < 750){
        CIP = 43.43
    } else if (consumo < 1000){
        CIP = 50.29
    } else if (consumo < 1500){
        CIP = 54.84
    } else if (consumo < 2001){
        CIP = 59.87
    }

    v_bt = consumo*imp_v_bt

    var imp = (PIS/100) + (COFINS/100) + (ICMS/100)

    prc_imp_tusd = TUSD/(1 - imp);
    prc_imp_te = TE/(1 - imp);

    tusd_total = prc_imp_tusd*consumo
    te_total = prc_imp_te*consumo

    base_calc = tusd_total + te_total + v_bt

    total = base_calc + CIP

    // console.log("teste: ", total)

    // VVV Update bar graph VVV //
    myChart_1.data.datasets[0].data[0] = round_dec(base_calc*(PIS/100));
    myChart_1.data.datasets[0].data[1] = round_dec(base_calc*(COFINS/100));
    myChart_1.data.datasets[0].data[2] = round_dec(base_calc*(ICMS/100));
    myChart_1.data.datasets[0].data[3] = round_dec(CIP);
    myChart_1.data.datasets[0].data[4] = round_dec(v_bt);

    var max_bar_value = round_dec(Math.max(v_bt, CIP, base_calc*(ICMS/100), base_calc*(COFINS/100), base_calc*(PIS/100)))


    if (max_bar_value == 0) {
        myChart_1.options.scales.y.max = 1
    } else {
        myChart_1.options.scales.y.max = Math.round(max_bar_value*1.1)
    }

    
        
    myChart_1.update()
    // ^^^ Update bar graph ^^^ //

    // VVV Update numbers VVV //
    TUSD_i.innerHTML = ('R$ ' + round_dec(tusd_total));
    TE_i.innerHTML = ('R$ ' + round_dec(te_total));
    BT_i.innerHTML = ('R$ ' + round_dec(v_bt));
    CIP_i.innerHTML = ('R$ ' + round_dec(CIP));
    total_value.innerHTML = ('R$ ' + round_dec(total));
    // ^^^ Update numbers ^^^ //
    
    
    graph_coord()
    

    

}

// VVV Responsive number & slider VVV //

function resp_slid(slider, number) {
    number.value = slider.value
    prc()
}

function resp_num(slider, number, max_num) {

    if (number.value > max_num) {
        number.value = max_num;
    }

    slider.value = number.value;
    prc()
}

// consumo //
consumo_slider.oninput = function () {
    consumo = consumo_slider.value
    consumo_alterou = true
    resp_slid(consumo_slider, consumo_number, 2000)
    
    

}

consumo_number.oninput = function () {
    consumo = consumo_number.value
    consumo_alterou = true
    resp_num(consumo_slider, consumo_number, 2000)
    
    
    
}

// PIS //
pis_slider.oninput = function () {
    PIS = pis_slider.value
    consumo_alterou = false
    resp_slid(pis_slider, pis_number, 10)
    
}

pis_number.oninput = function () {
    PIS = pis_number.value
    consumo_alterou = false
    resp_num(pis_slider, pis_number, 10)
    
}

// COFINS //
cofins_slider.oninput = function () {
    COFINS = cofins_slider.value
    consumo_alterou = false
    resp_slid(cofins_slider, cofins_number, 10)
    
}

cofins_number.oninput = function () {
    COFINS = cofins_number.value
    consumo_alterou = false
    resp_num(cofins_slider, cofins_number, 10)
    
}

// ICMS //
icms_slider.oninput = function () {
    ICMS = icms_slider.value
    consumo_alterou = false
    resp_slid(icms_slider, icms_number, 50)
    
}

icms_number.oninput = function () {
    ICMS = icms_number.value
    consumo_alterou = false
    resp_num(icms_slider, icms_number, 50)
    
}

// TUSD //
tusd_slider.oninput = function() {
    TUSD = tusd_slider.value
    consumo_alterou = false
    resp_slid(tusd_slider, tusd_number, 1)
    
}

tusd_number.oninput = function () {
    TUSD = tusd_number.value
    consumo_alterou = false
    resp_num(tusd_slider, tusd_number, 1)
    
}

// TE //
te_slider.oninput = function() {
    TE = te_slider.value
    consumo_alterou = false
    resp_slid(te_slider, te_number, 1)
    
}

te_number.oninput = function () {
    TE = te_number.value
    consumo_alterou = false
    resp_num(te_slider, te_number, 1)
    
}

// VVV Function to calculate all graph numbers VVV //

function graph_coord() {
    // console.log("consumo: ", consumo, "PIS: ", PIS, "COFINS: ", COFINS, "ICMS: ", ICMS, "TUSD: ", TUSD, "TE: ", TE, "CIP", CIP, "v_bt: ", v_bt)
    
    const new_data_chart_2 = [];
    const new_label_chart_2 = [];

    for (var i = consumo; i >= 0; i--) {

    

        if (i < 80){
            CIP = 0
        } else if (i < 100){
            CIP = 13.71
        } else if (i < 150){
            CIP = 20.8
        } else if (i < 300){
            CIP = 26.99
        } else if (i < 500){
            CIP = 35.06
        } else if (i < 750){
            CIP = 43.43
        } else if (i < 1000){
            CIP = 50.29
        } else if (i < 1500){
            CIP = 54.84
        } else if (i < 2001){
            CIP = 59.87
        }

        v_bt = i*imp_v_bt

        var imp = (PIS/100) + (COFINS/100) + (ICMS/100)

        prc_imp_tusd = TUSD/(1 - imp);
        prc_imp_te = TE/(1 - imp);

        tusd_total = prc_imp_tusd*i
        te_total = prc_imp_te*i

        base_calc = tusd_total + te_total + v_bt

        total = base_calc + CIP

        new_label_chart_2.unshift(i.toString())
        new_data_chart_2.unshift(total)

        console.log(i, new_data_chart_2.length)

    }

    myChart_2.options.scales.y.max = Math.trunc(new_data_chart_2[new_data_chart_2.length - 1]*1.1)

    myChart_2.data.labels = new_label_chart_2

    myChart_2.data.datasets[0].data = new_data_chart_2

    myChart_2.update();

    console.log('DONE', new_data_chart_2[new_data_chart_2.length - 1], new_label_chart_2)

    

   




    

    

}







//


function test() {
    console.log("ok!")
    console.log(myChart_2.data.datasets[0])
    console.log(myChart_2.data.labels)
}