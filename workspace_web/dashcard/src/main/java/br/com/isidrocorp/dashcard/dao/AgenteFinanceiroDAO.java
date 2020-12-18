package br.com.isidrocorp.dashcard.dao;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;

import br.com.isidrocorp.dashcard.model.AgenteFinanceiro;

public interface AgenteFinanceiroDAO extends CrudRepository<AgenteFinanceiro, Integer>{
	
	public ArrayList<AgenteFinanceiro> findAllByOrderByVolumeDesc();
	
}
