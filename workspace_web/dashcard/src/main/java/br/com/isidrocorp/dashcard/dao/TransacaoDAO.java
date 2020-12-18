package br.com.isidrocorp.dashcard.dao;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.isidrocorp.dashcard.dto.ConsolidadoStatus;
import br.com.isidrocorp.dashcard.model.AgenteFinanceiro;
import br.com.isidrocorp.dashcard.model.Transacao;

public interface TransacaoDAO extends CrudRepository<Transacao, Integer>{
	

	
	public ArrayList<Transacao> findAllByAgente(AgenteFinanceiro agente);
	
	@Query("SELECT new br.com.isidrocorp.dashcard.dto.ConsolidadoStatus(t.agente.nome, t.agente.volume, t.status, count(t.status))"
			+ " FROM Transacao t WHERE t.agente.id=:id GROUP BY t.status")
	public ArrayList<ConsolidadoStatus> recuperarStatus(@Param("id") int id);

}