import rockIcon from '@/assets/icons/rock.svg';
import paperIcon from '@/assets/icons/paper.svg';
import scissorsIcon from '@/assets/icons/scissors.svg';
import lizardIcon from '@/assets/icons/lizard.svg';
import spockIcon from '@/assets/icons/spock.svg';
import rockWinIcon from '@/assets/icons/rock-win.svg';
import paperWinIcon from '@/assets/icons/paper-win.svg';
import scissorsWinIcon from '@/assets/icons/scissors-win.svg';
import lizardWinIcon from '@/assets/icons/lizard-win.svg';
import spockWinIcon from '@/assets/icons/spock-win.svg';
import swordsIcon from '@/assets/icons/swords.svg';
import type { Choice } from '@/helpers/gameModel';

/**
 * Mappa le possibili scelte di gioco alle icone
 */
 const iconPaths: Record<Choice, string> = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
  lizard: lizardIcon,
  spock: spockIcon
};

/**
 * Mappa le possibili scelte di gioco alle icone vincenti
 */
const winIconPaths: Record<Choice, string> = {
  rock: rockWinIcon,
  paper: paperWinIcon,
  scissors: scissorsWinIcon,
  lizard: lizardWinIcon,
  spock: spockWinIcon
};

const lostMeme = "https://media.makeameme.org/created/you-lost-590c80.jpg";
const winMeme = "https://media2.giphy.com/media/eoxomXXVL2S0E/giphy.gif";
const winMemeNextLevel = "https://www.wordstream.com/wp-content/uploads/2021/07/facebook-funnel-next-level.jpg";

export {iconPaths, winIconPaths, swordsIcon, lostMeme, winMeme, winMemeNextLevel}