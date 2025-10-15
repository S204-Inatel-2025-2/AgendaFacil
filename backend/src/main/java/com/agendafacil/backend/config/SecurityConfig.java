package com.agendafacil.backend.config;

import com.agendafacil.backend.service.UserService;
import com.agendafacil.backend.config.JwtTokenFilter;
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
    private UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/login/**",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/error",
                                "/users/register",
                                "/users/login"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler((request, response, authentication) -> {
                            var oauth2User = (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();
                            var respEntity = userService.processOAuth2User(oauth2User);

                            // Extrai o token JWT do corpo
                            var body = (java.util.Map<?, ?>) respEntity.getBody();
                            var token = (String) body.get("token");

                            // Redireciona o usuário para o front-end com o token JWT
                            String redirectUrl = "http://localhost:5173/auth/callback?token=" + token;
                            response.sendRedirect(redirectUrl);
                        })
                        .failureHandler((req, resp, ex) -> {
                            resp.setStatus(401);
                            resp.setContentType("application/json");
                            resp.getWriter().write("{\"error\": \"Autenticação OAuth2 falhou: " + ex.getMessage() + "\"}");
                        })
                );

        // Garante que o filtro JWT roda antes da autenticação
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
