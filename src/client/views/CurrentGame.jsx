import React from 'react';
import Navbar from '../components/Navbar';
import { name, members } from '../../server/database/models/Groups';

function CurrentGame(props) {
  /**
   * Game Needs:
   * 1. Array of strings representing the names of each person playing(members);
   * 1a. set of members names in top-right corner that changes based on turn
   * (clickable, drag to change order)
   * 1b. set of members names more centered with forms that keep track of vp, hp, etc.
   * 2.opt. Dice assistant
   * 3. a timeout form and function that says when to alert a player that they're taking too long
   *  (maybe toggle the consequences. alert, move to next player);
   */
  [ members, SetMembers ] = useState
  // when you press start game, you get a filter with all gamenights set for today. Picking one(even if there's only one), starts the get/post process.

  return (
    <div>
      <Navbar />
      <h1>{`${name}!!`}</h1>
      {members.map((member) => {
        return(

        );
      })}
    </div>
  );
}

export default CurrentGame;
