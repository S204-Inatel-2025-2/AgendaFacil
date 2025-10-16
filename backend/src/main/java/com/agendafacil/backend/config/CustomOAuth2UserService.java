package com.agendafacil.backend.config;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("=== LOADING OAUTH2 USER ===");
        System.out.println("Client Registration: " + userRequest.getClientRegistration().getRegistrationId());
        System.out.println("Access Token: " + userRequest.getAccessToken().getTokenValue());

        OAuth2User user = super.loadUser(userRequest);

        System.out.println("User Attributes: " + user.getAttributes());
        System.out.println("User Name: " + user.getName());

        return user;
    }
}