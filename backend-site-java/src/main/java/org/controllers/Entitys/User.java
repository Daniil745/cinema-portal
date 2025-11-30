package org.controllers.Entitys;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String login;
    private String password;
    private String email;
    private boolean showforaddfr;
    private boolean showotherfilms;

    @JsonIgnore
    @OneToMany(mappedBy = "usersone")
    private Set<FriendRelationship> friendRelationshipsOne;

    @JsonIgnore
    @OneToMany(mappedBy = "userstwo")
    private Set<FriendRelationship> friendRelationshipsTwo;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private Set<CinemaUser> cinemaUsers;
}