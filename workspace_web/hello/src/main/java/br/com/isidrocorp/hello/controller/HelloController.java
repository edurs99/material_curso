package br.com.isidrocorp.hello.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.hello.model.Produto;

@RestController
public class HelloController {

	@GetMapping("/hello")
	public String sayHello() {
		return "Hello World - Cambada";
	}
	
	@GetMapping("/produto")
	public Produto mostrarProduto() {
		Produto p = new Produto();
		p.setId(1234);
		p.setDescricao("Computador top of mind super hiper maxi mega ultra");
		p.setPreco(2872.43);
		return p;
	}


	

	
}
