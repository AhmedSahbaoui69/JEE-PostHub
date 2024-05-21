package com.example.foorum.repository;

import com.example.foorum.model.Community;
import com.example.foorum.model.CommunityFollow;
import com.example.foorum.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommunityFollowRepository extends JpaRepository<CommunityFollow, Long> {

    @Query("SELECT cf.community FROM CommunityFollow cf WHERE cf.user.id = :userId")
    List<Community> findAllFollowedCommunitiesByUserId(@Param("userId") Long userId);

    @Query("SELECT cf.user FROM CommunityFollow cf WHERE cf.community.id = :communityId")
    List<User> findAllFollowersByCommunityId(@Param("communityId") Long communityId);

    @Query("SELECT CASE WHEN COUNT(cf) > 0 THEN true ELSE false END " +
            "FROM CommunityFollow cf " +
            "WHERE cf.user.id = :userId AND cf.community.id = :communityId")
    boolean existsByUserIdAndCommunityId(@Param("userId") Long userId, @Param("communityId") Long communityId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CommunityFollow cf WHERE cf.user.id = :userId AND cf.community.id = :communityId")
    void deleteByUserIdAndCommunityId(@Param("userId") Long userId, @Param("communityId") Long communityId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CommunityFollow cf WHERE cf.community.id = :communityId")
    void deleteByCommunityId(@Param("communityId") Long communityId);
}
