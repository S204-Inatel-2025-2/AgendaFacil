package com.agendafacil.backend.controller;

import com.agendafacil.backend.DTO.LoginDTO;
import com.agendafacil.backend.DTO.UserDTO;
import com.agendafacil.backend.model.User;
import com.agendafacil.backend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody UserDTO userDTO) throws Exception {
        User user = new User(userDTO.getNome_completo(),userDTO.getEmail(),userDTO.getTelefone(), userDTO.getSenha());
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginDTO loginDTO) throws Exception {
        return userService.login(loginDTO.getEmail(),loginDTO.getSenha());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
    return userService.findAll();
}
}