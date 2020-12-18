package br.com.isidrocorp.dashcard.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.dashcard.dao.UsuarioDAO;
import br.com.isidrocorp.dashcard.model.Usuario;

@RestController
@CrossOrigin("*")
public class UsuarioController {

	/* a anotação Autowired realiza a injeção de dependência. Do que se trata?
	 * Basicamente delegamos a instanciação do objeto para a máquina vitural (em outras palavras: não precisamos dar NEW)
	 * Mas o que acontece se não tivermos um objeto que implementa a interface UsuarioDAO? A própria infra-estrutura
	 * do JPA (que é o framework q possui o CrudRepository) se encarrega de gerar uma implementação para este objeto
	 * 
	 */
	@Autowired     
	UsuarioDAO dao;
	
	@GetMapping("/todos")
	public ArrayList<Usuario> recuperarTodos(){
		ArrayList<Usuario> lista;
		lista = (ArrayList<Usuario>)dao.findAll();
		return lista;
	}
	
	@PostMapping("/login")
	public ResponseEntity<Usuario> testandoUsuario(@RequestBody Usuario dadosLogin) {
		/*  passo 1 - recuperar usuario por email ou racf
		 *  passo 2 - se o usuario nao exisitir, retorno codigo 404 (Not found)
		 *  passo 3 - se ele existir, vou conferir a senha
		 *  passo 4 - se a senha não coincidir, retorno codigo 401 (Unauthorized)
		 *  passo 5 - usuario existe e a senha coincide, retorno 200
		 */
		Usuario resultado = dao.findByEmailOrRacf(dadosLogin.getEmail(), dadosLogin.getRacf());
		if (resultado != null) {  // usuario existe
			// vou conferir a senha
			if (resultado.getSenha().equals(dadosLogin.getSenha())){
				resultado.setSenha("********");
				return ResponseEntity.ok(resultado);
			}
			else {
				return ResponseEntity.status(401).build();
			}
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}
    
}