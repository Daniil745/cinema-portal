package org.controllers.Repositories;
import org.controllers.Entitys.Cinema;
import org.controllers.Entitys.CinemaUser;
import org.controllers.Entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaUserRepositorie extends JpaRepository<CinemaUser, Integer> {
    CinemaUser findByCinemasAndUsers(Cinema a, User b);
    List<CinemaUser> findCinemaUsersByCinemas_HeadnameContainingAndUsers(String a, User b);
    CinemaUser findById(int id);
    List<CinemaUser> findAllByUsers(User user);
}
