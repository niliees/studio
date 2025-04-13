
/**
 * Represents basic information about a game from Steam.
 */
export interface SteamGame {
  /**
   * The Steam application ID of the game.
   */
  appId: string;
  /**
   * The name of the game.
   */
  name: string;
   /**
   * The image URL of the game.
   */
  imageUrl?: string;
   /**
   * The category of the game.
   */
  category?: string;
}

/**
 * Fetches game details from the Steam API based on the provided Steam link.
 *
 * @param steamLink The Steam link of the game.
 * @returns A promise that resolves to a SteamGame object containing the app ID and name, or null if not found.
 */
export async function getGameDetails(steamLink: string): Promise<SteamGame | null> {
  // TODO: Implement this by calling the Steam API.

  return null;
}


