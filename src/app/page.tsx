'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SteamGame } from '@/services/steam';
import { PlusCircle, Search } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface GameForm {
  name: string;
  category: string;
  steamLink: string;
  imageUrl: string;
}

const categories = ['Action', 'RPG', 'Strategy', 'Indie', 'Simulation', 'Adventure'];

export default function Home() {
  const [games, setGames] = useState<SteamGame[]>([
    { appId: '1085660', name: 'Thief Simulator 2', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1699949994', category: 'Simulation' },
    { appId: '268910', name: 'Cuphead', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/268910/header.jpg?t=1672174620', category: 'Indie' },
    { appId: '1742120', name: 'Taxi Life', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1742120/header.jpg?t=1717043867', category: 'Simulation' },
    { appId: '2294710', name: 'Buckshot Roulette', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2294710/header.jpg?t=1717434993', category: 'Indie' },
    { appId: '1795620', name: 'KallaX', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1795620/header.jpg?t=1678371484', category: 'Indie' },
    { appId: '2187470', name: 'Killer Frequency', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2187470/header.jpg?t=1685539840', category: 'Adventure' },
    { appId: '555160', name: 'Wanted Raccoon', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/555160/header.jpg?t=1678377893', category: 'Adventure' },
    { appId: '1092790', name: 'Inscryption', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1092790/header.jpg?t=1692759478', category: 'Indie' },
    { appId: '1814960', name: '30 Days to Die', imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1814960/header.jpg?t=1717144299', category: 'Simulation' },
  ]);
  const [newGame, setNewGame] = useState<GameForm>({
    name: '',
    category: categories[0],
    steamLink: '',
    imageUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewGame((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGame = () => {
    if (newGame.name && newGame.steamLink && newGame.imageUrl) {
      const appId = new URL(newGame.steamLink).pathname.split('/')[2]; // Extract app ID from Steam link
      const newSteamGame: SteamGame = {
        appId: appId,
        name: newGame.name,
        imageUrl: newGame.imageUrl,
        category: newGame.category,
      };
      setGames((prev) => [...prev, newSteamGame]);
      setNewGame({ name: '', category: categories[0], steamLink: '', imageUrl: '' });
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <div className="bg-card py-4 px-6 flex items-center justify-between border-b">
          <h1 className="text-2xl font-bold">GameShelf</h1>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search for games..."
              className="w-64 bg-input border rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            <Select>
              <SelectTrigger className="bg-input border rounded-md shadow-sm focus:ring-primary focus:border-primary">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Game Grid */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {games.map((game) => (
              <Card key={game.appId} className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
                <img src={game.imageUrl} alt={game.name} className="w-full h-48 object-cover" />
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold">{game.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{game.category}</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="link" className="pl-0">
                        <a href={`https://store.steampowered.com/app/${game.appId}`} target="_blank" rel="noopener noreferrer">
                          Steam Link
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      This is a Steam Link
                    </TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Game Form */}
          <Card className="bg-card text-card-foreground shadow-md rounded-lg mt-8">
            <CardHeader>
              <CardTitle>Add New Game</CardTitle>
              <CardDescription>Enter the game details below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input type="text" id="name" name="name" value={newGame.name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newGame.category} onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="steamLink">Steam Link</Label>
                  <Input type="text" id="steamLink" name="steamLink" value={newGame.steamLink} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input type="text" id="imageUrl" name="imageUrl" value={newGame.imageUrl} onChange={handleInputChange} />
                </div>
                <Button onClick={handleAddGame} className="bg-primary text-primary-foreground hover:bg-primary/80">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}

