import * as client from "./client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";
import * as peopleClient from "./../Courses/People/client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };
  const updateUser = async (profile: any) => {
    await peopleClient.updateUser(profile);
    dispatch(setCurrentUser(profile));
    fetchProfile();
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            className="wd-username form-control mb-2"
            value={profile.username}
          />
          <input
            className="wd-password form-control mb-2"
            value={profile.password}
            onChange={(e) => {
              const updatedProfile = {
                ...profile,
                password: e.target.value,
              };
              setProfile(updatedProfile);
              updateUser(updatedProfile);
            }}
          />
          <input
            className="wd-firstname form-control mb-2"
            value={profile.firstName}
            placeholder="First name"
            onChange={(e) => {
              const updatedProfile = {
                ...profile,
                firstName: e.target.value,
              };
              setProfile(updatedProfile);
              updateUser(updatedProfile);
            }}
          />
          <input
            className="wd-lastname form-control mb-2"
            value={profile.lastName}
            placeholder="Last name"
            onChange={(e) => {
              const updatedProfile = {
                ...profile,
                lastName: e.target.value,
              };
              setProfile(updatedProfile);
              updateUser(updatedProfile);
            }}
          />
          <input
            className="wd-dob form-control mb-2"
            value={profile.dob}
            placeholder="Date of birth"
            onChange={(e) => {
              const updatedProfile = {
                ...profile,
                dob: e.target.value,
              };
              setProfile(updatedProfile);
              updateUser(updatedProfile);
            }}
            type="date"
          />
          <input
            className="wd-email form-control mb-2"
            value={profile.email}
            placeholder="Email"
            onChange={(e) => {
              const updatedProfile = {
                ...profile,
                email: e.target.value,
              };
              setProfile(updatedProfile);
              updateUser(updatedProfile);
            }}
          />
          <select
            className="wd-role form-control mb-2"
            value={profile.role}
            onChange={(e) => {
              const updatedProfile = {
                ...profile,
                role: e.target.value,
              };
              setProfile(updatedProfile);
              updateUser(updatedProfile);
            }}
          >
            <option value="USER">User</option>{" "}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={signout}
            className="wd-signout-btn btn btn-danger w-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
