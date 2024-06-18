import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./UserProfile.css";
import avatar from "../../../assets/Default_avatar.png";
import edit from "../../../assets/edit.png";
import Apply from "../../../assets/ApplyAsMentor.png";
import info from "../../../assets/infoImage.png";
import email from "../../../assets/email.png";
import country from "../../../assets/country.png";
import age from "../../../assets/age.png";
import gender from "../../../assets/gender.png";
import Language from "../../../assets/language.png";
import Interests from "../../../assets/interests.png";
import Sidebar from "../../Sidebar/Sidebar";
import { User } from "../../Context/userContext";
import axios from "axios";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { Link } from "react-router-dom";
export const UserProfile = () => {
  const { auth } = useContext(User);
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const getUser = useCallback(async () => {
    try {
      // console.log(auth);
      const { data } = await axios.get(process.env.REACT_APP_URL + "user/", {
        headers: {
          Authorization: "Bearer " + auth.Token,
        },
      });
      // console.log(data);
      setUser(data.data.user);
    } catch (error) {
      console.error(error.message);
    }
  }, [auth]);

  const getFollowers = useCallback(async () => {
    try {
      // console.log(auth);
      const { data } = await axios.get(
        process.env.REACT_APP_URL + "user/followers",
        {
          headers: {
            Authorization: "Bearer " + auth.Token,
          },
        }
      );
      // console.log(data);
      setFollowers(data.data.Followers);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const getFollowing = useCallback(async () => {
    try {
      // console.log(auth);
      const { data } = await axios.get(
        process.env.REACT_APP_URL + "user/following",
        {
          headers: {
            Authorization: "Bearer " + auth.Token,
          },
        }
      );
      // console.log(data);
      setFollowing(data.data.Following);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    getUser();
    getFollowers();
    getFollowing();
  }, [auth]);
  console.log(followers, following);
  // console.log(user);
  return (
    <>
      <div className="profile-container">
        <Navbar />
        <div className="profile-content">
          <Sidebar />
          <div className="userData">
            <div className="leftSide">
              <img src={avatar} alt="not found" className="userImage" />
              <h2 className="userName">{user.name}</h2>
              <div className="followers-following">
                <div className="no-posts">
                  <span>{(user.posts && user.posts.length) | 0}</span>
                  <p>Posts</p>
                </div>
                <div className="followers">
                  <span>{followers.length}</span>
                  <p>Followers</p>
                </div>
                <div className="following">
                  <span>{following.length}</span>
                  <p>Following</p>
                </div>
              </div>
              <div className="buttons">
                <div className="editProfile">
                  <button>
                    <p>Edit profile</p>
                    <img src={edit} alt="not found" />
                  </button>
                </div>
                <div className="Apply-as-mentor">
                  <Link to="/apply-mentor">
                    <button>
                      <p>Apply as Mentor</p>
                      <img src={Apply} alt="not found" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="line1"></div>
            </div>
            <div className="info">
              <h2>info</h2>
              <div className="img">
                <img src={info} alt="not found" />
              </div>
              <div className="line"></div>
              <div className="Data">
                <div className="item">
                  <div className="nameIcon">
                    <img src={email} alt="not found" />
                    <p>Email :</p>
                  </div>
                  <div className="value">
                    <p>{user.email || "Loading..."}</p>
                  </div>
                </div>
                <div className="item">
                  <div className="nameIcon">
                    <img src={country} alt="not found" />
                    <p>Country :</p>
                  </div>
                  <div className="value">
                    <p>{user.country || "Loading..."}</p>
                  </div>
                </div>
              </div>
              <div className="line"></div>
              <div className="Languages">
                <img src={Language} alt="not found" />
                <p>Languages</p>
              </div>
              <ul
                className="listofLanguages"
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                {!user.languages && "Loading..."}
                {user.languages &&
                  user.languages.map((lan, index) => (
                    <li key={index}>{lan}</li>
                  ))}
              </ul>
              <div className="line"></div>
              <div className="Interests">
                <img src={Interests} alt="not found" />
                <p>Interests</p>
              </div>
              <ul
                className="listofInterests"
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                {!user.interests && "Loading..."}
                {user.interests &&
                  user.interests.map((int, index) => (
                    <li key={index}>{int}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
