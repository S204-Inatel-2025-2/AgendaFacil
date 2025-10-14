package com.agendafacil.backend.service;

import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
public class ConsultarCnpjAPI {
    
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String URL_BASE = "https://brasilapi.com.br/api/cnpj/v1/";

    public Map<String, Object> buscarCnpj(String cnpj) {
        try {
            return restTemplate.getForObject(URL_BASE + cnpj, Map.class);
        } catch (RestClientException e) {
            throw new IllegalArgumentException("Erro ao consultar BrasilAPI: " + e.getMessage());
        }
    }

}
