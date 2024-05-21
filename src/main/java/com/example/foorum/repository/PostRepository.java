package com.example.foorum.repository;

import com.example.foorum.model.Community;
import com.example.foorum.model.Post;
import com.example.foorum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCommunity(Community community);
    List<Post> findByCreator(User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM CommunityFollow cf WHERE cf.community.id = :communityId")
    void deleteByCommunityId(@Param("communityId") Long communityId);
}