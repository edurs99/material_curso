function carregaDash(){
    var strUser = localStorage.getItem("dashcardUser");
    if (!strUser){
        window.location = "index.html";
    }

    // usuario está conectado... preciso consultar o relatórico consolidado no back end
    var strId = window.location.search;
    console.log(strId);

    var idAgente = strId.substr(4);
    console.log("ID recuperado = "+idAgente);

    fetch("http://localhost:8088/totaisconsolidados?id="+idAgente)
       .then(res => res.json())
       .then(lista => preencheDash(lista));

    fetch("http://localhost:8088/agentes")
       .then(resposta => resposta.json())  // se houver resposta, extrai o json dela
       .then(lista => preencheLista(lista));   // se conseguiu extrair a lista, chama a função com essa lista

}

function preencheDash(lista){
    console.log(lista);
    var nomeAgente;
    var volume;
    var suc;
    var fal;
    var fra;

    for (i=0; i<lista.length; i++){
        var ag = lista[i];
        nomeAgente = ag.nomeAgente;
        volume = ag.volume;
        if (ag.status == 0){
            suc = ag.numeroOp;
        }
        else if (ag.status == 1){
            fal = ag.numeroOp;
        }
        else{
            fra = ag.numeroOp;
        }
    }

    document.getElementById("nomeAgente").innerHTML = "<h3>"+nomeAgente+"</h3>";
    document.getElementById("volumeAgente").innerHTML = "<h5>Volume Transacional: "+volume+"</h5>";
    document.getElementById("sucesso").innerHTML = "<h6>• Sucesso: "+suc+"</h6>";
    document.getElementById("falha").innerHTML = "<h6>• Falhas: "+fal+"</h6>";
    document.getElementById("fraude").innerHTML = "<h6>• Fraudes: "+fra+"</h6>";
   // document.getElementById("volumeAgente").innerHTML = "<h4>Volume Transacional: "+volume+"</h4>";


    var ctx = document.getElementById('meuGrafico');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Sucesso', 'Falha', 'Fraude'],
            datasets: [{
                label: '# de operacoes',
                data: [suc, fal, fra],
                backgroundColor: [
                    'rgba(0,255,0,0.3)',
                    'rgba(255,255,0,0.3)',
                    'rgba(255,0,0,0.3)'
                ]
           }]
        },
        
    });
}



/*
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
*/

function preencheLista(lista){
    var strdrop = "";
    for (i=0; i<lista.length; i++){
        var agente = lista[i];  
        strdrop = strdrop + `<li><a class="dropdown-item" href="dashboard.html?id=${agente.id}">${agente.nome}</a></li>`
    }
    document.getElementById("itensmenu").innerHTML = strdrop;
}

function logout(){
    localStorage.removeItem("dashcardUser");
    window.location = "index.html";
    }