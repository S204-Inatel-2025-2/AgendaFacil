package com.agendafacil.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agendafacil.backend.model.User;
import com.agendafacil.backend.repository.UserRepository;

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
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.get().getSenha().equals(senha)){
            throw new Exception("Email ou senha inválidos");
        }
        return userOpt.get();
    }
}
