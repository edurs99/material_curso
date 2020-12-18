function logar(){
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;
    console.log("Valores digitados = " + txtLogin + "/ " + txtSenha);

    // preciso agora montar essa mensagem para enviar ao Back-END através do método POST e
    // depois tratar o resultado

    // passo 1 - montar o corpo da mensagem
    // passo 2 - montar o cabeçalho como se fosse o POSTMAN
    // passo 3 - enviar a URL com a mensagem
    // passo 4 - tratar

    // passo 1
    var msgBody = {
        email : txtLogin,
        racf  : txtLogin,
        senha : txtSenha
    };

    // passo 2 - cabecalho
    var cabecalho = {
        method  : "POST",
        body    : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    };
     
    // passo 3 - entrar em contato com o back-end
    fetch("http://localhost:8088/login", cabecalho).then(res => tratastatus(res));
}

// passo 4
function tratastatus(res){
    if (res.status == 200){
        // extraindo o conteúdo do corpo da mensagem
        res.json().then(user => registrarUser(user));
    }
    else if (res.status == 401){
        document.getElementById("msgErro").innerHTML = "Senha Invalida";
    }
    else if (res.status == 404){
        document.getElementById("msgErro").innerHTML = "Usuario Não Encontrado";
    }
    else{
        document.getElementById("msgErro").innerHTML = "Erro Desconhecido";
    }
}

function registrarUser(user){
    localStorage.setItem("dashcardUser", JSON.stringify(user));
    window.location = "agentes.html";
}