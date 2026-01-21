package com.itsqmet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // ENCRIPTADOR PARA LA CONTRASEÑA
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CONFIGURACION DE LA CADENA DE FILTROS DE SEGURIDAD
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // RUTAS PUBLICAS
                        .requestMatchers("/", "/home", "/login/postLogin").permitAll()
                        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()

                        // PANELES SEGUN ROL
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/horarios/**").hasAnyRole("DOCENTE", "ADMIN")

                        // LAS DEMAS RUTAS REQUIEREN AUTENTICACION
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/home")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/login/postLogin", true)
                        .failureUrl("/home?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/home?logout=true")
                        .permitAll()
                );
        return http.build();
    }
}