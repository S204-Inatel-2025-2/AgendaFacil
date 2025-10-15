package com.agendafacil.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.agendafacil.backend.config.JwtTokenProvider;
import com.agendafacil.backend.model.User;
import com.agendafacil.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public User register(User user) throws Exception{
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new Exception("Email já cadastrado!");
        }
        return userRepository.save(user);
    }

    public User login(String email, String senha) throws Exception{
        Optional<User> userOpt = userRepository.findByEmail(email);
        System.out.println("Email do usuário: " + userOpt.get().getEmail());
        System.out.println("Email enviado: " + email);
        System.out.println("Senha do usuário: " + userOpt.get().getSenha());
        System.out.println("Senha enviada: " + senha);

        System.out.println("Usuário encontrado: " + userOpt);
        if (userOpt.isEmpty() || !userOpt.get().getSenha().equals(senha)){
            //throw new Exception("Email ou senha inválidos");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
        }

        return userOpt.get();
    }

    public ResponseEntity<?> processOAuth2User(OAuth2User oauth2User) {
        if (oauth2User == null) {
            return ResponseEntity.badRequest().body("Dados do usuário OAuth2 não disponíveis");
        }

        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email não encontrado nos dados do OAuth2");
        }

        if (name == null || name.trim().isEmpty()) {
            name = "Usuário";
        }

        Optional<User> userOpt = userRepository.findByEmail(email);

        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = new User(name, email, "", "");
            user = userRepository.save(user);
        }

        String token = jwtTokenProvider.gerarToken(email);
        return ResponseEntity.ok().body(java.util.Map.of(
                "token", token,
                "user", user
        ));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

}
