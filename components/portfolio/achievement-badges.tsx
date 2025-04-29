"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trophy, Users, TrendingUp, Calendar, AlertCircle, CheckCircle } from "lucide-react"

interface AchievementBadge {
  id: string
  name: string
  description: string
  icon: "trophy" | "users" | "trending-up" | "calendar" | "alert-circle" | "check-circle"
  earned: boolean
  progress?: number
}

interface AchievementBadgesProps {
  badges: AchievementBadge[]
}

export function AchievementBadges({ badges }: AchievementBadgesProps) {
  // Get icon component based on icon name
  const getIcon = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="h-5 w-5" />
      case "users":
        return <Users className="h-5 w-5" />
      case "trending-up":
        return <TrendingUp className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "alert-circle":
        return <AlertCircle className="h-5 w-5" />
      case "check-circle":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Trophy className="h-5 w-5" />
    }
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      <TooltipProvider>
        {badges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger asChild>
              <div
                className={`flex flex-col items-center p-2 rounded-lg border ${
                  badge.earned ? "bg-primary/10 border-primary/20" : "bg-muted/30 opacity-50"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                    badge.earned ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {getIcon(badge.icon)}
                </div>
                <span className="text-xs font-medium text-center">{badge.name}</span>
                {badge.progress !== undefined && badge.progress < 100 && (
                  <div className="w-full h-1 bg-muted rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${badge.progress}%` }}></div>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{badge.description}</p>
              {badge.progress !== undefined && badge.progress < 100 && (
                <p className="text-xs text-muted-foreground mt-1">Progress: {badge.progress}%</p>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
