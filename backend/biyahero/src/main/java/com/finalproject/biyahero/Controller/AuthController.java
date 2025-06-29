package com.finalproject.biyahero.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import java.util.Optional;

import com.finalproject.biyahero.Service.UserService;
import com.finalproject.biyahero.Dto.LoginRequest;
import com.finalproject.biyahero.Entity.UserEntity;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // adjust port if Vite runs on another port
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    Optional<UserEntity> userOpt = userService.authenticateAndGetUser(
        loginRequest.getEmail(),
        loginRequest.getPassword()
    );

    if (userOpt.isPresent()) {
        UserEntity user = userOpt.get();
        return ResponseEntity.ok(Map.of(
            "username", user.getUsername()
        ));
    } else {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}



    @PostMapping("/signup")
public ResponseEntity<?> signup(@RequestBody LoginRequest signupRequest) {
    try {
        boolean created = userService.register(
            signupRequest.getEmail(),
            signupRequest.getPassword(),
            signupRequest.getFirstName(),
            signupRequest.getLastName(),
            signupRequest.getUsername()
        );
        if (created) {
            return ResponseEntity.ok("Account created successfully");
        } else {
            return ResponseEntity.status(409).body("Email already registered");
        }
    } catch (RuntimeException ex) {
        return ResponseEntity.status(409).body(ex.getMessage());
    }
}


}
