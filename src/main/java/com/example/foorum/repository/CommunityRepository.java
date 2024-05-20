package com.example.foorum.repository;

import com.example.foorum.model.Community;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    Optional<Community> findByName(String community);
    List<Community> findAllByCreatorId(Long creator);
}
