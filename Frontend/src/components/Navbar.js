import React from "react";
import Card from "./SmallCard";

const Navbar = () => {
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;
  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="date">{dateString}</div>
        <Card suit="♥" value="C" />
        <Card suit="♠" value="a" />
        <Card suit="♦" value="s" />
        <Card suit="♣" value="i" />
        <Card suit="♥" value="n" />
        <Card suit="♠" value="o" />
        <Card suit="♦" value="P" />
        <Card suit="♣" value="o" />
        <Card suit="♥" value="k" />
        <Card suit="♠" value="e" />
        <Card suit="♦" value="r" />
      </div>
    </div>
  );
};

export default Navbar;
