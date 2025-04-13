
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SteamGame } from '@/services/steam';
import { PlusCircle } from 'lucide-react';
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
  const [games, setGames] = useState<SteamGame[]>([]);
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
    if (newGame.name && newGame.steamLink) {
      const appId = new URL(newGame.steamLink).pathname.split('/')[2]; // Extract app ID from Steam link
      const newSteamGame: SteamGame = {
        appId: appId,
        name: newGame.name,
      };
      setGames((prev) => [...prev, newSteamGame]);
      setNewGame({ name: '', category: categories[0], steamLink: '', imageUrl: '' });
    }
  };

  return (
    <TooltipProvider>
    <div className="container mx-auto p-4 text-foreground">
      <h1 className="text-2xl font-bold mb-4">GameShelf</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {games.map((game) => (
          <Card key={game.appId} className="bg-card text-card-foreground shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>App ID: {game.appId}</p>
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

      <Card className="bg-card text-card-foreground shadow-md rounded-lg">
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
    </TooltipProvider>
  );
}
