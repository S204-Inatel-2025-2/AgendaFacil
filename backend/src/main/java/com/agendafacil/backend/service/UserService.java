package com.agendafacil.backend.service;

import com.agendafacil.backend.model.AuthProvider;
import com.agendafacil.backend.model.User;
import com.agendafacil.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) throws Exception{
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new Exception("Email já cadastrado!");
        }
        return userRepository.save(user);
    }

    public User login(String email, String senha) throws Exception{
        Optional<User> userOpt = userRepository.findByEmailAndAuthProvider(email, AuthProvider.LOCAL);

        if (userOpt.isEmpty() || !userOpt.get().getSenha().equals(senha)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
        }

        return userOpt.get();
    }

    public User processOAuth2User(String email, String name, String providerId, AuthProvider provider) {
        
        Optional<User> userOptional = userRepository.findByProviderId(providerId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            user.setNome_completo(name);
            return userRepository.save(user);
        }
        
        
        userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
           
            user.setProviderId(providerId);
            user.setAuthProvider(provider);
            user.setNomeCompleto(name);
            return userRepository.save(user);
        } else {
            
            User user = User.createOAuth2User(name, email, providerId, provider);
            return userRepository.save(user);
        }
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}