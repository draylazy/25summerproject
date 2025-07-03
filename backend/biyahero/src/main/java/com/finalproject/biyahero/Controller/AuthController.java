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
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        Optional<UserEntity> userOpt = userService.findByUsername(username);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "email", user.getEmail(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "role", user.getRole()
            ));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<UserEntity> userOpt = userService.authenticateAndGetUser(
            loginRequest.getEmail(),
            loginRequest.getPassword()
        );

        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "role", user.getRole()
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

    @PutMapping("/profile/{username}/password")
    public ResponseEntity<?> changePassword(
        @PathVariable String username,
        @RequestBody Map<String, String> body
    ) {
        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body("New password cannot be empty.");
        }

        boolean updated = userService.updatePassword(username, newPassword);
        if (updated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
