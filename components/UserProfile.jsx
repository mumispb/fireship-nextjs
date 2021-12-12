import React from "react";
import Image from "next/image";

export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <Image
        src={user?.photoURL || ""}
        className="card-img-center"
        alt="user-profile-image"
        height="100"
        width="100"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}
