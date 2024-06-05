package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.SearchService;

@CrossOrigin(origins = "*")
@RestController
public class SearchController {
@Autowired
SearchService searchService;
@GetMapping("/search")
public List<Object> search(@RequestParam("query") String query) {
    return searchService.search(query);
}
@GetMapping("/searchUser")
public List<Object> searchuser(@RequestParam("query") String query) {
    return searchService.searchuser(query);
}
@GetMapping("/searchChop")
public List<Object> searchop(@RequestParam("query") String query) {
    return searchService.searchop(query);
}
}
