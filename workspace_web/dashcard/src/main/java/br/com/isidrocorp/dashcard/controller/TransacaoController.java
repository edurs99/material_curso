package br.com.isidrocorp.dashcard.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.isidrocorp.dashcard.dao.TransacaoDAO;
import br.com.isidrocorp.dashcard.dto.ConsolidadoStatus;
import br.com.isidrocorp.dashcard.model.AgenteFinanceiro;
import br.com.isidrocorp.dashcard.model.Transacao;

@RestController
@CrossOrigin("*")
public class TransacaoController {
	
	@Autowired
	TransacaoDAO dao;
	
	@GetMapping("/transacoes")
	public ArrayList<Transacao> obterTodas(){
		ArrayList<Transacao> lista;
		lista = (ArrayList<Transacao>)dao.findAll();
		return lista;
	}
	
	@GetMapping("/totaisporagente")
	public ArrayList<ConsolidadoStatus> recuperarTotaisPorAgente(@RequestParam(name="id") int id){
		int idAgente = id;
		long contStatus0 = 0;
		long contStatus1 = 0;
		long contStatus2 = 0;
		AgenteFinanceiro ag = new AgenteFinanceiro();
		ag.setId(idAgente);
		ArrayList<Transacao> listaTmp = dao.findAllByAgente(ag);
		for (Transacao t: listaTmp) {
			if (t.getStatus() == 0) {
				contStatus0++;
			}
			else if (t.getStatus() == 1) {
				contStatus1++;
			}
			else {
				contStatus2++;
			}
		}
		
		System.out.println("DEBUG = STATUS 0 = "+contStatus0);
		System.out.println("DEBUG = STATUS 1 = "+contStatus1);
		System.out.println("DEBUG = STATUS 2 = "+contStatus2);
		String nomeAgente = listaTmp.get(0).getAgente().getNome();
		float  volume = listaTmp.get(0).getAgente().getVolume();
		
		ArrayList<ConsolidadoStatus> listaConsolidados = new ArrayList<ConsolidadoStatus>();
		
		listaConsolidados.add(new ConsolidadoStatus(nomeAgente, volume, 0, contStatus0));
		listaConsolidados.add(new ConsolidadoStatus(nomeAgente, volume, 1, contStatus1));
		listaConsolidados.add(new ConsolidadoStatus(nomeAgente, volume, 2, contStatus2));
		
		return listaConsolidados;
	}
	
	
	@GetMapping("/totaisconsolidados")
	public ArrayList<ConsolidadoStatus> recuperarConsolidado(@RequestParam(name="id") int id){
		
//		ArrayList<ConsolidadoStatus> lista=null;
//		lista = dao.recuperarStatus(id);
//		return lista;
		
		return dao.recuperarStatus(id);
		
	}

}