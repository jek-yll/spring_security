package com.example.springsecurity.controller;

import com.example.springsecurity.model.Product;
import com.example.springsecurity.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api-v1")
public class ProductRestController {


    private final ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/product/{id}") // http://localhost:8080/api-v1/product/$
    public Optional<Product> get(@PathVariable("id") Long id){
        return productRepository.findById(id);
    }

    @GetMapping("/products") // http://localhost:8080/api-v1/products
    public List<Product> get(){
        return (List<Product>) productRepository.findAll();
    }

    @PostMapping("/product/post") // http://localhost:8080/api-v1/product
    public void post(@RequestBody Product product){
        productRepository.save(product);
    }

    @DeleteMapping("/product/{id}") // http://localhost:8080/api-v1/product/$
    public void delete(@PathVariable("id") Long id){
        productRepository.deleteProductById(id);
    }

    @PutMapping("/product") // http://localhost:8080/api-v1/product
    public void update(@RequestBody Product productUpdate){
        productRepository.save(productUpdate);
    }

}
