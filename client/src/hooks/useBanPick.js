import { useReducer } from 'react';

export const useBanPick = (revertDisabled) => {
  const initialBanPicks = {
    blueBans: {"b1": null, "b2": null, "b3": null, "b4": null, "b5": null},
    redBans: {"r1": null, "r2": null, "r3": null, "r4": null, "r5": null},
    bluePicks: {"B1": null, "B2": null, "B3": null, "B4": null, "B5": null},
    redPicks: {"R1": null, "R2": null, "R3": null, "R4": null, "R5": null}
  }

  const reducer = (state, action) => {
    const getGroup = (team) => { // func to get the order of the ban pick
      let group = "";
      if (team.toLowerCase() === team) {
        if (team.toLowerCase() === "b") {
          group = "blueBans";
        }
        else {
          group = "redBans";
        }
      }
      else {
        if (team.toLowerCase() === "b") {
          group = "bluePicks";
        }
        else {
          group = "redPicks";
        }
      }
      return group;
    }
    switch (action.type) {
      case "update": {
        // Update ban pick with selected champ
        const stateCopy = state;
        const [banPick, champ] = action.payload;
        const team = banPick[0];
        const group = getGroup(team);
        const currChamp = stateCopy[group][banPick];
        if (currChamp != null) {
          revertDisabled(currChamp);
        }
        stateCopy[group][banPick] = champ;
        return stateCopy;
      }
      case "swap": {
        const stateCopy = state;
        const [banPick1, banPick2] = action.payload;
        const team1 = banPick1[0];
        const team2 = banPick2[0];
        const group1 = getGroup(team1, stateCopy);
        const group2 = getGroup(team2, stateCopy);
        // swap
        const temp = stateCopy[group1][banPick1];
        stateCopy[group1][banPick1] = stateCopy[group2][banPick2];
        stateCopy[group2][banPick2] = temp;
        return stateCopy;
      }
      case "load": {
        return action.payload;
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialBanPicks);

  return [state, dispatch];
}
