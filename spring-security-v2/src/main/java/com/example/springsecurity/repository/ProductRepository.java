package com.example.springsecurity.repository;


import com.example.springsecurity.model.Product;
import org.springframework.data.repository.CrudRepository;


public interface ProductRepository extends CrudRepository<Product, Long> {

    void deleteProductById(Long id);

}
