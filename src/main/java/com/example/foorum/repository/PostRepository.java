package com.example.foorum.repository;

import com.example.foorum.model.Community;
import com.example.foorum.model.Post;
import com.example.foorum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCommunity(Community community);
    List<Post> findByCreator(User user);
}