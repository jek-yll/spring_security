package com.example.springsecurity;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.crypto.SecretKey;
import java.beans.Encoder;

@SpringBootApplication
public class SpringSecurityApplication {

    public static void main(String[] args) {

        SpringApplication.run(SpringSecurityApplication.class, args);

        // GENERATION DE SIGNATURE
//        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//        String basekey = Encoders.BASE64.encode(key.getEncoded());
//        System.out.println(basekey);
    }

}
