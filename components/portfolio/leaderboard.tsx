"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, ArrowDownRight, Trophy, Users, Calendar } from "lucide-react"

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState("weekly")

  // Mock data for the leaderboard
  const weeklyLeaders = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?key=961hd",
      portfolioValue: 12450.75,
      change: 8.3,
      badges: ["Whip Whisperer", "Market Maven"],
    },
    {
      id: 2,
      name: "Morgan Smith",
      avatar: "/placeholder.svg?key=ots7p",
      portfolioValue: 11875.2,
      change: 6.2,
      badges: ["Committee Expert"],
    },
    {
      id: 3,
      name: "Taylor Wilson",
      avatar: "/placeholder.svg?key=nmxux",
      portfolioValue: 11340.5,
      change: 5.8,
      badges: ["Sector Specialist"],
    },
    {
      id: 4,
      name: "Jordan Lee",
      avatar: "/placeholder.svg?key=gpzru",
      portfolioValue: 10980.3,
      change: 4.9,
      badges: [],
    },
    {
      id: 5,
      name: "Casey Brown",
      avatar: "/placeholder.svg?key=v0lsk",
      portfolioValue: 10750.15,
      change: 4.1,
      badges: ["Rising Star"],
    },
  ]

  const allTimeLeaders = [
    {
      id: 6,
      name: "Robin Chang",
      avatar: "/placeholder.svg?key=rneka",
      portfolioValue: 24680.5,
      change: 146.8,
      badges: ["Hall of Fame", "Whip Whisperer", "Market Maven"],
    },
    {
      id: 7,
      name: "Jamie Garcia",
      avatar: "/placeholder.svg?key=vowwi",
      portfolioValue: 22340.75,
      change: 123.4,
      badges: ["Hall of Fame", "Committee Expert"],
    },
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?key=xmkko",
      portfolioValue: 19875.25,
      change: 98.8,
      badges: ["Whip Whisperer", "Market Maven"],
    },
    {
      id: 8,
      name: "Sam Williams",
      avatar: "/placeholder.svg?key=phexc",
      portfolioValue: 18450.6,
      change: 84.5,
      badges: ["Sector Specialist"],
    },
    {
      id: 9,
      name: "Riley Martinez",
      avatar: "/placeholder.svg?key=k00em",
      portfolioValue: 17920.3,
      change: 79.2,
      badges: ["Rising Star"],
    },
  ]

  const friendsLeaders = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?key=nc0ls",
      portfolioValue: 12450.75,
      change: 8.3,
      badges: ["Whip Whisperer", "Market Maven"],
    },
    {
      id: 10,
      name: "Pat Thompson",
      avatar: "/placeholder.svg?key=g2jdj",
      portfolioValue: 10240.5,
      change: 2.4,
      badges: [],
    },
    {
      id: 11,
      name: "Quinn Rodriguez",
      avatar: "/placeholder.svg?key=opv98",
      portfolioValue: 9875.25,
      change: -1.2,
      badges: ["Committee Expert"],
    },
    {
      id: 12,
      name: "Avery Kim",
      avatar: "/placeholder.svg?key=gajaa",
      portfolioValue: 9340.8,
      change: -6.6,
      badges: [],
    },
  ]

  const classLeaders = [
    {
      id: 13,
      name: "Political Science 101",
      avatar: "/placeholder.svg?key=fvot6",
      portfolioValue: 11240.3,
      change: 12.4,
      members: 24,
    },
    {
      id: 14,
      name: "Civics Club",
      avatar: "/placeholder.svg?key=jadz3",
      portfolioValue: 10980.75,
      change: 9.8,
      members: 18,
    },
    {
      id: 15,
      name: "Public Policy 202",
      avatar: "/placeholder.svg?key=gnk2l",
      portfolioValue: 10450.5,
      change: 4.5,
      members: 32,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>See who's leading the market</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe("weekly")}
                className={timeframe === "weekly" ? "bg-muted" : ""}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Weekly
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe("alltime")}
                className={timeframe === "alltime" ? "bg-muted" : ""}
              >
                <Trophy className="h-4 w-4 mr-2" />
                All Time
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
            </TabsList>

            <TabsContent value="global">
              <div className="space-y-4">
                {(timeframe === "weekly" ? weeklyLeaders : allTimeLeaders).map((leader, index) => (
                  <div key={leader.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-8 text-center font-bold text-muted-foreground">
                        {index === 0 ? (
                          <Trophy className="h-5 w-5 text-amber-500 mx-auto" />
                        ) : (
                          <span>#{index + 1}</span>
                        )}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={leader.avatar || "/placeholder.svg"} alt={leader.name} />
                        <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{leader.name}</p>
                        <div className="flex items-center space-x-2">
                          {leader.badges.map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${leader.portfolioValue.toLocaleString()}</p>
                      <div
                        className={`flex items-center justify-end text-xs ${leader.change >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {leader.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        <span>
                          {leader.change >= 0 ? "+" : ""}
                          {leader.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="friends">
              <div className="space-y-4">
                {friendsLeaders.length > 0 ? (
                  friendsLeaders.map((friend, index) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 text-center font-bold text-muted-foreground">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-amber-500 mx-auto" />
                          ) : (
                            <span>#{index + 1}</span>
                          )}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                          <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <div className="flex items-center space-x-2">
                            {friend.badges &&
                              friend.badges.map((badge) => (
                                <Badge key={badge} variant="outline" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${friend.portfolioValue.toLocaleString()}</p>
                        <div
                          className={`flex items-center justify-end text-xs ${friend.change >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {friend.change >= 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          <span>
                            {friend.change >= 0 ? "+" : ""}
                            {friend.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No friends yet</h3>
                    <p className="text-muted-foreground mb-4">Add friends to compete with them on the leaderboard</p>
                    <Button>Add Friends</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="classes">
              <div className="space-y-4">
                {classLeaders.length > 0 ? (
                  classLeaders.map((classroom, index) => (
                    <div key={classroom.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 text-center font-bold text-muted-foreground">
                          {index === 0 ? (
                            <Trophy className="h-5 w-5 text-amber-500 mx-auto" />
                          ) : (
                            <span>#{index + 1}</span>
                          )}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={classroom.avatar || "/placeholder.svg"} alt={classroom.name} />
                          <AvatarFallback>{classroom.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{classroom.name}</p>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{classroom.members} members</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${classroom.portfolioValue.toLocaleString()}</p>
                        <div
                          className={`flex items-center justify-end text-xs ${classroom.change >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {classroom.change >= 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          <span>
                            {classroom.change >= 0 ? "+" : ""}
                            {classroom.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No classes yet</h3>
                    <p className="text-muted-foreground mb-4">Join a class or create one to compete with classmates</p>
                    <Button>Join a Class</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Badges and rewards you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-center">Whip Whisperer</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Own 5+ bipartisan bills</p>
            </div>

            <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/30">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-center">Committee Expert</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Predict 3 committee outcomes</p>
            </div>

            <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/30 opacity-50">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-center">Market Maven</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Trade 20+ bills in a week</p>
            </div>

            <div className="flex flex-col items-center p-4 border rounded-lg bg-muted/30 opacity-50">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
                <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-center">Rising Star</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Achieve 20% portfolio growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
