package com.agendafacil.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/auth/**",
                                "/login/**",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/error",
                                "/register",
                                "/login",
                                "/users/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/oauth2/authorization")
                        )
                        .redirectionEndpoint(redirection -> redirection
                                .baseUri("/login/oauth2/callback/*")
                        )
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService)
                        )
                        .successHandler((request, response, authentication) -> {
                            System.out.println("=== OAuth2 SUCCESS HANDLER ===");

                            var oauth2User = (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();

                            // Processa o usuário e gera o token JWT
                            var userService = http.getSharedObject(org.springframework.context.ApplicationContext.class)
                                    .getBean(com.agendafacil.backend.service.UserService.class);
                            var respEntity = userService.processOAuth2User(oauth2User);

                            var body = (java.util.Map<?, ?>) respEntity.getBody();
                            var token = (String) body.get("token");
                            var user = body.get("user");

                            System.out.println("Token gerado: " + token);
                            System.out.println("Usuário: " + user);

                            // Redireciona para o front-end com o token
                            String redirectUrl = "http://localhost:5173/auth/callback?token=" + token;
                            response.sendRedirect(redirectUrl);
                        })
                        .failureHandler((req, resp, ex) -> {
                            System.out.println("=== OAuth2 FAILURE ===");
                            ex.printStackTrace();

                            resp.setStatus(401);
                            resp.setContentType("application/json");
                            resp.getWriter().write("{\"error\": \"Autenticação OAuth2 falhou: " + ex.getMessage() + "\"}");
                        })
                );

        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}