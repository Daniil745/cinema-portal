package org.controllers.Controllers;
import org.controllers.Entitys.*;
import org.controllers.Repositories.CinameRepositorie;
import org.controllers.Repositories.CinemaUserRepositorie;
import org.controllers.Repositories.FriendRelationshipRepositorie;
import org.controllers.Repositories.UserRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin
public class HomeController {

    @Autowired private UserRepositorie userRepositorie;
    @Autowired private CinameRepositorie cinameRepositorie;
    @Autowired private CinemaUserRepositorie cinemaUserRepositorie;
    @Autowired private FriendRelationshipRepositorie friendRelationshipRepositorie;

    private User processUser;

    @PostMapping("/add")
    public String adder(@RequestBody User user){
        if(userRepositorie.findByLogin(user.getLogin()) != null) return "ERRORLOGIN";
        if(userRepositorie.findByEmail(user.getEmail()) != null) return "ERROREMAIL";
        user.setShowforaddfr(false);
        user.setShowotherfilms(false);
        userRepositorie.save(user);
        return "GOOD";
    }

    @PostMapping("/autorization")
    public String auth(@RequestBody User user){
        User foundUser = userRepositorie.findByLogin(user.getLogin());
        if(foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            processUser = foundUser;
            return "AUTH";
        }
        return "NOAUTH";
    }

    @GetMapping("/allmyfriend")
    public List<FriendRelationship> allmyfriend(){
        return friendRelationshipRepositorie.findFriendRelationshipsByUsersone_Id(processUser.getId());
    }

    @PostMapping("/allmyfriendsort")
    public List<FriendRelationship> allmyfriendsort(@RequestBody User user){
        return friendRelationshipRepositorie.findFriendRelationshipsByUserstwo_LoginContainingAndUsersone_Id(
                user.getLogin(), processUser.getId());
    }

    @GetMapping("/allusersforfriend")
    public List<User> allusersforfriend(){
        return userRepositorie.findByShowforaddfr(true);
    }

    @PostMapping("/allusersforfriendsort")
    public List<User> allusersforfriendsort(@RequestBody User user){
        return userRepositorie.findByLoginContainingAndShowforaddfr(user.getLogin(), true);
    }

    @PostMapping("/addmyfriend")
    public String addmyfriend(@RequestBody User user){
        if(user.getId() == processUser.getId()) return "ERROR";
        if (friendRelationshipRepositorie.findFriendRelationshipsByUsersone_IdAndUserstwo_Id(
                processUser.getId(), user.getId()) != null) return "ERROR1";

        FriendRelationship friendRelationship = new FriendRelationship();
        friendRelationship.setUsersone(processUser);
        friendRelationship.setUserstwo(userRepositorie.findById(user.getId()));
        friendRelationshipRepositorie.save(friendRelationship);
        return "GOOD";
    }

    @PostMapping("/deleteonmyfriend")
    public String deleteonmyfriend(@RequestBody FriendRelationship friendRelationship){
        FriendRelationship relationship = friendRelationshipRepositorie
                .findFriendRelationshipsByUsersone_IdAndUserstwo_Id(processUser.getId(), friendRelationship.getUserstwo().getId());
        if (relationship != null) {
            friendRelationshipRepositorie.delete(relationship);
            return "GOOD";
        }
        return "ERROR";
    }

    @GetMapping("/deauth")
    public String deauth(){
        processUser = null;
        return "DEAUTH";
    }

    @PostMapping("/savechangemyaccount")
    public String savechangemyaccount(@RequestBody User user){
        processUser.setShowotherfilms(user.isShowotherfilms());
        processUser.setShowforaddfr(user.isShowforaddfr());
        userRepositorie.save(processUser);
        return "1. Настройки успешно изменены";
    }

    @PostMapping("/savemynewpass")
    public String savemynewpass(@RequestBody User user){
        if(!user.getLogin().equals(processUser.getPassword()))
            return "2. Старый пароль введен неверно";
        if(!user.getPassword().equals(user.getEmail()))
            return "3. Новый пароль не совпадает";

        processUser.setPassword(user.getPassword());
        userRepositorie.save(processUser);
        return "1. Пароль успешно изменен";
    }

    @GetMapping("/getprocessuser2")
    public String rs2(){
        if(processUser == null) return "NULL";
        if(processUser.getLogin().equals("admin")) return "ADMIN";
        return "USER";
    }

    @GetMapping("/getAccount")
    public User getAccount(){
        User user1 = userRepositorie.findById(processUser.getId());
        user1.setPassword(" ");
        return user1;
    }

    @GetMapping("/allfilms")
    public List<Cinema> allfilms(){
        return cinameRepositorie.findAll();
    }

    @PostMapping("/allfilmssort")
    public List<Cinema> allfilmssort(@RequestBody Cinema cinema){
        return cinameRepositorie.findByHeadnameContainingOrZhanrContainingOrDirectorContaining(
                cinema.getHeadname(), cinema.getHeadname(), cinema.getHeadname());
    }

    @GetMapping("/allmyfilms")
    public List<CinemaUser> allmyfilms(){
        return cinemaUserRepositorie.findAllByUsers(processUser);
    }

    @PostMapping("/showusercollection")
    public List<CinemaUser> showusercollection(@RequestBody User user){
        User user1 = userRepositorie.findById(user.getId());
        return cinemaUserRepositorie.findAllByUsers(user1);
    }

    @PostMapping("/showusercollectionsort")
    public List<CinemaUser> showusercollectionsort(@RequestBody Cinema cinema){
        User user1 = userRepositorie.findById(cinema.getId());
        return cinemaUserRepositorie.findCinemaUsersByCinemas_HeadnameContainingAndUsers(
                cinema.getHeadname(), user1);
    }

    @PostMapping("/allmyfilmssort")
    public List<CinemaUser> allmyfilmssort(@RequestBody Cinema cinema){
        return cinemaUserRepositorie.findCinemaUsersByCinemas_HeadnameContainingAndUsers(
                cinema.getHeadname(), processUser);
    }

    @PostMapping("/addmyfilm")
    public String addmyfilm(@RequestBody Cinema cinema){
        if(cinemaUserRepositorie.findByCinemasAndUsers(cinema, processUser) != null) {
            return "ERROR";
        }
        CinemaUser cinemaUser = new CinemaUser();
        cinemaUser.setCinemas(cinema);
        cinemaUser.setUsers(processUser);
        cinemaUser.setStatuscinema("Без статуса просмотра");
        cinemaUser.setRatinguser(0);
        cinemaUserRepositorie.save(cinemaUser);
        return "GOOD";
    }

    @PostMapping("/addnewfilm")
    public String addnewfilm(@RequestBody Cinema cinema){
        if(cinameRepositorie.findByHeadnameAndYear(cinema.getHeadname(), cinema.getYear()).size() != 0) {
            return "Этот фильм уже есть в базе";
        }
        cinameRepositorie.save(cinema);
        return "1. Фильм успешно добавлен в каталог";
    }

    @PostMapping("/editfilm")
    public String editfilm(@RequestBody Cinema cinema){
        Cinema cinema1 = cinameRepositorie.findById(cinema.getId());
        cinema1.setHeadname(cinema.getHeadname());
        cinema1.setAboutis(cinema.getAboutis());
        cinema1.setDirector(cinema.getDirector());
        cinema1.setUrlimage(cinema.getUrlimage());
        cinema1.setYear(cinema.getYear());
        cinema1.setZhanr(cinema.getZhanr());
        cinameRepositorie.save(cinema1);
        return "1. Изменения успешно сохранены";
    }

    @PostMapping("/deleteonemyfilm")
    public String deleteonemyfilm(@RequestBody Cinema cinema){
        CinemaUser cinemaUser = cinemaUserRepositorie.findByCinemasAndUsers(cinema, processUser);
        if(cinemaUser != null) {
            cinemaUserRepositorie.delete(cinemaUser);
            return "1. Фильм успешно удален из вашего каталога";
        }
        return "Произошла ошибка, повторите попытку позже";
    }

    @PostMapping("/savechangemyfilm")
    public String savechangemyfilm(@RequestBody CinemaUser cinemaUser){
        CinemaUser cinemaUser1 = cinemaUserRepositorie.findById(cinemaUser.getId());
        if(cinemaUser1 != null) {
            if(cinemaUser.getRatinguser() != 0){
                Cinema cinema = cinemaUser1.getCinemas();
                int kolvoocenok = cinema.getMarks();
                float ocenka = cinema.getRating();
                float promocenka = cinemaUser1.getRatinguser();

                if (kolvoocenok == 0) {
                    cinema.setRating(cinemaUser.getRatinguser());
                    cinema.setMarks(1);
                } else if(promocenka != 0){
                    cinema.setRating((kolvoocenok * ocenka + cinemaUser.getRatinguser() - promocenka)/ kolvoocenok);
                } else {
                    cinema.setRating((kolvoocenok * ocenka + cinemaUser.getRatinguser())/ (kolvoocenok + 1));
                    cinema.setMarks(cinema.getMarks() + 1);
                }
                cinemaUser1.setCinemas(cinema);
                cinemaUser1.setRatinguser(cinemaUser.getRatinguser());
            }
            cinemaUser1.setStatuscinema(cinemaUser.getStatuscinema());
            cinemaUserRepositorie.save(cinemaUser1);
            return "1. Изменения успешно сохранены";
        }
        return "Произошла ошибка, повторите попытку позже";
    }
}
