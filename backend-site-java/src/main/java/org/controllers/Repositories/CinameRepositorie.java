package org.controllers.Repositories;
import org.controllers.Entitys.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinameRepositorie extends JpaRepository<Cinema, Integer> {
    Cinema findById(int t);
    List<Cinema> findByHeadnameContainingOrZhanrContainingOrDirectorContaining(String a, String b, String c);
    List<Cinema> findByHeadnameAndYear(String a, int b);
}
