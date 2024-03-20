package com.m2ibank.security.config;


import com.m2ibank.security.jwt.JwtAuthenticationEntryPoint;
import com.m2ibank.security.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/auth/**", "/notices", "/contact" ).permitAll()
                        .requestMatchers("/myAccount", "/myLoans", "/myCards").hasRole("USER")
                        .requestMatchers("/myBalance").hasAnyRole("ADMIN", "USER")
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .formLogin(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

}
