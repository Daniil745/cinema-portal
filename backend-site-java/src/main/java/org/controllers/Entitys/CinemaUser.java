package org.controllers.Entitys;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CinemaUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "cinema_id")
    private Cinema cinemas;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User users;

    private String statuscinema;
    private int ratinguser;
}
