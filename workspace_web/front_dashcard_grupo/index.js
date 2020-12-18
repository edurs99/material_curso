function logar(){
    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;
    console.log("Valores digitados = " + txtLogin + "/ " + txtSenha);

    // enviar mensagem p/ Back-End através do método POST e tratar o resultado

    // montar corpo da mensagem
    // montar cabeçalho como se fosse o POSTMAN
    // enviar URL com a mensagem

    // passo 1 - corpo da msg
    var msgBody = {
        email : txtLogin,
        racf : txtLogin,
        senha : txtSenha
    };

    // passo 2 - cabecalho
    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    };

    // passo 3 - entrar em contato com o back-end
    // fetch("http://localhost:8088/login", cabecalho).then(res => console.log(res));

    fetch("http://localhost:8088/login", cabecalho).then(res => tratastatus(res));

    // passo 4
    function tratastatus(res){
        if (res.status == 200){
            res.json().then(user => registrarUser(user));
        }
        else if (res.status == 401){
            document.getElementById("msgErro").innerHTML = "Senha Invalida";
        }
        else if (res.status == 404){        
            document.getElementById("msgErro").innerHTML = "Usuário Não Encontrado";
        }
        else{
            document.getElementById("msgErro").innerHTML = "Erro Desconhecido";
        }
    }

    function registrarUser(user){
        localStorage.setItem("dashcardUser", JSON.stringify(user));
        window.location="agentes.html";
    }

}