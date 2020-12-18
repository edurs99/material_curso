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
}

function preencheDash(lista){
    console.log(lista);
    var nomeAgente;
    var volume;
    var sucesso;
    var falhas;
    var fraudes;

    for (i=0; i<lista.length; i++){
        var ag = lista[i];
        nomeAgente = ag.nomeAgente;
        volume = ag.volume;
        
        if (ag.status == 0) {
            sucesso = ag.numeroOp;
        }
        else if (ag.status == 1) {
            falhas = ag.numeroOp;
        }
        else{
            fraudes = ag.numeroOp;
        }
    }

    document.getElementById("nomeAgente").innerHTML = "<h3>"+nomeAgente+"</h3>";
    document.getElementById("volumeAgente").innerHTML = "<h3>"+volume+"</h3>";
    document.getElementById("sucessoAgente").innerHTML = "<h3>"+sucesso+"</h3>";
    document.getElementById("falhasAgente").innerHTML = "<h3>"+falhas+"</h3>";
    document.getElementById("fraudesAgente").innerHTML = "<h3>"+fraudes+"</h3>";
 
    var ctx = document.getElementById('meuGrafico');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Sucesso', 'Falhas', 'Fraude'],
            datasets: [{
                label: 'Gráfico das Operações',
                data: [sucesso, falhas, fraudes],
                backgroundColor: [
                    'rgba(0,255,21,0.5)',
                    'rgba(0,120,120,0.5)',
                    'rgba(255,0,0,0.5)'
                ]
           }]
        },
        
    });
}

